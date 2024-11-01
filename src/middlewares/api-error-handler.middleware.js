import { CelebrateError } from "celebrate";

import { HttpException } from "../utils/http/exceptions.js";
import appConfig from "../config/app.config.js";
import apiResponse from "../utils/http/api-response.js";

const apiErrorMiddleware = (err, _req, res, _next) => {
    console.error(err.message, err.stack)
    if (err instanceof CelebrateError) {

        // Map error messages for better readability
        let errorDetails = ''

        for (let detail of err.details.values()) {
            errorDetails += detail.message
        }
        // const errorDetails = err.joi.details.map((detail) => detail.message);
        return res.status(400).json({
            error: 'Validation error',
            details: errorDetails
        });
    }
    else if (err instanceof HttpException) {
        const resBody = {
            status: false,
            statusCode: err.statusCode,
            message: err.message
        }
        if (err.reason) resBody.reason = err.reason
        if (appConfig.env !== 'production') resBody.errorStack = err.stack
        
        return apiResponse(res, err.reason, { errorStack: err.stack }, err.statusCode)
    }
    else {
        return apiResponse(res, 'Internal Server Error', null, 500)
    }
};

export default apiErrorMiddleware
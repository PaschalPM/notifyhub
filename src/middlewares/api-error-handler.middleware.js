import { CelebrateError } from "celebrate";

import { HttpException } from "../utils/http/exceptions.js";
import appConfig from "../config/app.config.js";
import apiResponse from "../utils/http/api-response.js";

const apiErrorMiddleware = (err, _req, res, _next) => {
    
    if (err instanceof CelebrateError) {

        // Map error messages for better readability
        let errorDetails = ''

        for (let detail of err.details.values()) {
            errorDetails += detail.message
        }

        return res.status(400).json({
            error: 'Validation error',
            details: errorDetails
        });
    }
    else if (err instanceof HttpException) {
        return apiResponse(
            res,
            err.message,
            appConfig.env !== 'production' ? { errorStack: err.stack } : null,
            err.statusCode
        )
    }
    else {
        return apiResponse(res, 'Internal Server Error', null, 500)
    }
};

export default apiErrorMiddleware
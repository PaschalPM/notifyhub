import appConfig from "../../config/app.config.js"
/**
 * 
 * @param {import("express").Response} res 
 * @param {string} message 
 * @param {object} data 
 * @param {'success'|'error'} status 
 * @returns 
 */

const apiResponse = (res, message, dataOrError = null, statusCode = 200) => {
    const isError = statusCode >= 400 ? true : false; // Determine if the response is an error

    let resp = {
        status: isError ? 'error' : 'success',
        "X-Environment": appConfig.env, 
        message 
    }

    // Add data or error information to the response
    if (dataOrError) {
        if (isError) {
            resp.error = dataOrError;
        } else {
            resp.data = dataOrError;
        }
    }
    
    return res.status(statusCode).json(resp); 
}


export default apiResponse
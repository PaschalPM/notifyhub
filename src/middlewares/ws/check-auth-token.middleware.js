import { Socket } from "socket.io"
import jwt from "jsonwebtoken"

/**
 * Middleware function to check the authenticity of the access token in the socket handshake
 * 
 * @param {Socket} socket 
 * @param {*} next 
 */

const checkAuthToken = (socket, next) => {
    const accessToken = socket.handshake.query.access_token;

    // If the access token is not found in the handshake, return an error
    if (!accessToken) {
        return next(new Error("Access token not found."));
    }

    const decoded = jwt.decode(accessToken);

    // If the token could not be decoded (i.e., invalid token), return an error
    if (!decoded) {
        return next(new Error("Access token is invalid."));
    }

    // Check if the decoded token contains the 'exp' (expiration) field
    if (decoded.exp) {
        const currentTime = Math.floor(Date.now() / 1000);

        // Check if token has expired
        if (decoded.exp < currentTime) {
            return next(new Error('Access token has expired.')); // Reject connection if token expired
        }
    }

    socket.accessToken = accessToken;

    next();
}


export default checkAuthToken
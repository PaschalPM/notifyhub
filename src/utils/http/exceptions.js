export class HttpException extends Error {
    constructor(message, statusCode, reason = null) {
        super(message)
        this.statusCode = statusCode
        this.reason = reason
    }
}

export class InternalServerError extends HttpException {
    constructor(reason = "") {
        super("Internal Server Error", 500, reason)
    }
}
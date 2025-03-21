const AppError = require('./appError.js');

class BadRequestError extends AppError {
    constructor(invalidParams) {
        let message = "The request has the following invalid parameters: ";
        message += invalidParams.join(", "); // Join parameters with a comma

        super(message, 400); // 400 for Bad Request
    }
}

module.exports = BadRequestError;

const AppError = require('./appError.js');

class InternalServerError extends AppError {
    constructor() {
        super("An unexpected error occurred on the server. Please try again later." , 500);
    }
}

module.exports = InternalServerError;

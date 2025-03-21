const AppError = require('./appError.js');

class UnAuthorisedError extends AppError {
    constructor() {
        super(`User is unAuthorised`, 404);
    }
}

module.exports = UnAuthorisedError;

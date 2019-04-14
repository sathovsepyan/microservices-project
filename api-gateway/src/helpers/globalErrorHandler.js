'use strict';
const globalErrorHandler = (logger) => {
    const handleError = (err, req, res, next) => {
        if (!err) return next();

        logger.error(err.stack || err.message);
        const message = err && err.message ?
            err.message : 'Internal Server Error';
        res.statusMessage = message;
        return res.status(500).json({
            error: message
        });
    };

    const publicInterface = {
        handleError
    };
    return publicInterface;
};

module.exports = globalErrorHandler;
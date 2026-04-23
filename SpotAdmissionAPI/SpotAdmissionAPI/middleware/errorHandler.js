const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // Handle Mongoose Validation/Cast Errors as 400
    if (err.name === 'ValidationError' || err.name === 'CastError') {
        statusCode = 400;
    }

    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
};


module.exports = errorHandler;
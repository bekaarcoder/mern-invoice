const errorHandler = (err, req, res, next) => {
    const statusCode =
        err.name === 'ValidationError'
            ? 400
            : res.statusCode
            ? res.statusCode
            : 500;

    return res.status(statusCode).json({
        success: false,
        message: err.message,
        statusCode,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

const notFound = (req, res, next) => {
    const error = new Error(`The route does not exist: ${req.originalUrl}`);
    res.status(404);
    next(error);
};

export { errorHandler, notFound };
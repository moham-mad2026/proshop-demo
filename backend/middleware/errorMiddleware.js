const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error); // انتقال خطا به errorHandler
};

const errorHandler = (err, req, res, next) => {
    // تعیین وضعیت خطا
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
    let message = err.message;

    // مدیریت خطای CastError (مانند ObjectId نامعتبر)
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        message = `Resource not found`;
        res.status(404); // تنظیم وضعیت HTTP به 404
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack, // نمایش استک فقط در محیط توسعه
    });
};

export { notFound, errorHandler };

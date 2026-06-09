const globalErrorHandler = (err, req, res, next) => {
    const errorMsg = err.message || 'Internal Server Error';
    const statusCode = err.statusCode || 500; 

    res.status(statusCode).json({
        success : false,
        message : errorMsg,
    })
};

export default globalErrorHandler; 
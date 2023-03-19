// Global error handling middleware

//next arrgument it very important
const globalErorrHandlingMidleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  process.env.NODE_ENV === 'development'
    ? sendErrorForDev(err, res)
    : sendErrorForProd(err, res);
};

// @desc Handle error while Development mode
const sendErrorForDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    erorr: err,
    message: err.message,
    stack: err.stack,
  });
};

// @desc Handle error while Production mode
const sendErrorForProd = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = globalErorrHandlingMidleware;

const AppError = require("../utils/appError");

const sendErrorDev = (err, res) => {
  // all error details for developers
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: Send message to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // Programming or other unknown erros: don't leak error details
  else {
    // 1) Log the error
    console.error("ERROR!! 💣", err);
    // 2) Generic message to client
    res.status(500).json({
      status: "error",
      message: "Something went wrong!!",
    });
  }
};

const castErrorHandlerDB = (err) => {
  let msg = `Invalid value for ${err.value} for field ${err.path}`;
  return new AppError(msg, 400);
};

const duplicateErrorHandlerDB = (err) => {
  let value = err.keyValue.name;
  let msg = `Duplicate field value: ${value}. Please use another value!!`;
  return new AppError(msg, 400);
};

const validationErrorHandlerDB = (err) => {
  let value = Object.values(err.errors)
    .map((el) => el.message)
    .join("  ");
  let msg = `Please complete all required fields: ${value}.`;
  return new AppError(msg, 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV == "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV == "production") {
    // copy of err
    let error = { ...err, name: err.name };
    if (error.name == "CastError") error = castErrorHandlerDB(error);
    if (error.name == "MongoError") error = duplicateErrorHandlerDB(error);
    if (error.name == "ValidationError")
      error = validationErrorHandlerDB(error);
    sendErrorProd(error, res);
  }
};

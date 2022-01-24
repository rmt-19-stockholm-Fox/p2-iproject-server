const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let errorMsg = "Internal Server Error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    statusCode = 400;
    errorMsg = err.errors[0].message;
  } else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    errorMsg = "Invalid Token";
  } else if (err.name === "InvalidUserNameOrPassword") {
    statusCode = 401;
    errorMsg = "Invalid username or password";
  } else if (err.name === "InvalidAccess") {
    statusCode = 401;
    errorMsg = "Invalid access";
  } else if (err.name === "NotFound") {
    statusCode = 404;
    errorMsg = "Diary not found";
  } else if (err.name === "UserNotFound") {
    statusCode = 404;
    errorMsg = "User not found";
  } else if (err.name === "AccessDenied") {
    statusCode = 403;
    errorMsg = "Access denied";
  }

  res.status(statusCode).json(errorMsg);
};

module.exports = errorHandler;

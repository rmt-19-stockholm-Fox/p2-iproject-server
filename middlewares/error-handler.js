module.exports = (err, req, res, next) => {
  let status = 500;
  let message = 'internal server error';

  switch (err.name) {
    case 'JsonWebTokenError':
    case 'Unauthorized':
      status = 401;
      message = 'invalid identification token';
      break;
    case 'NotFound':
      status = 404;
      message = 'targeted resource does not exist';
      break;
    default:
      console.log(err);
  }

  res.status(status).json({ message });
}

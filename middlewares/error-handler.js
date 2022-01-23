module.exports = (err, req, res, next) => {
  let status = 500;
  let message = 'internal server error';

  switch (err.name) {
    default:
      console.log(err);
  }

  res.status(status).json({ message });
}

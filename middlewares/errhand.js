const errhand = (err, req, res, next) => {
  if (err) {
    console.log(err);
    res.status(500).json({ message: "errors have not been handled!" });
  }
};

module.exports = errhand;

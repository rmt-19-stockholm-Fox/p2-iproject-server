const { Mutual } = require("../models");

const mutualAuthorization = async (req, res, next) => {
  try {
    const findMutual = await Mutual.findAll({
      where: { secondUser: req.currentUser.id },
    });
    if (findMutual.length === 0) {
      throw { name: "AccessDenied" };
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = mutualAuthorization;

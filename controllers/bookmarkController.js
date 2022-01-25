const { Bookmark, Product, User } = require("../models");

class Controller {
  static findAllBookmark(req, res) {
    Bookmark.findAll({
      include: [Product],
      where: {
        UsersId: req.user.id,
      },
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }

  static addBookmark(req, res) {
    const input = {
      ProductId: req.body.ProductId,
      UsersId: req.user.id,
    };

    Bookmark.create(input)
      .then(() => {
        res.status(201).json({
          message: "Added to your wishlist",
        });
      })
      .catch(() => {
        next({ code: 400, message: "Bad request" });
      });
  }

  static deleteBookmark(req, res) {
    Bookmark.destroy({
      where: {
        ProductId: +req.params.ProductId,
      },
    })
      .then((result) => {
        if (result) {
          res.status(200).json({ message: "Delete Success" });
        } else {
          res.status(404).json({ message: "Data not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }
}

module.exports = Controller;

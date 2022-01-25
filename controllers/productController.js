const { Product, Category, User } = require("../models");
// const nodemailer = require('nodemailer')

class Controller {
  static findAll(req, res) {
    console.log("masukkk<<<<<<<<<<<<<<<<<<<<<<");
    let { page, size } = req.query;
    let filter = {};

    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 4;
    }
    if (req.query.CategoriesId) {
      filter.CategoriesId = +req.query.CategoriesId;
    }

    const limit = parseInt(size);
    const offset = (page - 1) * size;

    Product.findAndCountAll({
      include: [Category],
      limit,
      offset,
      where: filter,
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }

  static findSelected(req, res) {
    Product.findOne({
      include: [Category, User],
      where: {
        id: +req.params.id,
      },
    })
      .then((result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ message: "Data not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }

  static findAllMyProduct() {
    Product.findAll({
      where: {
        UsersId: req.user.id,
      },
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log("errors find all<<<<<<<<<<<<<<<<<<<<<<<<<<");
        res.status(500).json({ message: err.message });
      });
  }

  static addProduct(req, res) {
    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<masuk add");
    console.log(req.body, "req body<<<<<<<<<<<<<<<<<<<<");
    const input = {
      name: req.body.name,
      description: req.body.description,
      image1: null,
      image2: null,
      image3: null,
      UsersId: req.user.id,
      CategoriesId: req.body.CategoriesId,
    };
    console.log(input, "input add <<<<<<<<<<<<<<<<<<<<<");

    if (req.image && req.image[0]) {
      input.image1 = req.image[0];
    }
    if (req.image && req.image[1]) {
      input.image2 = req.image[1];
    }
    if (req.image && req.image[2]) {
      input.image3 = req.image[2];
    }

    Product.create(input)
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        console.log(err, "<<<<<<<<<<<<<<<<<<<<<<<<<<errors add masuk");
        if (err.name === "SequelizeValidationError") {
          console.log("aaaaaaaaa");
          const errMsgs = [];

          err.errors.forEach((element) => {
            errMsgs.push(element.message);
          });
          res.status(400).json({ message: errMsgs });
        } else {
          console.log("bbbbbbbbbbb");
          res.status(500).json({ message: err.message });
        }
      });
  }

  static deleteProduct(req, res) {
    Product.destroy({
      where: {
        id: +req.params.id,
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

  static editProduct(req, res) {
    const input = {
      name: req.body.name,
      description: req.body.description,
      image1: req.body.image1,
      image2: req.body.image2,
      image3: req.body.image3,
      UsersId: req.user.id,
      Categories: req.body.CategoriesId,
    };

    if (req.image && req.image[0]) {
      input.image1 = req.image[0];
    }
    if (req.image && req.image[1]) {
      input.image1 = req.image[1];
    }
    if (req.image && req.image[0]) {
      input.image1 = req.image[0];
    }
    if (req.image && req.image[2]) {
      input.image1 = req.image[2];
    }

    Product.update(input, {
      where: {
        id: +req.params.id,
      },
    })
      .then(() => {
        res.status(200).json({ message: "Product Updated" });
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          const errMsgs = [];

          err.errors.forEach((element) => {
            errMsgs.push(element.message);
          });
          res.status(400).json({ message: errMsgs });
        } else {
          res.status(500).json({ message: err.message });
        }
      });
  }

  static sendEmail(req, res) {
    const input = {
      to: req.body.to,
      subject: req.body.subject,
      content: req.body.content,
    };

    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "satriopriambodo@outlook.com",
        pass: "satrio123",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const options = {
      from: "satriopriambodo@outlook.com",
      to: input.to,
      subject: input.subject,
      text: input.content,
    };

    transporter.sendMail(options, (err) => {
      if (err) {
        res.status(500).json({ message: "Wrong email or password" });
        return;
      } else {
        res.status(200).json({ message: "Email sent!" });
      }
    });
  }

  static sendSms(req, res) {
    const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.AUTH_TOKEN;
    const client = require("twilio")(accountSid, authToken);

    client.messages
      .create({
        body: req.body.content,
        from: "+13867039481",
        to: "+6281211838896",
      })
      .then(() => {
        res.status(200).json({ message: "Message sent!" });
      })
      .catch(() => {
        res.status(500).json({ message: "Unsuccessful send SMS" });
      });
  }
}

module.exports = Controller;

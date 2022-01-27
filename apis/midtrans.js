const nodemailer = require("nodemailer");
const axios = require(`axios`);
const { Bookmark, Product, Transaction } = require(`../models/index`);
const { Op } = require("sequelize");

const SANDBOX_BASE_URL = "https://app.sandbox.midtrans.com";
const PRODUCTION_BASE_URL = `https://api.midtrans.com/v2`;

let checkoutMid = async (req, res, next) => {
  try {
    const response = await Transaction.findOne({
      where: {
        [Op.and]: [{ UserId: req.auth.id }, { status: `pending` }],
      },
      attributes: {
        exclude: ["createdAt", `updatedAt`],
      },
    });

    if (response.length < 1) {
      res.status(200).json({ msg: `there is no orders yet` });
    } else {
      const response2 = await Bookmark.findAll({
        where: {
          [Op.and]: [{ UserId: req.auth.id }, { status: `pending` }],
        },
        attributes: {
          exclude: ["createdAt", `updatedAt`],
        },
        include: {
          model: Product,
          attributes: {
            exclude: ["createdAt", `updatedAt`],
          },
        },
      });

      let orderDetail = {
        order_id: `${response.order_id}`,
        totalPrice: 0,
        product: [],
      };

      response2.forEach((element) => {
        orderDetail.totalPrice += element.Product.price;
        orderDetail.product.push(element.Product);
      });

      req.user.checkout = orderDetail;
      next();
    }
  } catch (error) {
    next(error);
  }
};

let requestSnapToken = async (req, res, next) => {
  try {
    let AUTH_STRING = Buffer.from(`${process.env.MID_SERVER_KEY}:`).toString(
      "base64"
    );

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Basic ${AUTH_STRING}`,
    };

    let parameter = {
      transaction_details: {
        order_id: req.user.checkout.order_id,
        //   "order_id": req.user.checkout.order_id,
        gross_amount: req.user.checkout.totalPrice,
      },
    };

    const response = await axios.post(
      `${SANDBOX_BASE_URL}/snap/v1/transactions`,
      parameter,
      {
        headers: headers,
      }
    );

    const result = response.data;

    if (!result) throw { name: "ERROR_MIDTRANS" };

    const input = {
      order_id: parameter.transaction_details.order_id,
      UserId: req.auth.id,
      status: `pending`,
      ammount: parameter.transaction_details.gross_amount,
    };

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "satriopriambodo06@gmail.com",
        pass: `${process.env.NDMAILER}`,
      },
    });

    let notif = {
      from: "satriopriambodo06@gmail.com", // sender address
      to: req.user.email, // list of receivers
      subject: "You just Order from: SportsterGarage", // Subject line
      text: ` Hi, Thank you for the ordered!
                    This is your order:
                    Get your ordered here: ${result.redirect_url}

                    Best Regards,
                    SportsterGarage Admin
            `,
    };

    transporter.sendMail(notif, (err, data) => {
      if (err) {
        console.log(`Email not send`);
      } else {
        console.log(`Email has been sent`);
      }
    });

    res.status(200).json({
      result,
    });
  } catch (error) {
    console.log(error);
    error.name = `ERROR_MIDTRANS`;
    next(error);
  }
};

let updateStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    if (!orderId) throw { name: "TRANSACTION_NOT_FOUND" };

    const findTransaction = await Transaction.findOne({
      where: {
        order_id: orderId,
      },
    });

    if (!findTransaction) throw { name: "TRANSACTION_NOT_FOUND" };

    let AUTH_STRING = Buffer.from(`${process.env.MID_SERVER_KEY}:`).toString(
      "base64"
    );

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Basic ${AUTH_STRING}`,
    };

    const response = await axios.get(
      `https://api.sandbox.midtrans.com/v2/${orderId}/status`,
      {
        headers: headers,
      }
    );

    const status = response.data;
    let newStatus;

    if (status.status_code === 404) {
      newStatus = `failed`;
    }

    if (
      status.transaction_status === `expire` ||
      status.transaction_status === `cancel` ||
      status.transaction_status === `deny`
    ) {
      newStatus = `failed`;
    } else if (
      status.transaction_status === `settlement` ||
      status.transaction_status === `capture`
    ) {
      newStatus = `on Shipping`;
    }

    if (!newStatus) throw { name: "PLEASE_PAY_FIRST" };

    const removeAllItems = await Bookmark.update(
      {
        status: `completed`,
      },
      {
        where: {
          UserId: req.auth.id,
        },
      }
    );

    const findOneOrderId = await Transaction.update(
      {
        status: newStatus,
      },
      {
        where: {
          order_id: orderId,
        },
        returning: true,
      }
    );

    const result = findOneOrderId[1];

    res.status(200).json({
      result,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  requestSnapToken,
  checkoutMid,
  updateStatus,
};

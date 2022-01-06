const express = require("express");
const app = express();
const midtrans = require("midtrans-client");
const cors = require("cors");
const mongoose = require("mongoose");

const Transaction = require("./model");

require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/midtrans")
  .then(() => {
    console.log("success connect");
  })
  .catch((err) => {
    console.log(err);
  });

const snap = new midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

app.post("/pay", async (req, res, next) => {
  try {
    const {
      total_amount,
      first_name,
      last_name,
      email,
      phone,
      address,
      city,
      postal_code,
    } = req.body;

    let parameter = {
      transaction_details: {
        order_id: Date.now(),
        gross_amount: total_amount,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name,
        last_name,
        email,
        phone,
        billing_address: {
          first_name,
          last_name,
          email,
          phone,
          address,
          city,
          postal_code,
          country_code: "IDN",
        },
        shipping_address: {
          first_name,
          last_name,
          email,
          phone,
          address,
          city,
          postal_code,
          country_code: "IDN",
        },
      },
    };
    console.log(parameter);
    const data = await snap.createTransaction(parameter);
    res.status(200).json({
      code: 200,
      status: "OK",
      data: data,
    });
  } catch (error) {
    next(error);
  }
});

app.post("/callback", async (req, res, next) => {
  try {
    const notificationJson = req.body;
    snap.transaction.notification(notificationJson).then((statusResponse) => {
      let orderId = statusResponse.order_id;
      let transactionStatus = statusResponse.transaction_status;
      let fraudStatus = statusResponse.fraud_status;

      console.log(
        `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`
      );

      if (transactionStatus == "capture") {
        if (fraudStatus == "challenge") {
          Transaction.create({
            order_id: orderId,
            total_amount: statusResponse.gross_amount,
            transaction_status: transactionStatus,
          }).catch((err) => {
            next(err);
          });
          console.log("challenge");
        } else if (fraudStatus == "accept") {
          Transaction.create({
            order_id: orderId,
            total_amount: statusResponse.gross_amount,
            transaction_status: transactionStatus,
          }).catch((err) => {
            next(err);
          });
          console.log("success");
        }
      } else if (transactionStatus == "settlement") {
        Transaction.create({
          order_id: orderId,
          total_amount: statusResponse.gross_amount,
          transaction_status: transactionStatus,
        }).catch((err) => {
          next(err);
        });
        console.log("success");
        console.log("success");
      } else if (
        transactionStatus == "cancel" ||
        transactionStatus == "deny" ||
        transactionStatus == "expire"
      ) {
        Transaction.create({
          order_id: orderId,
          total_amount: statusResponse.gross_amount,
          transaction_status: transactionStatus,
        }).catch((err) => {
          next(err);
        });
        console.log("failure");
      } else if (transactionStatus == "pending") {
        Transaction.create({
          order_id: orderId,
          total_amount: statusResponse.gross_amount,
          transaction_status: transactionStatus,
        }).catch((err) => {
          next(err);
        });
        console.log("pending");
      }
    });
    res.status(200).json({
      code: 200,
      status: "OK",
      data: null,
    });
  } catch (error) {
    next(err);
  }
});

app.get

app.use(function (err, req, res, next) {
  res.status(500).json({
    code: 500,
    status: "Internal Server Error",
    error: err.message,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

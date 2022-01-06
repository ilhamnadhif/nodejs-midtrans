const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    order_id: {
      type: String,
      required: true,
    },
    total_amount: {
      type: String,
      required: true,
    },
    transaction_status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("transaction", transactionSchema);

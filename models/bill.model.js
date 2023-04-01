const { Schema, model } = require("mongoose");

const BillSchema = Schema({
  fecha: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  totalFactura: {
    type: Number,
    required: true,
  },
});

BillSchema.methods.toJSON = function () {
  const { __v, status, _id, ...bill } = this.toObject();
  bill.uid = _id;
  return bill;
};

module.exports = model("Bill", BillSchema);

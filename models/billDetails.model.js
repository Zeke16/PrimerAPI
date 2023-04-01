const { Schema, model } = require("mongoose");

const BillDetailSchema = Schema({
  bill: {
    type: Schema.Types.ObjectId,
    ref: "Bill",
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
  precioTotal: {
    type: Number,
    required: true,
  },
});

BillDetailSchema.methods.toJSON = function () {
  const { __v, status, _id, ...billDetail } = this.toObject();
  billDetail.uid = _id;
  return billDetail;
};

module.exports = model("BillDetail", BillDetailSchema);

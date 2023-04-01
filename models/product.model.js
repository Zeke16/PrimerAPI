const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, "name is mandatory"],
    unique: true,
  },
  product_status: {
    type: Boolean,
    default: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    default: 0,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

ProductSchema.methods.toJSON = function () {
  const { __v, status, _id, ...product } = this.toObject();
  product.uid = _id;
  return product;
};

module.exports = model("Product", ProductSchema);

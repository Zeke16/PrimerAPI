const { response } = require("express");
const Product = require("../models/product.model");

const getProducts = async (req, res = response) => {
  const query = { product_status: true };
  const [products, total] = await Promise.all([
    Product.find(query).populate("user", ["name", "email"]).populate("category", "name"),
    Product.countDocuments(query),
  ]);
  console.log(products);
  res.status(200).json({
    total: total,
    productos: products,
  });
};

const getProductById = async (req, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate("user", "name")
    .populate("category", "name");
  res.status(200).json({productos: product});
};

const createProduct = async (req, res = response) => {
  const { user, ...body } = req.body;

  const data = {
    ...body,
    name: body.name.toUpperCase(),
    user: req.user._id,
  };

  const product = new Product(data);
  console.log(product);
  await product.save();
  res.status(200).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { user, ...body } = req.body;

  const data = {
    ...body,
    name: body.name.toUpperCase(),
    user: req.user._id,
  };
  const product = await Product.findByIdAndUpdate(id, data);

  res.json(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );
  res.json(deletedProduct);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

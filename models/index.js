const Server = require("./server");
const User = require("./user.model");
const Role = require('./role.model');
const Category = require("./category.model");
const Product = require("./product.model");
const Bill = require("./bill.model");
const BillDetails = require("./billDetails.model")

module.exports = {
  Server,
  User,
  Role,
  Category,
  Product,
  Bill,
  BillDetails
};

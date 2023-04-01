const Category = require("../models/category.model");
const Product = require("../models/product.model");
const Role = require("../models/role.model");
const User = require("../models/user.model");
const Bill = require("../models/bill.model");
const BillDetails = require("../models/billDetails.model");

const isAValidRole = async (role = "") => {
  const roleExist = await Role.findOne({ role: role });
  if (!roleExist)
    throw new Error(`Role: ${role} is not registered in Database`);
};

const roleExists = async (role) => {
  const roleExist = await Role.findOne({ role });
  if (roleExist) throw new Error(`Role: ${role} is registered in Database`);
};

const emailExist = async (email = "") => {
  const emailExist = await User.findOne({ email });
  if (emailExist) throw new Error(`Email already exist in DB`);
};

const userByIdExist = async (id) => {
  const userExist = await User.findById(id);
  if (!userExist) throw new Error(`the Id does not exist`);
};

const categoryExistByName = async (name) => {
  const categoryExist = await Category.findOne({ name: name.toUpperCase() });
  if (categoryExist)
    throw new Error(`the category ${name} is registered in Database`);
};

const categoryExistById = async (id) => {
  const categoryExist = await Category.findById(id);
  if (!categoryExist) throw new Error(`the category ${id} does not exist`);
};

const productExistByName = async (name = "") => {
  const productExist = await Product.findOne({ name: name.toUpperCase() });
  if (productExist) throw new Error(`the product ${name} already exists`);
};

const productExistById = async (id) => {
  const productExist = await Product.findById(id);
  if (!productExist) throw new Error(`the product Id does not exist`);
};

const billExistById = async (id) => {
  const billExist = await Bill.findById(id);
  if (!billExist) throw new Error(`the bill not exists`);
};

const billExistByUserId = async (id) => {
  const billExist = await Bill.find({ user: id });
  if (billExist == "") throw new Error(`the user dont have bills`);
};

const billDetailsExistById = async (id) => {
  const billDetailsExist = await BillDetails.findById(id );
  if (!billDetailsExist) throw new Error(`the detail dont exist`);
};

const allowedCollections = async (collection = "", collections = []) => {
  const isIncluded = collections.includes(collection);
  if (!isIncluded)
    throw new Error(
      `La collection ${collection} is not allowed, ${collections}`
    );
  return true;
};

module.exports = {
  isAValidRole,
  roleExists,
  emailExist,
  userByIdExist,
  categoryExistById,
  categoryExistByName,
  productExistById,
  productExistByName,
  billExistById,
  billExistByUserId,
  billDetailsExistById,
  allowedCollections,
};

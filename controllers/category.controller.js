const { response } = require("express");
const Category = require("../models/category.model");

const getCategories = async (req, res = response) => {
  const query = { category_status: true };
  const [categories, total] = await Promise.all([
    //GET user data with his id
    Category.find().populate("user", ["name", "email"]),
    Category.countDocuments(query),
  ]);

  res.status(200).json({
    total: total,
    categoria: categories,
  });
};

const getCategoryById = async (req, res = response) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate("user", "name");
  console.log(category);
  if (!category.category_status) {
    return res.status(400).json({ error: "Recurso inhabilitado" });
  }
  res.status(200).json({
    categoria: category,
  });
};

const createCategory = async (req, res = response) => {
  const name = req.body.name.toUpperCase();
  const categoryDB = await Category.findOne({ name });

  if (categoryDB)
    return res
      .status(400)
      .json({ msg: `the category ${categoryDB.name} already exists` });

  const data = {
    name,
    user: req.user._id,
  };

  const category = new Category(data);
  await category.save();
  res.status(200).json(category);
};

const updateCategory = async (req, res = response) => {
  const { id } = req.params;
  const { user, ...body } = req.body;

  const data = {
    ...body,
    name: body.name.toUpperCase(),
    user: req.user._id,
  };

  const category = await Category.findByIdAndUpdate(id, data);

  res.json(category);
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const deletedCategory = await Category.findByIdAndUpdate(id, {
    status: false,
  });

  const deleted = await Category.findById(id);
  res.json({
    categoria: deletedCategory,
  });
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

const { response } = require("express");
const Role = require("../models/role.model");

const roleGet = async (req, res = response) => {
  const query = { status: true };
  const [role, total] = await Promise.all([
    Role.find(query),
    Role.countDocuments(query),
  ]);

  res.status(200).json({
    total_roles: total,
    roles: role,
  });
};

const rolePost = async (req, res = response) => {
  const { role } = req.body;
  const newRole = new Role({ role });

  await newRole.save();
  res.status(200).json({
    rol: newRole,
  });
};

const rolePut = async (req, res = response) => {
  const { id } = req.params;
  const { role } = req.body;

  const roleDb = await Role.findByIdAndUpdate(id, { role });
  console.log(roleDb);
  res.status(200).json({
    role: roleDb,
  });
};

const roleDelete = async (req, res = response) => {
  const { id } = req.params;
  const roleDb = Role.findByIdAndUpdate(id, { status: false });
  res.status(200).json({
    rol: roleDb,
  });
};

module.exports = {
  roleGet,
  rolePost,
  rolePut,
  roleDelete,
};

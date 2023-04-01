const { response } = require("express");
const Bill = require("../models/bill.model");
const BillDetails = require("../models/billDetails.model");
const User = require("../models/user.model");

const billGet = async (req, res = response) => {
  const [bill, total] = await Promise.all([
    Bill.find().populate("user"),
    Bill.countDocuments(),
  ]);

  return res.status(200).json({
    total: total,
    factura: bill
  });

};

const billGetById = async (req, res = response) => {
  const { id }  = req.params;
  const bills = await Bill.findById(id).populate("user");
  
  return res.status(200).json({
    factura_id: bills
  })
}

const billGetByUserId = async (req, res = response) => {
  const { id }  = req.params;
  const bills = await Bill.find({user: id});

  const user = await User.findById(id);

  return res.status(200).json({
    usuario: user,
    facturas_usuario: bills
  })
}

const billDetailGetById = async (req, res = response) => {

  const { id, bill} = req.params;
  
  const user = await User.findById(id);
  const billDetails = await BillDetails.find({bill: bill});

  return res.status(200).json({
     usuario: user,
     detalle_de_factura: billDetails
  })
}


module.exports = {
    billGet,
    billGetById,
    billGetByUserId,
    billDetailGetById
}

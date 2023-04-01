const { response } = require("express");
const BillDetails = require("../models/billDetails.model");
const Bill = require("../models/bill.model");
const Product = require("../models/product.model");

const billDetailGet = async (req, res = response) => {
  const [details, total] = await Promise.all([
    BillDetails.find().populate("product"),
    BillDetails.countDocuments(),
  ]);

  res.status(200).json({
    total: total,
    detalle: details,
  });
};

const billDetailGetById = async (req, res = response) => {
  const { id }  = req.params;
  const details = await BillDetails.findById(id).populate("product").populate({
    path: "bill",
    populate: {
      path: "user"
    }
  });

  res.status(200).json({
    detalle: details,
  });
};

const billDetailPost = async (req, res = response) => {
  const { total, productos } = req.body;

  let now = new Date().toLocaleString('es-ES', {
    timeZone: process.env.TIMEZONE
  });

  const data = {
    totalFactura: total,
    user: req.user._id,
    fecha: now
  };

  const bill = new Bill(data);
  await bill.save();

  const productosKey = Object.keys(productos);

  for (let i = 0; i < productosKey.length; i++) {
    let keyActual = productosKey[i];
    let productoActual = productos[keyActual].product;
    let cantidadActual = productos[keyActual].cantidad;
    let precioActual = productos[keyActual].precioTotal;

    let dataDetails = {
      bill: bill._id,
      product: productoActual,
      cantidad: cantidadActual,
      precioTotal: precioActual,
    };

    
    
    const billDetail = new BillDetails(dataDetails);
    await billDetail.save();
  }

  res.status(200).json({
    factura: bill
  });
};

const billDetailPut = async (req, res = response) => {
  const { id } = req.params;
  const { product, cantidad } = req.body;

  if(cantidad > 7){
    return res.status(400).json({
      error: "No puedes comprar mas de 7 unidades por producto"
    })
  }

  const { bill, precioTotal } = await BillDetails.findById(id);
  const { precio } = await Product.findById(product);
  const totalDetail = precio * cantidad;
  const updateDetail = await BillDetails.findByIdAndUpdate(id, {product: product, cantidad: cantidad, precioTotal: totalDetail});

  const { totalFactura } = await Bill.findById(bill);
  const totalNuevo = totalFactura - precioTotal + totalDetail;
  const updateBill = await Bill.findByIdAndUpdate(bill, {totalFactura: totalNuevo});

  const updatedDetail = await BillDetails.findById(id);
  const updatedBill = await Bill.findById(bill);

  return res.status(200).json({
    factura_actualizada: updatedBill,
    registro_actualizado: updatedDetail
  })
}

module.exports = {
  billDetailGet,
  billDetailGetById,
  billDetailPost,
  billDetailPut
};

const { request, response } = require("express");
const Product = require("../models/product.model");

const generateBillDetail = async (req = request, res = response, next) => {
  let { productos } = req.body;
  if (!productos) return res.status(400).json({ msg: "Productos no existen" });

  let keys = Object.keys(productos);
  let total = 0;
  let verifyProduct = [];

  if (keys.length > 10) {
    return res.status(400).json({
      error: `Productos comprados exceden el limite (10)`,
    });
  }

  for (let i = 0; i < keys.length; i++) {
    let claveActual = keys[i];
    let productoActual = productos[claveActual].product;
    let cantidadActual = productos[claveActual].cantidad;

    const existeProducto = await Product.findById(productoActual);

    if (!existeProducto) {
      return res.status(400).json({
        error: `Producto no existe en la db`,
      });
    }

    if (cantidadActual > 7) {
      return res.status(400).json({
        error: "Solo puedes comprar 7 unidades por producto",
      });
    }

    if(!verifyProduct.includes(productoActual)){
      verifyProduct.push(productoActual, 0);
    }
    
    if (verifyProduct.includes(productoActual)) {
      let index = verifyProduct.findIndex(x => x === productoActual);
      verifyProduct[index + 1] += cantidadActual;
      console.log(verifyProduct)
      if (verifyProduct[index + 1] > 7) {
        return res.status(400).json({
          error: "No puedes comprar mas de 7 unidades por producto",
        });
      }
    }

    let precioActual = existeProducto.precio * cantidadActual;
    total += precioActual;
    productos[claveActual].precioTotal = precioActual;
  }
  req.body.total = total;
  next();
};

module.exports = {
  generateBillDetail,
};

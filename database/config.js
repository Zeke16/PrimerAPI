const mongoose = require("mongoose");

const dbConexion = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);
    console.log("Conexion exitosa.");
  } catch (error) {
    console.log(error);
    throw new Error("Conexion erronea");
  }
};

module.exports = {
  dbConexion,
};

const dbValidators = require("./db-validators");
const generateJWT = require("./generate-jwt");
const fileUpload = require("./file-upload");
const generateDetail = require("./generate-billDetail");

module.exports = {
  ...dbValidators,
  ...generateJWT,
  ...generateDetail
  //...fileUpload,
};

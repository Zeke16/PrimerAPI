const validateFields = require("./validate-fields");
const validateFileUpload = require("./validate-file");
const validateJWT = require("./validate-jwt");
const validateRoles = require("./validate-role");

module.exports = {
  ...validateFields,
  //...validateFileUpload,
  ...validateJWT,
  ...validateRoles,
};

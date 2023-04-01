const { model, Schema } = require("mongoose");

const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, "Role is mandatory"],
  },
  status: {
    type: Boolean,
    default: true
  }
});


module.exports = model("Role", RoleSchema);

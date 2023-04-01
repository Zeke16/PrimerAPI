const { Schema, model } = require("mongoose");

const CategorysSchema = Schema({
  name: {
    type: String,
    required: [true, "name is mandatory"],
    unique: true,
  },
  category_status: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

CategorysSchema.methods.toJSON = function () {
  const { __v, status, _id, ...data } = this.toObject();
  data.uid = _id;
  return data;
};

module.exports = model("Category", CategorysSchema);

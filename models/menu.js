const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema(
  {
    name: { type: String, required: true },
    foods: [{ type: mongoose.Types.ObjectId, ref: "Food" }],
    price :{ type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
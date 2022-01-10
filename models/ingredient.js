const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new Schema(
  {
    name: { type: String, required: true },
    allergyc: { type: Boolean, required: true, default: false },
    price :{ type: Number, required: true },
    provider: { type: mongoose.Types.ObjectId, ref: "Provider" },
  },
  {
    timestamps: true,
  }
);

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema(
  {
    name: { type: String, required: true },
    ingredients: [{ type: mongoose.Types.ObjectId, ref: "Ingredient" }],
    price :{ type: Number, required: true },
    type :{ type: String, required: true },

  },
  {
    timestamps: true,
  }
);

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
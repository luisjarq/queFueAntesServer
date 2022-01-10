const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const providerSchema = new Schema(
  {
    name: { type: String, required: true },
    telephone: { type: String, required: true },
    email: { type: String, required: false },
  },
  { timestamps: true }
);

const Provider = mongoose.model("Provider", providerSchema);
module.exports = Provider;
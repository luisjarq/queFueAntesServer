const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const milestoneSchema = new Schema(
  {
    name: { type: String, required: true },
    image_urls: [{ type: String}],
    menus: [{ type: mongoose.Types.ObjectId, ref: "Menu" }],
  },
  { timestamps: true }
);

const Milestone = mongoose.model("Milestone", milestoneSchema);
module.exports = Milestone;

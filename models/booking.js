const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    people: { type: Number, required: true },
    date: { type: Date, required: true },
    allergic: [{ type: String, required: true }],
    comment: { type: String, required: true },
    place: { type: String },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;

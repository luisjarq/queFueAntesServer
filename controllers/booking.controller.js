const { Error } = require("mongoose");
const Booking = require("../models/booking");

function getAllBookings(req, res, next) {
  Booking.find().exec((error, booking) => {
    if (error) {
      next(error);
    }
    return res.json(booking);
  });
}

function getById(req, res, next) {
  const id = req.params.id;
  Booking.findById(id).exec((error, booking) => {
    if (!booking) {
      const notFound = new Error(`[ERROR] Id ${id} not found`);
      notFound.status = 404;
      next(notFound);
      return;
    } else if (error) {
      next(error);
      return;
    }
    return res.json(booking);
  });
}
async function postBooking(req, res, next) {
  const newBooking = new Booking({
    people: req.body.name,
    date: req.body.date,
    allergic: req.body.allergic,
    comment: req.body.comment,
    place: req.body.place,
  });
  newBooking
    .save()
    .then(() => res.status(201).json(newBooking))
    .catch((error) => {
      next(error);
    });
}
function putBooking(req, res, next) {
  const id = req.params.id;
  const newBooking = new Booking({
    people: req.body.name,
    date: req.body.date,
    allergic: req.body.allergic,
    comment: req.body.comment,
    place: req.body.place,
    _id: id,
  });
  Booking.findByIdAndUpdate(id, newBooking)
    .then(() => res.status(200).json(newBooking))
    .catch((error) => {
      next(error);
    });
}
function deleteBooking(req, res, next) {
  const id = req.params.id;
  Booking.findByIdAndDelete(id)
    .then(() => res.status(200).json(`Booking with id ${id} deleted`))
    .catch((error) => {
      next(error);
    });
}
// Funciones auxiliares, no exportar
module.exports = {
  getAllBookings,
  getById,
  postBooking,
  putBooking,
  deleteBooking,
};
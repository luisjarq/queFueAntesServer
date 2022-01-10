const express = require("express");
const router = express.Router();
const {
  getAllBookings,
  getById,
  postBooking,
  putBooking,
  deleteBooking,
} = require("../controllers/booking.controller");
const { isAuth } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/admin.middleware");
// READ OPERATIONS
router.get("/", [isAdmin], getAllBookings);
router.get("/:id", getById);
// CREATE OPERATION
router.post("/", [isAuth], postBooking);
// UPDATE OPERATION
router.put("/:id", [isAuth], putBooking);
// DELETE OPERATION
router.delete("/:id", [isAuth], deleteBooking);

module.exports = router;

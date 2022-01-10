const express = require("express");
const router = express.Router();
const {
  getAllFoods,
  getById,
  postFood,
  putFood,
  deleteFood,
  getByName,
} = require("../controllers/foods.controller");
const { isAuth } = require("../middleware/auth.middleware");
// READ OPERATIONS
router.get("/", getAllFoods);
router.get("/name/:name" , getByName);
router.get("/:id" , getById);
// CREATE OPERATION
router.post("/", [isAuth], postFood);
// UPDATE OPERATION
router.put("/:id", [isAuth], putFood);
// DELETE OPERATION
router.delete("/:id", [isAuth], deleteFood);

module.exports = router;
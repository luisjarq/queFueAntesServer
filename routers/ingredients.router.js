const express = require("express");
const router = express.Router();
const {
  getAllIngredients,
  getById,
  postIngredient,
  putIngredient,
  deleteIngredient,
  getByName,
} = require("../controllers/ingredients.controller");
const { isAuth } = require("../middleware/auth.middleware");
// READ OPERATIONS
router.get("/", getAllIngredients);
router.get("/name/:name" , getByName);
router.get("/:id" , getById);
// CREATE OPERATION
router.post("/", [isAuth], postIngredient);
// UPDATE OPERATION
router.put("/:id", [isAuth], putIngredient);
// DELETE OPERATION
router.delete("/:id", [isAuth], deleteIngredient);

module.exports = router;
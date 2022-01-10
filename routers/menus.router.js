const express = require("express");
const router = express.Router();
const {
  getAllMenus,
  getById,
  postMenu,
  putMenu,
  deleteMenu,
  getByName,
} = require("../controllers/menus.controller");
const { isAuth } = require("../middleware/auth.middleware");
// READ OPERATIONS
router.get("/", getAllMenus);
router.get("/name/:name" , getByName);
router.get("/:id" , getById);
// CREATE OPERATION
router.post("/", [isAuth], postMenu);
// UPDATE OPERATION
router.put("/:id", [isAuth], putMenu);
// DELETE OPERATION
router.delete("/:id", [isAuth], deleteMenu);

module.exports = router;
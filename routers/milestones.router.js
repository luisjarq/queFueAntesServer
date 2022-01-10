const express = require("express");
const router = express.Router();
const {
  getAllMilestones,
  getById,
  postMilestone,
  putMilestone,
  deleteMilestone,
  getByName,
} = require("../controllers/milestones.controller");
const { isAuth } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/admin.middleware");
// READ OPERATIONS
router.get("/", getAllMilestones);
router.get("/name/:name", getByName);
router.get("/:id", getById);
// CREATE OPERATION
router.post("/", [isAdmin], postMilestone);
// UPDATE OPERATION
router.put("/:id", [isAdmin], putMilestone);
// DELETE OPERATION
router.delete("/:id", [isAdmin], deleteMilestone);

module.exports = router;

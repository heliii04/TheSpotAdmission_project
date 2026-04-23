const express = require("express");
const router = express.Router();
const controller = require("../controllers/PersonalizedCounselingController");

const { protect, authorize } = require("../middleware/authMiddleware");

router.post("/", controller.createForm); // Public
router.get("/", protect, authorize('admin', 'counsellor'), controller.getForms); 
router.get("/:id", protect, authorize('admin', 'counsellor'), controller.getFormById);
router.put("/:id", protect, authorize('admin'), controller.updateForm);
router.delete("/:id", protect, authorize('admin'), controller.deleteForm);

module.exports = router;

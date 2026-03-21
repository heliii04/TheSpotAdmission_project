const express = require("express");
const router = express.Router();
const controller = require("../controllers/PersonalizedCounselingController");

router.post("/", controller.createForm);
router.get("/", controller.getForms);
router.get("/:id", controller.getFormById);
router.put("/:id", controller.updateForm);
router.delete("/:id", controller.deleteForm);

module.exports = router;

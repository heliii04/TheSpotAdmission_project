const express = require("express");
const {
  createForm,
  getForms,
  updateForm,
  deleteForm
} = require("../controllers/admissionFormController");

const router = express.Router();

router.post("/", createForm);
router.get("/", getForms);
router.put("/:id", updateForm);
router.delete("/:id", deleteForm);

module.exports = router;

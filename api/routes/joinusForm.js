const router = require("express").Router();

// Event controllers
const {
  addNewJoinUsForm,
  joinUsFormList,
} = require("../controllers/joinusForm");

//task validation
const { validateJoinUsForm } = require("../../util/joinusFormValidation");

//routes
router.post("/add-new", validateJoinUsForm, addNewJoinUsForm);
router.get("/list", joinUsFormList);

module.exports = router;

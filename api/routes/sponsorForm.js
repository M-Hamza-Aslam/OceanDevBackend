const router = require("express").Router();

// Event controllers
const {
  addNewSponsorForm,
  sponsorFormList,
} = require("../controllers/sponsorForm");

//task validation
const { validateSponsorForm } = require("../../util/sponsorFormValidation");

//routes
router.post("/add-new", validateSponsorForm, addNewSponsorForm);
router.get("/list", sponsorFormList);

module.exports = router;

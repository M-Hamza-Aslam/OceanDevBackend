// input validation
const { validationResult } = require("express-validator");
//model
const SponsorForm = require("../models/sponsorForm");

module.exports = {
  addNewSponsorForm: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      } else {
        const { companyName, contactPerson, email, sponsorshipLevel, message } =
          req.body;

        //create new sponsor form
        const sponsorForm = new SponsorForm({
          companyName,
          contactPerson,
          email,
          sponsorshipLevel,
          message,
        });
        const result = await sponsorForm.save();
        //return response
        const newSponsorForm = {
          _id: result._id.toString(),
          companyName: result.companyName,
          contactPerson: result.contactPerson,
          email: result.email,
          sponsorshipLevel: result.sponsorshipLevel,
          message: result.message,
        };
        res.status(201).json({
          message: "Form submitted successfully!",
          sponsorForm: newSponsorForm,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  sponsorFormList: async (req, res) => {
    try {
      const result = await SponsorForm.find();
      res.status(200).json({
        message: "Fetched sponsor forms successfully.",
        SponsorFormForms: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

// input validation
const { validationResult } = require("express-validator");
//model
const JoinUsForm = require("../models/joinusForm");

module.exports = {
  addNewJoinUsForm: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      } else {
        const { firstName, lastName, email, phone, message } = req.body;
        //create new join us form
        const joinUsForm = new JoinUsForm({
          firstName,
          lastName,
          email,
          phone,
          message,
        });
        const result = await joinUsForm.save();
        //return response
        const newJoinUsForm = {
          _id: result._id.toString(),
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          phone: result.phone,
          message: result.message,
        };

        res.status(201).json({
          message: "Form submitted successfully!",
          joinUsForm: newJoinUsForm,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  joinUsFormList: async (req, res) => {
    try {
      const result = await JoinUsForm.find();
      res.status(200).json({
        message: "Fetched join us forms successfully.",
        joinUsForms: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

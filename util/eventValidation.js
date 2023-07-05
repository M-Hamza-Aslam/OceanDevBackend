const { body } = require("express-validator");

module.exports = {
  validateEvent: [
    body("title")
      .isLength({ min: 5 })
      .withMessage("Title must be at least 5 characters long"),
    body("date").notEmpty().withMessage("Date is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("description")
      .isLength({ min: 10 })
      .withMessage("Description must be at least 10 characters long"),
  ],
};

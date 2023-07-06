const { body } = require("express-validator");

module.exports = {
  validateEvent: [
    body("title").notEmpty().withMessage("Title is required"),
    body("date").notEmpty().withMessage("Date is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("status").notEmpty().withMessage("Status is required"),
    body("img").notEmpty().withMessage("Image is required"),
  ],
};

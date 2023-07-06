const { body } = require("express-validator");

module.exports = {
  validateSponsorForm: [
    body("companyName").notEmpty().withMessage("Company name is required"),
    body("contactPerson").notEmpty().withMessage("Contact person is required"),
    body("email").custom((value, { req }) => {
      const regix = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if (!regix.test(value)) {
        return Promise.reject("Invalid email address");
      }
      return true;
    }),
    body("sponsorshipLevel")
      .notEmpty()
      .withMessage("Sponsorship level is required"),
    body("message").notEmpty().withMessage("Message is required"),
  ],
};

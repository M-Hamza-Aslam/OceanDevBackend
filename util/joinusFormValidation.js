const { body } = require("express-validator");

module.exports = {
  validateJoinUsForm: [
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("email").custom((value, { req }) => {
      const regix = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if (!regix.test(value)) {
        return Promise.reject("Invalid email address");
      }
      return true;
    }),
    body("phone").notEmpty().withMessage("Phone is required"),
    body("message").notEmpty().withMessage("Message is required"),
  ],
};

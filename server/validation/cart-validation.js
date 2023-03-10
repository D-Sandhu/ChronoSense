const { param, body } = require("express-validator");

const itemIdValidation = [
  // Check if _id exists in URL path
  param("_id")
  .exists()
  .withMessage("Please provide an _id parameter"),

  // Parse the _id to correct format
  param("_id").toInt(),

  // Check if parsed _id value is a valid number
  param("_id")
  .isInt({ min: 1 })
  .withMessage("_id must be a positive integer"),
];

const itemQuantityValidation = [
  // Check if required field exists
  body("quantity")
  .exists()
  .withMessage("Missing quantity field"),

  // Check if quantity is a valid value
  body("quantity")
    .isInt({ min: 1 })
    .withMessage("quantity must be a positive integer"),
];


module.exports = { itemIdValidation, itemQuantityValidation };


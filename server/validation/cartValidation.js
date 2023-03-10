const { body } = require("express-validator");

// Validation chain for adding a cart item
const addCartItemValidation = [
  // Check if required fields exist
  body("_id").exists().withMessage("Missing _id field"),
  body("name").exists().withMessage("Missing name field"),
  body("price").exists().withMessage("Missing price field"),
  body("numInStock").exists().withMessage("Missing numInStock field"),
  body("imageSrc").exists().withMessage("Missing imageSrc field"),
  body("quantity").exists().withMessage("Missing quantity field"),

  // Parse data to correct format
  body("_id").toInt(),
  body("price").toFloat(),
  body("numInStock").toInt(),
  body("quantity").toInt(),

  // Check if parsed values are valid numbers
  body("_id").isInt({ min: 1 }).withMessage("_id must be a positive integer"),
  body("price")
    .isFloat({ min: 1 })
    .withMessage("price must be a positive number"),
  body("numInStock")
    .isInt({ min: 1 })
    .withMessage("numInStock must be a positive integer"),
  body("quantity")
    .isInt({ min: 1 })
    .withMessage("quantity must be a positive integer"),
  // Check if name and imageSrc are strings
  body(["name", "imageSrc"]).isString().trim(),
];

module.exports = { addCartItemValidation };

const { validationResult } = require("express-validator");

// Middleware function to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  // Return an error response if any validation fails
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 400,
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  // Move to the next middleware function
  next();
};

module.exports = { handleValidationErrors };

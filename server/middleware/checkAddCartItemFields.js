// Middleware function to validate the fields in the request body for adding a cart item
const checkAddCartItemFields = (req, res, next) => {
  const { _id, name, price, numInStock, imageSrc, quantity } = req.body;

  // Validate required fields
  const requiredFields = [
    "_id",
    "name",
    "price",
    "numInStock",
    "imageSrc",
    "quantity",
  ];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  // Return an error response if any required field is missing
  if (missingFields.length > 0) {
    return res
      .status(400)
      .json({
        status: 400,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
  }

  // Parse data to correct format
  req.body._id = parseInt(_id);
  req.body.price = parseFloat(price);
  req.body.numInStock = parseInt(numInStock);
  req.body.quantity = parseInt(quantity);

  // Move to the next middleware function
  next();
};

module.exports = { checkAddCartItemFields };

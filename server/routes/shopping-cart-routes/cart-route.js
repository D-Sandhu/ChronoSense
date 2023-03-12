const express = require("express");
const router = express.Router();

const {
  getCart,
  addCartItem,
  updateItemQuantity,
  removeCartItem,
} = require("../../controllers/cart-controller");

const {
  handleValidationErrors,
} = require("../../validation/handle-validation-errors");

const {
  itemIdValidation,
  itemQuantityValidation,
} = require("../../validation/cart-validation");

router.get("/", getCart);

router.post(
  "/:productId",
  itemIdValidation,
  itemQuantityValidation,
  handleValidationErrors,
  addCartItem
);

router.patch(
  "/:productId",
  itemIdValidation,
  itemQuantityValidation,
  handleValidationErrors,
  updateItemQuantity
);

router.delete(
  "/:productId",
  itemIdValidation,
  handleValidationErrors,
  removeCartItem
);

// router.delete("/");

module.exports = router;

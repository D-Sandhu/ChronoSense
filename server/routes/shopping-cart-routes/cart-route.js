const express = require("express");
const router = express.Router();

const {
  getCart,
  addCartItem,
  updateItemQuantity,
} = require("../../controllers/cart-controller");

const {
  handleValidationErrors,
} = require("../../validation/handle-validation-errors");

const { addCartItemValidation } = require("../../validation/cart-validation");

router.get("/", getCart);

router.post("/", addCartItemValidation, handleValidationErrors, addCartItem);

router.patch("/:_id", updateItemQuantity);

// router.delete("/:_id");

// router.delete("/");

module.exports = router;

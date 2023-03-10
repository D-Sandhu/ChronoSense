const express = require("express");
const router = express.Router();

const { getCart, addCartItem } = require("../../controllers/cartController");

const {
  handleValidationErrors,
} = require("../../validation/handleValidationErrors");

const { addCartItemValidation } = require("../../validation/cartValidation");

router.get("/", getCart);

router.post("/", addCartItemValidation, handleValidationErrors, addCartItem);

// router.patch("/:_id");

// router.delete("/:_id");

// router.delete("/");

module.exports = router;

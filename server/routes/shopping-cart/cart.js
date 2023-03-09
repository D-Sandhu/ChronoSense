const express = require("express");
const router = express.Router();

const {
  getCart,
  addCartItem,
  checkAddCartItemFields,
} = require("../../controllers/cartController");

router.get("/", getCart);

router.post("/", checkAddCartItemFields, addCartItem);

// router.patch("/:_id");

// router.delete("/:_id");

// router.delete("/");

module.exports = router;

const express = require("express");
const router = express.Router();

const { getCart } = require("../../controllers/cartController");

router.get("/", getCart);

// router.post("/:_id");

// router.patch("/:_id");

// router.delete("/:_id");

// router.delete("/");

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getCategories,
  getFilterOptions,
} = require("../controllers/products-controller");

router.get("/categories", getCategories);

router.get("/filters", getFilterOptions);

// router.get("/:productId", getProductDetails)

module.exports = router;

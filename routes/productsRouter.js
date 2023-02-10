const express = require("express");
const advancedResults = require("../middlewares/advancedResults");
const Product = require("../models/productModel");
const {
  getProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/productsController");
const router = express.Router();

router.route("/:id").get(getProduct).delete(deleteProduct).put(updateProduct);

router.route("/").get(advancedResults(Product), getProducts);

module.exports = router;

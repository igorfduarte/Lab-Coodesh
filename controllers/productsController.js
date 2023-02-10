const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const ErrorResponse = require("../utils/errorResponse");
const axios = require("axios");

// @desc    Fetch single product
// @route   GET /products/:id
// @access  Public
exports.getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ code: req.params.id });

  if (!product) return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));

  res.json(product);
});

// @desc    Fetch all products
// @route   GET /products/:id
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults);
});

// @desc    delete product
// @route   DELETE /products/:id
// @access  Public
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ code: req.params.id });

  if (!product) return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404));

  product.status = "trash";
  await product.save();
  res.json(product);
});

// @desc    update product
// @route   UPDATE /products/:id
// @access  Public
exports.updateProduct = asyncHandler(async (req, res) => {


  try {
    const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/4000405002070.json`);

    let product = await Product.findOneAndUpdate({ code: req.params.id }, response.data);
    product.status = "draft";
    await product.save();
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

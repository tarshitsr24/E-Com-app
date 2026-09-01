const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const Product = require("../Models/Product");
const router = express.Router();
const ProductService = require("../Services/productService"); 
const ApiResponse = require("../../utils/apiResponse")

const registerProductController = asyncHandler(async (req, res) => {
  const product = await ProductService.registerProductService(
    req.body,
    req.user.id,
  ); 
  return res.status(201).json({ 
     new ApiResponse(201, product, 'Product created successfully')
  })
});

const updateProductController = asyncHandler(async (req, res) => {
  // const product = await createProductService
});

const deleteProductController = asyncHandler(async (req, res) => {
  // const product = await createProductService
});

const getAllProductController = asyncHandler(async (req, res) => {
  // const product = await createProductService
});

const getProductByIdController = asyncHandler(async (req, res) => {
  // const product = await createProductService
});

module.exports = {
  registerProductController,
  updateProductController,
  deleteProductController,
  getAllProductController,
  getProductByIdController,
};

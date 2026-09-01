const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../Middleware/Token");
const {createProductSchema , updateProductSchema  }  = require("../Models/Product");

router.post("/", verifyAccessToken,validate(createProductSchema), registerProductController);
router.post("/:id",verifyAccessToken, validate(updateProductSchema), updateProductController);
router.post("/:id",verifyAccessToken, deleteProductController);
router.post("/", getAllProductController);
router.post("/:id", getProductsByIdController);

module.exports = router; 

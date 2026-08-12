const express = require("express");

const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const router = express.Router();


// Add Product
router.post("/products", addProduct);


// Get All Products
router.get("/products", getProducts);


// Get Product By ID
router.get("/products/:id", getProductById);


// Update Product
router.put("/products/:id", updateProduct);


// Delete Product
router.delete("/products/:id", deleteProduct);


module.exports = router;
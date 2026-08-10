const express = require("express");

const {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");
const router = express.Router();

// Add Product
router.post("/products", addProduct);

// Get All Products
router.get("/products", getProducts);

// Update Product
router.put("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

module.exports = router;
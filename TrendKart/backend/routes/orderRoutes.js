const express = require("express");

const {
  createOrder,
  getAllOrders,
  getOrderById
} = require("../controllers/orderController");

const router = express.Router();


// Create Order
router.post("/", createOrder);


// Get All Orders
router.get("/", getAllOrders);


// Get Order By ID
router.get("/:id", getOrderById);


module.exports = router;

const express = require("express");

const {
    adminLogin,
    getAllUsers
} = require("../controllers/adminController");

const router = express.Router();

// Admin Login
router.post("/login", adminLogin);

// Get All Users
router.get("/users", getAllUsers);

module.exports = router;


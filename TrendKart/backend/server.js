const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
require("./config/db");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

//Auth Routes
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/admin", productRoutes);


// Test API
app.get("/", (req, res) => {
    res.send("TrendKart Backend Server Running 🚀");
});


// Server Port
const PORT = process.env.PORT || 5000;


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
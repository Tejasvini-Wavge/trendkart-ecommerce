const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminLogin = (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    const sql = "SELECT * FROM admins WHERE email = ?";

    db.query(sql, [email], async (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                message: "Database error"
            });
        }

        if (result.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const admin = result[0];

        const passwordMatch = await bcrypt.compare(
            password,
            admin.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: admin.id,
                email: admin.email,
                role: "admin"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h"
            }
        );

        res.json({
            message: "Admin login successful",
            token: token,
            admin: {
                id: admin.id,
                name: admin.name,
                email: admin.email
            }
        });

    });
};






const getAllUsers = (req, res) => {

    const sql = `
        SELECT
            id,
            name,
            email,
            is_verified,
            created_at
        FROM users
        ORDER BY id DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {
            console.log("Error fetching users:", err);

            return res.status(500).json({
                message: "Failed to fetch users"
            });
        }

        res.status(200).json({
            message: "Users fetched successfully",
            users: results
        });

    });
};


module.exports = {
    adminLogin,
    getAllUsers
};
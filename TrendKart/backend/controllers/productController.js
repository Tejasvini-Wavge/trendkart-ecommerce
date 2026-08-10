const db = require("../config/db");

// Add Product
const addProduct = (req, res) => {

    const {
        name,
        description,
        price,
        category,
        image,
        stock
    } = req.body;

    const sql = `
        INSERT INTO products
        (name, description, price, category, image, stock)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [name, description, price, category, image, stock],
        (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: "Failed to add product"
                });
            }

            res.status(201).json({
                message: "Product added successfully",
                productId: result.insertId
            });

        }
    );
};


// Get All Products
const getProducts = (req, res) => {

    const sql = "SELECT * FROM products";

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                message: "Failed to get products"
            });
        }

        res.json({
            products: result
        });

    });
};



const updateProduct = (req, res) => {

    const { id } = req.params;

    const {
        name,
        description,
        price,
        category,
        image,
        stock
    } = req.body;

    const sql = `
        UPDATE products
        SET
            name = ?,
            description = ?,
            price = ?,
            category = ?,
            image = ?,
            stock = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            name,
            description,
            price,
            category,
            image,
            stock,
            id
        ],
        (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: "Failed to update product"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }

            res.json({
                message: "Product updated successfully"
            });

        }
    );
};



const deleteProduct = (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM products WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.log(err);

            return res.status(500).json({
                message: "Failed to delete product"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product deleted successfully"
        });

    });
};

module.exports = {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct
};

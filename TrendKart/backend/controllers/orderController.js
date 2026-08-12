const db = require("../config/db");


// ========================================
// CREATE ORDER
// ========================================

const createOrder = (req, res) => {

  const {
    user_id,
    customer_name,
    email,
    phone,
    address,
    city,
    state,
    pincode,
    total_amount,
    payment_method,
    items
  } = req.body;


  // Validate required data

  if (
    !customer_name ||
    !email ||
    !phone ||
    !address ||
    !city ||
    !state ||
    !pincode ||
    !total_amount ||
    !items ||
    items.length === 0
  ) {

    return res.status(400).json({
      message: "Please provide all required order details"
    });

  }


  // Start database transaction

  db.beginTransaction((err) => {

    if (err) {

      console.error(err);

      return res.status(500).json({
        message: "Transaction failed"
      });

    }


    // Insert order

    const orderSql = `
      INSERT INTO orders
      (
        user_id,
        customer_name,
        email,
        phone,
        address,
        city,
        state,
        pincode,
        total_amount,
        payment_method
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;


    db.query(
      orderSql,
      [
        user_id || null,
        customer_name,
        email,
        phone,
        address,
        city,
        state,
        pincode,
        total_amount,
        payment_method || "Cash on Delivery"
      ],
      (err, result) => {

        if (err) {

          return db.rollback(() => {

            console.error(err);

            res.status(500).json({
              message: "Failed to create order"
            });

          });

        }


        const orderId = result.insertId;


        // Insert order items

        const itemSql = `
          INSERT INTO order_items
          (
            order_id,
            product_id,
            product_name,
            price,
            quantity,
            subtotal
          )
          VALUES ?
        `;


        const itemValues = items.map((item) => [

          orderId,

          item.id,

          item.name,

          Number(item.price),

          item.quantity,

          Number(item.price) *
          Number(item.quantity)

        ]);


        db.query(
          itemSql,
          [itemValues],
          (err) => {

            if (err) {

              return db.rollback(() => {

                console.error(err);

                res.status(500).json({
                  message:
                    "Failed to add order items"
                });

              });

            }


            // Commit transaction

            db.commit((err) => {

              if (err) {

                return db.rollback(() => {

                  console.error(err);

                  res.status(500).json({
                    message:
                      "Failed to complete order"
                  });

                });

              }


              res.status(201).json({

                message:
                  "Order placed successfully",

                orderId: orderId

              });

            });

          }
        );

      }
    );

  });

};



// ========================================
// GET ALL ORDERS
// ========================================

const getAllOrders = (req, res) => {

  const sql = `
    SELECT *
    FROM orders
    ORDER BY created_at DESC
  `;


  db.query(sql, (err, results) => {

    if (err) {

      console.error(err);

      return res.status(500).json({
        message: "Failed to get orders"
      });

    }


    res.status(200).json({
      orders: results
    });

  });

};



// ========================================
// GET ORDER BY ID
// ========================================

const getOrderById = (req, res) => {

  const { id } = req.params;


  const orderSql = `
    SELECT *
    FROM orders
    WHERE id = ?
  `;


  db.query(
    orderSql,
    [id],
    (err, orderResults) => {

      if (err) {

        console.error(err);

        return res.status(500).json({
          message: "Failed to get order"
        });

      }


      if (orderResults.length === 0) {

        return res.status(404).json({
          message: "Order not found"
        });

      }


      const itemSql = `
        SELECT *
        FROM order_items
        WHERE order_id = ?
      `;


      db.query(
        itemSql,
        [id],
        (err, itemResults) => {

          if (err) {

            console.error(err);

            return res.status(500).json({
              message:
                "Failed to get order items"
            });

          }


          res.status(200).json({

            order: orderResults[0],

            items: itemResults

          });

        }
      );

    }
  );

};



module.exports = {
  createOrder,
  getAllOrders,
  getOrderById
};
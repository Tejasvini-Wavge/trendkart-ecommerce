const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Mysql@123",
    database: "trendkart"
});


connection.connect((err) => {

    if (err) {
        console.log("Database connection failed:", err);
        return;
    }

    console.log("MySQL Database Connected ✅");

});


module.exports = connection;
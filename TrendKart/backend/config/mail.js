const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "teju.wavge11@gmail.com",
        pass: "your_16_digit_app_password"
    }
});

module.exports = transporter;
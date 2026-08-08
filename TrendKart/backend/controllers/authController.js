const db = require("../config/db");
const bcrypt = require("bcrypt");
const generateOTP = require("../utils/generateOTP");
const transporter = require("../config/mail");


const register = async (req, res) => {

    const { name, email, password } = req.body;
    const otp = generateOTP();

    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql =
"INSERT INTO users (name,email,password,otp) VALUES (?,?,?,?)";

        db.query(
            sql,
          [name,email,hashedPassword,otp],
            (err, result) => {

                if (err) {
                    return res.status(500).json({
                        message: "Registration failed"
                    });
                }

                const mailOptions = {
    from: "YOUR_EMAIL@gmail.com",
    to: email,
    subject: "TrendKart Email Verification OTP",
    text: `Your OTP is ${otp}`
};


transporter.sendMail(mailOptions, (error, info)=>{

    if(error){
        console.log(error);
    }
    else{
        console.log("OTP Email Sent");
    }

});


res.status(201).json({
    message:"Registration successful. OTP sent to email"
});

            }
        );

    } catch(error) {

        res.status(500).json({
            message:"Server error"
        });

    }
};



const verifyOTP = (req, res) => {

    const { email, otp } = req.body;


    const sql = 
    "SELECT * FROM users WHERE email=? AND otp=?";


    db.query(sql, [email, otp], (err, result)=>{

        if(err){
            return res.status(500).json({
                message:"Database error"
            });
        }


        if(result.length === 0){
            return res.status(400).json({
                message:"Invalid OTP"
            });
        }


        const updateSql =
        "UPDATE users SET is_verified=true WHERE email=?";


        db.query(updateSql,[email],(err)=>{

            if(err){
                return res.status(500).json({
                    message:"Verification failed"
                });
            }


            res.json({
                message:"OTP verified successfully"
            });

        });

    });

};



const jwt = require("jsonwebtoken");

const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        // Find user by email
        const sql = "SELECT * FROM users WHERE email=?";

        db.query(sql, [email], async (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }

            // User not found
            if (result.length === 0) {
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            }

            const user = result[0];

            // Check OTP verification
            if (!user.is_verified) {
                return res.status(401).json({
                    message: "Please verify your email first"
                });
            }

            // Compare password
            const passwordMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!passwordMatch) {
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            }

            // Generate JWT
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            );

            res.json({
                message: "Login successful",
                token: token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }
};

module.exports = {
    register,
    verifyOTP,
    login
};
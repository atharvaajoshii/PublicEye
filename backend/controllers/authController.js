const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const secretkey = process.env.SECRETKEY;
console.log("secret key: ", secretkey);

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) { throw new Error("all feilds are requiredd") }
        const exist = await User.findOne({ email: email })
        if (exist) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create(
            {
                name: name,
                email: email,
                password: hashedPassword,
            }
        )
        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            }
        });
        console.log("user created yayyy!! ", name, email)
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) { throw new Error("all feilds are requiredd") }

        const user = await User.findOne({
            email: email,
        })
        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }
        if (user.status === "Suspended") {
            return res.status(403).json({ message: "You are temporarily blocked" })
        }
        const ispasswordcorrect = await bcrypt.compare(password, user.password || "");
        if (!ispasswordcorrect) {
            return res.status(400).json({ message: "invalid password" })
        }
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            }, secretkey,
            {
                expiresIn: "1h",
            }
        )
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
        console.log("login successfull!", user)

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
const logout = async (req, res) => {
    try {
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 60 * 60 * 1000,
        });
        res.status(200).json({
            message: "Logout successful"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
module.exports = {
    registerUser,
    loginUser,
    logout
};
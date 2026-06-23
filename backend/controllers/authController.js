const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exist = await User.findOne({ email: email })
        if (exist) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user =await User.create(
            {
                name: name,
                email: email,
                password: hashedPassword,
            }
        )
        res.status(201).json({
            message: "User created successfully",
            user:{
                id:user._id,
                email:user.email,
                name:user.name,
            }
        });
        console.log("user created yayyy!! ", name, email, password)
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const loginUser = async (req, res) => {
        try {
        const {email, password} = req.body;
        
        const user = await User.findOne({
            email:email,
        })
        const ispasswordcorrect = await bcrypt.compare(password, user.password || "");
        if(!loggedinuser || !ispasswordcorrect){
            return res.status(400).json({message:"email/password incorrect!"})
        }
        } catch (error) {
            
        }
};

module.exports = {
    registerUser,
    loginUser
};
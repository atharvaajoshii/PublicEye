const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const registerUser = async (request, response) => {
    try {
        const name = request.body.name;
        const location = request.body.location;
        const phoneNumber = request.body.phoneNumber;
        const profilePhoto = request.body.profilePhoto;
        const email = request.body.email;
        const password = request.body.password;

        const existingUser = await User.findOne({
            email
        });
        if (existingUser) {
            //alert('User already exists'); cant do this since its backend
            return response.status(409).json({
                message: "User already exists"
            });
        }
        
            const hashpassword = await bcrypt.hash(password, 10); // since bcrypt is asynchronus and do this after checking since it takes cpu power
            const user = await User.create({
                name,
                location,
                phoneNumber,
                profilePhoto,
                email,
                password: hashpassword
            })
                return response.status(201).json({
                    message: "User created"
                })//wrote on my own before gpt suggested 
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({
            message: "Internal server error"
        })
    }
    // i use  .body multiple times as it was i how i learnt first 

};

const loginUser = async (request, response) => {
    try{
    const email = request.body.email;
    const password = request.body.password;

    const result = await User.findOne({
        email
    })// do we use password or hashed password here ?
    if (result) {
        const final_result = await bcrypt.compare(password, result.password)
        if (final_result) {
            return response.json({
                success: true,
                //message not needed as it redirects
            })
        }
        else {
            return response.json({
                success: false,
                message: "Incorrect password"
            })
        }
    }
    
}
catch(err){
    return response.status(401).json({
            message: "Error"
        })
}
};

const getProfile = async (request, response) => {
    const email = request.body.email;
    const password = request.body.password;
    const user_check = await User.findOne({
        email
    })
    if(user_check){
        const verify = await bcrypt.compare(password,user_check.password)
        if(verify){
            return response.json({
                success:true,
                userid:user_check._id
            })
        }
    }
};

const updateProfile = async (request, response) => {
    const {
        name,
        location,
        phoneNumber,
        profilePhoto,
        email,
        password
    } = request.body;  //does the same thing with less names
};

const deleteProfile = async (request, response) => {
    const email = request.body.email;
    const password = request.body.password;
};

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    deleteProfile
}

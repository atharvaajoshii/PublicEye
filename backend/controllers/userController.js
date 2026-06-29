const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // ticket to travel around the website conforming your identity



// const registerUser = async (request, response) => {
//     try {
//         const name = request.body.name;
//         const location = request.body.location;
//         const phoneNumber = request.body.phoneNumber;
//         const profilePhoto = request.body.profilePhoto;
//         const email = request.body.email;
//         const password = request.body.password;

//         const existingUser = await User.findOne({
//             email
//         });
//         if (existingUser) {
//             //alert('User already exists'); cant do this since its backend
//             return response.status(409).json({
//                 message: "User already exists"
//             });
//         }

//         const hashpassword = await bcrypt.hash(password, 10); // since bcrypt is asynchronus and do this after checking since it takes cpu power
//         const user = await User.create({
//             name,
//             location,
//             phoneNumber,
//             profilePhoto,
//             email,
//             password: hashpassword
//         })
//         return response.status(201).json({
//             message: "User created"
//         })//wrote on my own before gpt suggested 
//     }
//     catch (err) {
//         console.log(err);
//         return response.status(500).json({
//             message: "Internal server error"
//         })
//     }
//     // i use  .body multiple times as it was i how i learnt first 

// };

// const loginUser = async (request, response) => {
//     try {
//         const email = request.body.email;
//         const password = request.body.password;
//         const result = await User.findOne({
//             email
//         })
//         if (result) {
//             const final_result = await bcrypt.compare(password, result.password)
//             if (final_result) {
//                 const token = jwt.sign({
//                     id: result._id,
//                     email: result.email,
//                     role: result.role // important info that is required 
//                 }, process.env.SECRETKEY,
//                     {
//                         expiresIn: "2d"
//                     }
//                 )
//                 response.cookie("token", token)
//                 return response.status(200).json({
//                     success: true,
//                     message: "Login Succesfull"
//                 })
//             }
//             else {
//                 return response.json({
//                     success: false,
//                     message: "Invalid Password"
//                 })
//             }
//         } else {
//             return response.json({
//                 success: false,
//                 message: "Invalid Credentials"
//             })
//         }

//     }
//     catch (err) {
//         return response.status(500).json({
//             message: "Error"
//         })
//     }
// };

const getProfile = async (request, response) => {

    try {
        const id = request.user.id
        const user = await User.findById(
            id
        )
        if (!user) {
            return response.json({
                success: false,
                message: "COULDNT RETRIEVE DETAILS"
            })
        }

        return response.json({
            success: true,
            name: user.name,
            location: user.location,
            role: user.role,
            phoneNumber: user.phoneNumber,
            profilePhoto: user.profilePhoto
        })
    }
    catch (err) {
        return response.status(500).json({
            message: "Error"
        })
    }
};

const updateProfile = async (request, response) => {
    try {
        const id = request.user.id
        const updateData = {
            name: request.body.name,
            location: request.body.location,
            phoneNumber: request.body.phoneNumber,
            profilePhoto: request.body.profilePhoto,
            email: request.body.email
        };

        const updatedUser = await User.findByIdAndUpdate(id,
            { $set: updateData },
            { new: true }
        )
        if (!updatedUser) {
            return response.status(404).json({
                success: false,
                message: "User not Found"
            })
        }
        return response.status(200).json({
            success: true,
            message: "Profile Updated"
        })
    }
    catch (err) {
        return response.status(500).json({
            message: "Error"
        })
    }
};

const deleteProfile = async (request, response) => {
    try {
        const id = request.user.id;

        const deleted_user = await User.findByIdAndDelete(id)
        if (!deleted_user) {
            return response.status(404).json({
                success: false,
                message: "User not Found"
            })
        }
        return response.status(200).json({
            success: true,
            message: "Profile Deleted"
        })
    }
    catch (err) {
        return response.status(500).json({
            message: "Error"
        })
    }
};

module.exports = {
    getProfile,
    updateProfile,
    deleteProfile
}

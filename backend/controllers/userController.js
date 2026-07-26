const User = require("../models/User");
// userController.js
const getProfile = async (request, response) => {
    try {
        const id = request.user.id
        const user = await User.findById(id)
        if (!user) {
            return response.json({ success: false, message: "COULDNT RETRIEVE DETAILS" })
        }
        return response.json({
            success: true,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
        })
    } catch (err) {
        return response.status(500).json({ message: "Error" })
    }
};

const updateProfile = async (request, response) => {
    try {
        const id = request.user.id
        const updateData = {};
        if (request.body.name !== undefined) updateData.name = request.body.name;
        if (request.body.phone !== undefined) updateData.phone = request.body.phone;
        if (request.body.email !== undefined) updateData.email = request.body.email;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return response.status(404).json({ success: false, message: "User not Found" })
        }
        return response.status(200).json({
            success: true,
            message: "Profile Updated",
            user: updatedUser,
        })
    } catch (err) {
        return response.status(500).json({ message: "Error" })
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

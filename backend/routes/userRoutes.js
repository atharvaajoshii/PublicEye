
const express = require('express');
const router = express.Router();

const { registerUser,
        loginUser,
        getProfile,
        updateProfile,
        deleteProfile
} = require("../controllers/userController"); //these are the functions that will be defined in userController

const authMiddleware = require("../middleware/authMiddleware");

router.get('/profile',authMiddleware,getProfile);

router.put('/profile',authMiddleware,updateProfile);

router.delete('/profile',authMiddleware,deleteProfile);

module.exports = router;
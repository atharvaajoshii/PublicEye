
const express = require('express');
const router = express.Router();

const { registerUser,
        loginUser,
        getProfile,
        updateProfile,
        deleteProfile
} = require("../controllers/userController"); //these are the functions that will be defined in userController

const authMiddleware = require("../middleware/authMiddleware");

router.post('/register',registerUser);

router.post('/login',loginUser);

router.get('/profile',authMiddleware,getProfile);

router.post('/profile',authMiddleware,updateProfile);

router.delete('/profile',authMiddleware,deleteProfile);

module.exports = router;
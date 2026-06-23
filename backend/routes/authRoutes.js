const express = require("express");
const router = express.Router();

const { registerUser, loginUser,logout } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.get("/me", authMiddleware, (req, res) => {
    res.json(req.user)
});

module.exports = router;
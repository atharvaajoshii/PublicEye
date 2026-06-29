const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    createIssue
} = require("../controllers/issueController");

router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    createIssue
);

module.exports = router; 
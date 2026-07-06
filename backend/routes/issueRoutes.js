const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    createIssue,
    getUserIssue,
    getAllIssues
} = require("../controllers/issueController");

router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    createIssue
);
router.get('/',authMiddleware,getUserIssue) //adithya karkera 
router.get("/all", authMiddleware, getAllIssues);
module.exports = router; 
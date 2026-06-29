// Atmika

const express = require("express");
const { dashboard, analytics, issues, users, getAllOfficers, getOfficerById, createOfficers, updateOfficers, deleteOfficers, reports, getAllIssues, getIssueById, assignOfficer, reassignOfficer,deleteIssue,} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(["admin"]));

router.get("/dashboard", dashboard);
router.get("/analytics", analytics);
// router.get("/issues", issues);
router.get("/users", users);
router.get("/reports", reports);

router.get("/officers", getAllOfficers);
router.get("/officers/:id", getOfficerById);
router.post("/officers", createOfficers);
router.put("/officers/:id", updateOfficers);
router.delete("/officers/:id", deleteOfficers);

router.get("/issue/all", getAllIssues);
router.get("/issue/:id", getIssueById);
router.patch("/issue/:id/assignofficer", assignOfficer);
router.patch("/issue/:id/reassignofficer", reassignOfficer);
router.delete("/issue/:id/deleteissue", deleteIssue);

module.exports = router; 
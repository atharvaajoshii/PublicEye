// Atmika

const express = require("express");
const { dashboard, analytics, getAllOfficers, getOfficerById, createOfficers, updateOfficers, deleteOfficers, reports, getAllIssues, getIssueById, assignOfficer, reassignOfficer, deleteIssue, filterIssues, getAllUsers, getUserById, toggleUserStatus, getAllReports,
    getReportById,
    approveReport,
    rejectReport, } = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware(["admin"]));

router.get("/dashboard", dashboard);
router.get("/analytics", analytics);


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
router.get("/issues/filter", authMiddleware, roleMiddleware("admin"), filterIssues);

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.patch("/users/:id/status", toggleUserStatus);

router.get("/reports", getAllReports);
router.get("/reports/:id", getReportById);
router.patch("/reports/:id/approve", approveReport);
router.patch("/reports/:id/reject", rejectReport);
module.exports = router; 
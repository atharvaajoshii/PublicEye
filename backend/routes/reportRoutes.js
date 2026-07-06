const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createReport,
  getPendingReports,
  approveReport,
  rejectReport,
} = require("../controllers/reportController");

// All report routes require login
router.use(authMiddleware);

// Officer routes
router.post(
  "/:issueId",
  roleMiddleware(["officer"]),
  createReport
);

// Admin routes
router.get(
  "/pending",
  roleMiddleware(["admin"]),
  getPendingReports
);

router.patch(
  "/approve/:reportId",
  roleMiddleware(["admin"]),
  approveReport
);

router.patch(
  "/reject/:reportId",
  roleMiddleware(["admin"]),
  rejectReport
);

module.exports = router;
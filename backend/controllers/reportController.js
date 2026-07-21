const Report = require("../models/Report");
const Issue = require("../models/Issue");

const createReport = async (req, res) => {
  try {
    const { issueId } = req.params;
    const { reason, description } = req.body;

    if (!reason) {
      return res.status(400).json({
        message: "Reason is required",
      });
    }

    const issue = await Issue.findById(issueId);

    const report = await Report.create({
      issue: issue._id,
      officer: req.user._id,
      reason,
      description,
      issueSnapshot: {
        title: issue.title,
        description: issue.description,
        location: issue.location,
        category: issue.category,
        image: issue.image
      }
    });

    res.status(201).json({
      message: "Report submitted successfully",
      report,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getPendingReports = async (req, res) => {
  try {
    const reports = await Report.find({ status: "Pending" })
      .populate("issue")
      .populate("officer", "name email");

    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const approveReport = async (req, res) => {
  try {
    const { reportId } = req.params;

    const report = await Report.findById(reportId);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    report.status = "Approved";
    await report.save();

    await Issue.findByIdAndUpdate(report.issue, {
      status: "Rejected",
    });

    res.status(200).json({
      message: "Report approved successfully",
      report,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const rejectReport = async (req, res) => {
  try {
    const { reportId } = req.params;

    const report = await Report.findById(reportId);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    report.status = "Rejected";
    await report.save();

    res.status(200).json({
      message: "Report rejected successfully",
      report,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createReport,
  getPendingReports,
  approveReport,
  rejectReport
};
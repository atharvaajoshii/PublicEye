// Atmika
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Issue = require("../models/Issue");
const IssueTrack = require("../models/IssueTrack");
const User = require("../models/User");
const Report = require("../models/Report");

const {
    getCategoryStats,
    getMonthlyStats,
    getResolutionTrend,
    getAreaDistribution,
    getStatusDistribution,
    getAverageResolutionTime,
    getTopVotedIssues
} = require("../utils/analytics");

const dashboard = async (req, res) => {
    try {
        const issues = await Issue.find();
        const citizens = await User.countDocuments({ role: "citizen" });
        const officers = await User.countDocuments({ role: "officer" });

        const stats = {
            totalIssues: issues.length,
            totalUsers: citizens,
            totalOfficers: officers,
        }

        const pendingIssues = [...issues].filter(issue => issue.status === "Pending");

        const resolvedIssues = [...issues].filter(issue => issue.status === "Resolved");

        const reportedToday = [...issues].filter(item => new Date(item.createdAt).toDateString() === new Date().toDateString());

        res.json({ stats, pendingIssues, resolvedIssues, reportedToday })

    } catch (error) {
        console.log("Error in admin Controller :", error.message);
        return res.status(500).json({ error: "Internal server error" })
    }

}

const analytics = async (req, res) => {
    try {
        const [
            category,
            monthly,
            resolution,
            area,
            status,
            avgTime,
            topVotes
        ] = await Promise.all([
            getCategoryStats(),
            getMonthlyStats(),
            getResolutionTrend(),
            getAreaDistribution(),
            getStatusDistribution(),
            getAverageResolutionTime(),
            getTopVotedIssues()
        ]);

        return res.json({
            category,
            monthly,
            resolution,
            area,
            status,
            avgTime,
            topVotes
        });
    } catch (error) {
        console.log("Error in admin Controller :", error.message);
        return res.status(500).json({ error: "Internal server error" })
    }
}

const getAllOfficers = async (req, res) => {
    try {
        const officers = await User.find({ role: "officer" });

        return res.json({ officers });
    } catch (error) {
        console.log("Error in admin Controller :", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getOfficerById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Officer ID" });
        }

        const officer = await User.findOne({
            _id: id,
            role: "officer",
        });

        if (!officer) {
            return res.status(404).json({ error: "Officer not found" });
        }

        return res.json({ officer });
    } catch (error) {
        console.log("Error in admin Controller :", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const createOfficers = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new Error("All fields are required");
        }

        const existingOfficer = await User.findOne({ email });
        if (existingOfficer) {
            return res.status(400).json({
                message: "Officer already exists",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const officer = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "officer",
        });
        return res.status(201).json({
            message: "Officer created successfully",
            officer: {
                id: officer._id,
                name: officer.name,
                email: officer.email,
                role: officer.role,
            },
        });
    } catch (error) {
        console.log("Error in Admin Controller:", error.message);
        return res.status(400).json({
            message: error.message,
        });
    }
};

const updateOfficers = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid Officer ID",
            });
        }
        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }
        const officer = await User.findOneAndUpdate(
            {
                _id: id,
                role: "officer",
            },
            updateData,
            { new: true }
        );
        if (!officer) {
            return res.status(404).json({
                message: "Officer not found",
            });
        }
        return res.status(200).json({
            message: "Officer updated successfully",
            officer: {
                id: officer._id,
                name: officer.name,
                email: officer.email,
                role: officer.role,
            },
        });
    } catch (error) {
        console.log("Error in Admin Controller:", error.message);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

const deleteOfficers = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Officer ID" });
        }

        const officer = await User.findOne({
            _id: id,
            role: "officer",
        });

        if (!officer) {
            return res.status(404).json({ error: "Officer not found" });
        }
        const assignedIssues = await IssueTrack.find({ officer: id });
        await IssueTrack.updateMany(
            { officer: id },
            { $unset: { officer: "" } }   // or { officer: null }
        );

        // Mark issues as Pending
        const issueIds = assignedIssues.map(track => track.issue);

        await Issue.updateMany(
            { _id: { $in: issueIds } },
            { status: "Pending" }
        );

        // Delete officer
        await User.findByIdAndDelete(id);

        return res.json({
            message: "Officer deleted successfully",
        });

    } catch (error) {
        console.log("Error in admin Controller :", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};


const getAllIssues = async (req, res) => {
    try {
        const issues = await Issue.find();

        return res.json({ issues })
    } catch (error) {
        console.log("Error in admin Controller :", error.message);
        return res.status(500).json({ error: "Internal server error" })
    }
}

const getIssueById = async (req, res) => {
    try {
        const { id } = req.params;
        // console.log("id",id)
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Issue ID" });
        }
        const issue = await Issue.findById(id);

        const issueTrack = await IssueTrack.findOne({ issue: id })
            .populate("officer", "name email");

        return res.json({
            issue,
            issueTrack
        });
    } catch (error) {
        console.log("Error in admin Controller:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const assignOfficer = async (req, res) => {
    try {
        const { id } = req.params;
        // console.log("id",id)
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Issue ID" });
        }

        const issue = await Issue.findById(id);
        if (!issue) {
            return res.status(404).json({ error: "Issue not found" });
        }

        const existingTrack = await IssueTrack.findOne({
            issue: id,
        });
        if (existingTrack) {
            return res.status(400).json({
                error: "Officer already assigned",
            });
        }

        const { officerId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(officerId)) {
            return res.status(400).json({
                error: "Invalid Officer ID",
            });
        }
        const officer = await User.findOne({
            _id: officerId,
            role: "officer",
        });
        if (!officer) {
            return res.status(404).json({
                error: "Officer not found",
            });
        }
        await IssueTrack.create({
            issue: issue._id,
            officer: officerId,
            progress: 0,
        });

        issue.status = "Assigned";
        await issue.save();

        return res.json({
            message: "Officer assigned successfully",
        });
    } catch (error) {
        console.log("Error in admin Controller :", error.message);
        return res.status(500).json({ error: "Internal server error" })
    }
}

const reassignOfficer = async (req, res) => {
    try {
        const { id } = req.params;
        // console.log("id",id)
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Issue ID" });
        }

        const issueTrack = await IssueTrack.findOne({
            issue: id,
        });
        if (!issueTrack) {
            return res.status(404).json({
                error: "Issue is not assigned yet",
            });
        }
        const { officerId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(officerId)) {
            return res.status(400).json({ error: "Invalid Officer ID" });
        }

        const officer = await User.findOne({
            _id: officerId,
            role: "officer"
        });

        if (!officer) {
            return res.status(404).json({ error: "officer not found" });
        }
        issueTrack.officer = officerId;
        await issueTrack.save();
        return res.json({
            message: "Officer reassigned successfully",
            issueTrack,
        });
    } catch (error) {
        console.log("Error in admin Controller :", error.message);
        return res.status(500).json({ error: "Internal server error" })
    }
}

const deleteIssue = async (req, res) => {
    try {
        const { id } = req.params;
        const issue = await Issue.findById(id);
        if (!issue) {
            return res.status(404).json({ error: "Issue not found" });
        }
        await IssueTrack.deleteMany({
            issue: id
        });

        await Issue.findByIdAndDelete(id);
        return res.json({ message: "Issue deleted" });
    } catch (error) {
        console.log("Error in admin Controller :", error.message);
        return res.status(500).json({ error: "Internal server error" })
    }
}

const filterIssues = async (req, res) => {
    try {
        const { status, category } = req.query;
        const filter = {};

        if (status) filter.status = status
        if (category) filter.category = category

        const issues = await Issue.find(filter)

        return res.json(issues)

    } catch (error) {
        console.log("Error in admin Controller :", error.message);
        return res.status(500).json({ error: "Internal server error" })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        return res.json({ users })
    } catch (error) {
        console.log("Error in admin Controller :", error.message);
        return res.status(500).json({ error: "Internal server error" })
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }
        return res.json({ user });
    } catch (error) {
        console.log("Error in admin Controller:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const toggleUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }
        if (user.status === "Active") {
            user.status = "Suspended";
        } else {
            user.status = "Active";
        }
        await user.save();

        return res.json({
            message: `User ${user.status === "Active" ? "unblocked" : "blocked"} successfully`,
            user
        });
    } catch (error) {
        console.log("Error in admin Controller:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const getAllReports = async (req, res) => {
    try {
        const reports = await Report.find()
            .populate("issue")
            .populate("officer", "name email")
            .sort({ createdAt: -1 });

        return res.json({ reports });
    } catch (error) {
        console.log("Error in admin Controller :", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getReportById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Report ID" });
        }

        const report = await Report.findById(id)
            .populate("issue")
            .populate("officer", "name email");

        if (!report) {
            return res.status(404).json({ error: "Report not found" });
        }

        return res.json({ report });
    } catch (error) {
        console.log("Error in admin Controller :", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const approveReport = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Report ID" });
        }

        const report = await Report.findById(id);

        if (!report) {
            return res.status(404).json({ error: "Report not found" });
        }

        if (report.status !== "Pending") {
            return res.status(400).json({
                error: `Report is already ${report.status}`
            });
        }

        report.status = "Approved";
        await report.save();

        await IssueTrack.deleteMany({
            issue: report.issue,
        });

        await Issue.findByIdAndDelete(report.issue);

        return res.json({
            message: "Report approved successfully",
            report,
        });
    } catch (error) {
        console.log("Error in admin Controller :", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const rejectReport = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Report ID" });
        }

        const report = await Report.findById(id);

        if (!report) {
            return res.status(404).json({ error: "Report not found" });
        }

        if (report.status !== "Pending") {
            return res.status(400).json({
                error: `Report is already ${report.status}`
            });
        }

        report.status = "Rejected";
        await report.save();

        return res.json({
            message: "Report rejected successfully",
            report,
        });
    } catch (error) {
        console.log("Error in admin Controller :", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};
module.exports = {
    dashboard,
    analytics,

    getAllOfficers,
    getOfficerById,
    createOfficers,
    updateOfficers,
    deleteOfficers,

    getAllIssues,
    getIssueById,
    assignOfficer,
    reassignOfficer,
    deleteIssue,
    filterIssues,

    getAllUsers,
    getUserById,
    toggleUserStatus,

    getAllReports,
    getReportById,
    approveReport,
    rejectReport,
};
// Atmika
const mongoose = require("mongoose");

const Issue = require("../models/Issue");
const IssueTrack = require("../models/IssueTrack");
const User = require("../models/User");

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

        return res.json({ officer });
    } catch (error) {
        console.log("Error in admin Controller :", error.message);
        return res.status(500).json({ error: "Internal server error" })
    }
}

const getOfficerById = async (req, res) => {
    try {

        return res.json({ officer });
    } catch (error) {
        console.log("Error in admin Controller :", error.message);
        return res.status(500).json({ error: "Internal server error" })
    }
}

const createOfficers = async (req, res) => {
    try {

        return res.json({ officer });
    } catch (error) {
        console.log("Error in admin Controller :", error.message);
        return res.status(500).json({ error: "Internal server error" })
    }
}

const updateOfficers = async (req, res) => {
    try {

        return res.json({ officer });
    } catch (error) {
        console.log("Error in admin Controller :", error.message);
        return res.status(500).json({ error: "Internal server error" })
    }
}

const deleteOfficers = async (req, res) => {
    try {

        return res.json({ officer });
    } catch (error) {
        console.log("Error in admin Controller :", error.message);
        return res.status(500).json({ error: "Internal server error" })
    }
}


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
        if (!issue) {
            return res.status(404).json({ error: "Issue not found" });
        }
        return res.json({ issue });
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

        const issue = await IssueTrack.findOne({
            issue: id,
        });
        if (!issue) {
            return res.status(404).json({ error: "Issue not found" });
        }
        if (issue.officer) {
            return res.status(400).json({
                error: "Officer already assigned"
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
        issue.officer = officerId
        await issue.save();
        return res.json({
            message: "Officer assigned successfully",
            issue
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

        const issue = await IssueTrack.findOne({
            issue: id,
        });
        if (!issue) {
            return res.status(404).json({ error: "Issue not found" });
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
        issue.officer = officerId
        await issue.save();
        return res.json({
            message: "Officer assigned successfully",
            issue
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

    } catch (error) {
        console.log("Error in admin Controller :", error.message);
        return res.status(500).json({ error: "Internal server error" })
    }
}
const issues = async (req, res) => { }
const users = async (req, res) => { }
const reports = async (req, res) => { }

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

    users,
    issues,
    reports
};
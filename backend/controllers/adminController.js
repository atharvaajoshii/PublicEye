// Atmika

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


const issues = async (req, res) => { }
const users = async (req, res) => { }
const reports = async (req, res) => { }

module.exports = { dashboard, analytics, issues, users, getAllOfficers, getOfficerById, createOfficers, updateOfficers, deleteOfficers, reports};

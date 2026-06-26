// Atmika
const Issue = require("../models/Issue");
const IssueTrack = require("../models/IssueTrack");
const User = require("../models/User");
const {
    getCategoryStats,
    getMonthlyStats,
    getResolutionTrend,
    getAreaDistribution,
    getAverageResolutionTime,
    getTopVotedIssues
} = require("../utils/analytics");

const dashboard = async (req, res) => {
    try {
        const officerId = req.params.id;

        const assigned = await IssueTrack.find({
            officer: officerId
        }).populate("issue");

        const stats = {
            totalIssues: assigned.length,
            assigned: assigned.filter(item => item.issue?.status === "Assigned").length,
            inProgress: assigned.filter(item => item.issue?.status === "In Progress").length,
            resolved: assigned.filter(item => item.issue?.status === "Resolved").length,
            rejected: assigned.filter(item => item.issue?.status === "Rejected").length
        }

        const priorityIssues = [...assigned].sort((a, b) => (b.issue?.votes || 0) - (a.issue?.votes || 0)).slice(0, 5);

        const recentAssigned = [...assigned].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

        const recentActivity = [...assigned].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 5);

        res.json({ stats, priorityIssues, recentAssigned, recentActivity })

    } catch (error) {
        console.log("Error in officer Controller :", error.message);
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
            avgTime,
            topVotes
        ] = await Promise.all([
            getCategoryStats(),
            getMonthlyStats(),
            getResolutionTrend(),
            getAreaDistribution(),
            getAverageResolutionTime(),
            getTopVotedIssues()
        ]);

        return res.json({
            category,
            monthly,
            resolution,
            area,
            avgTime,
            topVotes
        });
    } catch (error) {
        console.log("Error in officer Controller :", error.message);
        return res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = { dashboard, analytics };
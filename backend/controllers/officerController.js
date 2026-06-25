// Atmika
const Issue = require("../models/Issue");
const IssueTrack = require("../models/IssueTrack");
const User = require("../models/User");

const dashboard = async (req, res) => {
    try {
        const officerId = req.params.id;

        const totalIssues = await IssueTrack.countDocuments({
            officer: officerId
        });
        const openIssues = await IssueTrack.countDocuments({
            officer: officerId,
            progress: "Open"
        });
        const inProgressIssues = await IssueTrack.countDocuments({
            officer: officerId,
            progress: "In Progress"
        });
        const completedIssues = await IssueTrack.countDocuments({
            officer: officerId,
            progress: "Completed"
        });

        const stats = {
            totalIssues,
            openIssues,
            inProgressIssues,
            completedIssues
        }

        const assigned = await IssueTrack.find({
            officer: officerId
        }).populate("issue");

        const priorityIssues = assigned.sort((a, b) => b.issue.votes - a.issue.votes).slice(0, 5);

        const recentAssigned = await IssueTrack.find({
            officer: officerId
        }).populate("issue").sort({ createdAt: -1 }).limit(5);

        const recentActivity = await IssueTrack.find({
            officer: officerId
        }).populate("issue").sort({ updatedAt: -1 }).limit(20);

        res.json({stats,priorityIssues,recentAssigned,recentActivity})

    } catch (error) {
        console.log("Error in officer Controller :", error.message);
        return res.status(500).json({ error: "Internal server error" })
    }

}

module.exports = { dashboard };
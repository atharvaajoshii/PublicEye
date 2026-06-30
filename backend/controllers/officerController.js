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
        const officerId = req.user.id;

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
        console.log("Error in officer Controller :", error.message);
        return res.status(500).json({ error: "Internal server error" })
    }
}

const manageIssues = async (req, res) => {
    try {
        const officerId = req.user.id;

        const { sort, status, category, search } = req.query;

        let issues = await IssueTrack.find({
            officer: officerId
        }).populate({
            path: "issue",
            match: {}
        });

        issues = issues.filter(item => item.issue);

        if(search){
            issues = issues.filter(
                item => item.issue?.title?.toLowerCase().includes(search.toLowerCase())
            );
        }

        if(status){
            issues = issues.filter(
                item => item.issue?.status === status
            );
        }

        if(category){
            issues = issues.filter(
                item => item.issue?.category === category
            );
        }

        if(sort === "votes"){
            issues = [...issues].sort((a, b) => (b.issue?.votes || 0) - (a.issue?.votes || 0));
        }

        if(sort === "newest"){
            issues = [...issues].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        if(sort === "oldest"){
            issues = [...issues].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }

        return res.json({issues});
    } catch (error) {
        console.log("Error in officer Controller :", error.message);
        return res.status(500).json({ error: "Internal server error" })
    }
}

const updateIssueStatus = async (req, res) => {
    try {
        const officerId = req.user.id;
        const { id } = req.params;
        const { status } = req.body;

        const assignment = await IssueTrack.findOne({
            issue: id,
            officer: officerId
        });

        if (!assignment) {
            return res.status(403).json({
                message: "You are not assigned to this issue."
            });
        }

        const issue = await Issue.findByIdAndUpdate(
            id,
            { status },
            {
                new: true,
                runValidators: true
            }
        );

        res.json({message: "Status updated successfully",issue});
    } catch (error) {
        console.log("Error in officer Controller :", error.message);
        return res.status(500).json({ error: "Internal server error" })
    }
}


module.exports = { dashboard, analytics, manageIssues, updateIssueStatus };
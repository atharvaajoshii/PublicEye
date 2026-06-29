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

const officers = async (req, res) => {
    try {
        const officerId = req.params.id;

        const { sort, status, category, search } = req.query;

        let issues = await IssueTrack.find({
            officer: officerId
        }).populate({
            path: "issue",
            match: {}
        });

        issues = issues.filter(item => item.issue);

        if (search) {
            issues = issues.filter(
                item => item.issue?.title?.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (status) {
            issues = issues.filter(
                item => item.issue?.status === status
            );
        }

        if (category) {
            issues = issues.filter(
                item => item.issue?.category === category
            );
        }

        if (sort === "votes") {
            issues = [...issues].sort((a, b) => (b.issue?.votes || 0) - (a.issue?.votes || 0));
        }

        if (sort === "newest") {
            issues = [...issues].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        if (sort === "oldest") {
            issues = [...issues].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }

        return res.json({ issues });
    } catch (error) {
        console.log("Error in officer Controller :", error.message);
        return res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = { dashboard, analytics, officers };
// dashboard, analytics, issues, users, officers, reports, logout

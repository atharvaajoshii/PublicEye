const {
    getIssueFilter,
    getCategoryStats,
    getMonthlyStats,
    getResolutionTrend,
    getAreaDistribution,
    getStatusDistribution,
    getAverageResolutionTime,
    getTopVotedIssues
} = require("../utils/analytics");

const analytics = async (req, res) => {
    try {
        const { id, role } = req.user;

        const filter = await getIssueFilter(id, role);

        const [
            category,
            monthly,
            resolution,
            area,
            status,
            avgTime,
            topVotes
        ] = await Promise.all([
            getCategoryStats(filter),
            getMonthlyStats(filter),
            getResolutionTrend(filter),
            getAreaDistribution(filter),
            getStatusDistribution(filter),
            getAverageResolutionTime(filter),
            getTopVotedIssues(filter)
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

module.exports = {analytics};
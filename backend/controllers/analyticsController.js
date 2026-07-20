const {
  getIssueFilter,
  getCategoryStats,
  getMonthlyStats,
  getResolutionTrend,
  getAreaDistribution,
  getStatusDistribution,
  getAverageResolutionTime,
  getTopVotedIssues,
} = require("../utils/analytics");

const analytics = async (req, res) => {
  try {
    const { id, role } = req.user;

    const { from, to } = req.query;

    const filter = await getIssueFilter(id, role);

    
    if (from && to) {
        const start = new Date(from);
        const end = new Date(to);
    
        // Include the entire end day
        end.setHours(23, 59, 59, 999);
    
        filter.createdAt = {
            $gte: start,
            $lte: end,
        };
    }

    const [category, monthly, resolution, area, status, avgTime, topVotes] =
      await Promise.all([
        getCategoryStats(filter),
        getMonthlyStats(filter),
        getResolutionTrend(filter),
        getAreaDistribution(filter),
        getStatusDistribution(filter),
        getAverageResolutionTime(filter),
        getTopVotedIssues(filter),
      ]);

    return res.json({
      category,
      monthly,
      resolution,
      area,
      status,
      avgTime,
      topVotes,
    });
  } catch (error) {
    console.log("Error in officer Controller :", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { analytics };

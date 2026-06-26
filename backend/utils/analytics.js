// Atmika

const Issue = require("../models/Issue");

const getCategoryStats = async () => {
    const stats = await Issue.aggregate([
        {
            $group: {
                _id: "$category",
                count: { $sum: 1 },
            }
        },
        {
            $project: {
                _id: 0,
                category: "$_id",
                count: 1
            }
        },
        {
            $sort: {
                _id: 1
            }
        }
    ]);
    return stats;
}

const getMonthlyStats = async () => {
    const stats = await Issue.aggregate([
        {
            $group: {
                _id: { $month: "$createdAt" },
                issues: { $sum: 1 },
            }
        },
        {
            $sort: {
                _id: 1
            }
        }
    ])
    const months = [
        "",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];

    const data = stats.map(item => ({
        month: months[item._id],
        issues: item.issues
    }));

    return data;
}

const getResolutionTrend = async () => {
    const stats = await Issue.aggregate([
        {
            $match: { status: "Resolved" }
        },
        {
            $group: {
                _id: { $month: "$updatedAt" },
                resolved: { $sum: 1 },
            }
        },
        {
            $sort: {
                _id: 1
            }
        }
    ]);

    const months = [
        "",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];

    const data = stats.map(item => ({
        month: months[item._id],
        resolved: item.resolved
    }));

    return data;
}

const getAreaDistribution = async () => {
    const stats = await Issue.aggregate([
        {
            $match:{
            location:{
               $ne:null
            }
           }
        },
        {
            $group: {
                _id: "$location",
                issues: { $sum: 1 },
            }
        },
        {
            $project: {
                _id: 0,
                area: "$_id",
                issues: 1
            }
        }
    ]);
    return stats;
}

const getAverageResolutionTime = async () => {
    const stats = await Issue.aggregate([
        {
            $match: {
                status: "Resolved"
            }
        },
        {
            $project: {
                days: {
                    $divide: [
                        { $subtract: ["$updatedAt", "$createdAt"] },
                        1000 * 60 * 60 * 24
                    ]
                }
            }
        },
        {
            $group:{
                _id:null,
                averageDays:{
                    $avg:"$days"
                }
            }
        },
        {
            $project: {
                _id: 0,
                averageDays: { $round: ["$averageDays", 2] }
            }
        }
    ]);
    return stats[0] || { averageDays: 0 };
}

const getTopVotedIssues = async () => {
    return await Issue.find().sort({ votes: -1 }).limit(10).select("title votes")
}

module.exports = {
    getCategoryStats,
    getMonthlyStats,
    getResolutionTrend,
    getAreaDistribution,
    getAverageResolutionTime,
    getTopVotedIssues
};
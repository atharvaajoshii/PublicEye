// Atmika

const Issue = require("../models/Issue");
const IssueTrack = require("../models/IssueTrack");

const getIssueFilter = async (userId, role) => {

    if (role === "admin") {
        return {};
    }

    if (role === "user") {
        return {
            user: userId
        };
    }

    if (role === "officer") {

        const tracks = await IssueTrack.find({
            officer: userId
        });

        const issueIds = tracks.map(track => track.issue);

        return {
            _id: {
                $in: issueIds
            }
        };
    }

};

const getCategoryStats = async (filter) => {

    return await Issue.aggregate([

        {
            $match: filter
        },
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
}

const getMonthlyStats = async (filter) => {

    const stats = await Issue.aggregate([

        {
            $match: filter
        },
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

const getResolutionTrend = async (filter) => {

    const stats = await Issue.aggregate([
        {
            $match: { ...filter, status: "Resolved" }
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

const getAreaDistribution = async (filter) => {

    const stats = await Issue.aggregate([


        {
            $match: {
                ...filter,
                location: {
                    $ne: null
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

const getStatusDistribution = async(filter)=>{

    const stats = await Issue.aggregate([


        {
            $match: {
                ...filter,
                status: {
                    $ne: null
                }
            }
        },
        {
            $group: {
                _id: "$status",
                issues: { $sum: 1 },
            }
        },
        {
            $project: {
                _id: 0,
                status: "$_id",
                issues: 1
            }
        },
        {
            $sort: {
                issues: -1
            }
        }
    ]);
    return stats;
}

const getAverageResolutionTime = async(filter)=>{

    const stats = await Issue.aggregate([

        {
            $match: {
                ...filter,
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
            $group: {
                _id: null,
                averageDays: {
                    $avg: "$days"
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

const getTopVotedIssues = async(filter)=>{

    return await Issue.find(filter).sort({ votes: -1 }).limit(10).select("title votes")
}

module.exports = {
    getIssueFilter,
    getCategoryStats,
    getMonthlyStats,
    getResolutionTrend,
    getAreaDistribution,
    getStatusDistribution,
    getAverageResolutionTime,
    getTopVotedIssues
};
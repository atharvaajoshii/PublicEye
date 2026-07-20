// Atmika

const Issue = require("../models/Issue");
const IssueTrack = require("../models/IssueTrack");
const mongoose = require("mongoose");
const axios = require("axios");

require("dotenv").config();

const getIssueFilter = async (userId, role) => {

    if (role === "admin") {
        return {};
    }

    if (role === "citizen") {
        return {
            user: new mongoose.Types.ObjectId(userId)
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

    throw new Error(`Unknown role: ${role}`);

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

    const resolutionFilter = {
        status: "Resolved"
    };

    // If a createdAt filter exists, apply it to updatedAt instead
    if (filter.createdAt) {
        resolutionFilter.updatedAt = filter.createdAt;
    }

    // Keep all other filters (admin/citizen/officer)
    Object.keys(filter).forEach((key) => {
        if (key !== "createdAt") {
            resolutionFilter[key] = filter[key];
        }
    });

    const stats = await Issue.aggregate([
        {
            $match: resolutionFilter
        },
        {
            $group: {
                _id: { $month: "$updatedAt" },
                resolved: { $sum: 1 }
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

    console.log(filter);

    return stats.map(item => ({
        month: months[item._id],
        resolved: item.resolved
    }));
};

// const getAreaDistribution = async (filter) => {

//     const stats = await Issue.aggregate([

//         {
//             $match: {
//                 ...filter,
//                 location: {
//                     $ne: null
//                 }
//             }
//         },
//         {
//             $group: {
//                 _id: "$location",
//                 issues: { $sum: 1 },
//             }
//         },
//         {
//             $project: {
//                 _id: 0,
//                 area: "$_id",
//                 issues: 1
//             }
//         }
//     ]);
//     return stats;
// }

const getAreaDistribution = async (filter) => {

    const issues = await Issue.find(filter)
        .select("latitude longitude");

    const cityCount = {};

    for (const issue of issues) {

        if (!issue.latitude || !issue.longitude) continue;

        try {
            const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${issue.latitude}&lon=${issue.longitude}&apiKey=${process.env.GEOAPIFY_API_KEY}`;

            const { data } = await axios.get(url);

            const city =
                data.features?.[0]?.properties?.city ||
                data.features?.[0]?.properties?.town ||
                data.features?.[0]?.properties?.village ||
                data.features?.[0]?.properties?.county ||
                "Unknown";

            cityCount[city] = (cityCount[city] || 0) + 1;

        } catch (err) {
            console.log("Reverse geocoding failed:", err.message);
        }
    }

    return Object.entries(cityCount).map(([area, issues]) => ({
        area,
        issues
    }));
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

// const getTopVotedIssues = async(filter)=>{

//     return await Issue.find(filter).sort({ votes: -1 }).limit(5).select("title votes")
// }

const getTopVotedIssues = async (filter) => {
    return await Issue.find({
        ...filter,
        votes: { $gt: 0 }
    })
        .sort({ votes: -1 })
        .limit(5)
        .select("title votes");
};

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
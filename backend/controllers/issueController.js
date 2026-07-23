const { response } = require("express");
const Issue = require("../models/Issue");
const IssueTrack = require("../models/IssueTrack");
const Vote = require("../models/Vote");
const createIssue = async (req, res) => {
    try {
        const {
            title,
            description,
            location,
            latitude,
            longitude,
            category,
        } = req.body;

        const image = req.file ? req.file.path : "";

        // Safely parse numbers or set to undefined/null if they are empty strings
        const parsedLatitude = latitude && latitude.trim() !== "" ? Number(latitude) : undefined;
        const parsedLongitude = longitude && longitude.trim() !== "" ? Number(longitude) : undefined;

        const issue = new Issue({
            title,
            description,
            location,
            latitude: parsedLatitude,
            longitude: parsedLongitude,
            category,
            image,
            user: req.user.id
        });

        await issue.save();

        // Create tracking document for this issue
        // await IssueTrack.create({
        //     issue: issue._id
        // });
        //no need to create here aak, its there in admin controller dont put this again!!

        res.status(201).json({
            message: "Issue created successfully",
            issue
        });

    } catch (error) {
        console.error("CRITICAL BACKEND ERROR DURING ISSUE CREATION:", error);
        res.status(500).json({
            message: error.message
        });
    }
};
// part created by adithya for dashboard 
const getUserIssue = async (request, response) => {
    try {
        console.log("Inside getUserIssue");
        const issues = await Issue.find(
            {
                user: request.user.id
            }
        )
        return response.json({
            success: true,
            userIssues: issues
        })
    }
    catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
}
const getAllIssues = async (request, response) => {
    try {
        const issues = await Issue.find();

        response.json({
            success: true,
            issues
        });

    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
};
// Get a single issue by ID
const getIssueById = async (request, response) => {
    try {
        const issue = await Issue.findById(request.params.id);
        if (!issue) {
            return response.status(404).json({
                success: false,
                message: "Issue not found"
            });
        }
        response.json({
            success: true,
            issue
        });
    } catch (error) {
        response.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const voteIssue = async (request, response) => {
    try {
                                                                                                                                                                                                                            //no idea how we are about to implement a 80% frontend function in the backecnd but the flow should be like they press support button and then it gets updated so maybe a insertOne for the issue this is what i think 
        const issue = await Issue.findById(request.params.id);
        if (!issue) {
            return response.status(404).json({
                success: false,
                message: "Issue not found"
            });
        } else {
            if (!issue.publicVoting) {
                return response.status(403).json({
                    success: false,
                    message: "Voting is not enabled for this issue."
                });
            }
                                                                                                                                                                                                                                                        //here we could get the id of people who voted on the issue orrrr wait we should ahve the userid from the cookies or jwt token  and from there we could get the fact if he voted on thhat issue
            const existingVote = await Vote.findOne({
                user: request.user.id,
                issue: request.params.id
            })
            if (existingVote) {
                return response.status(409).json({
                    success: false,
                    message: "User has already voted"
                })
            } else {
                                                                                                                                                                                                            //here now we have to add vote would it be insertOne by giving the issue and user fully >?
                const vote = new Vote({
                    user: request.user.id,
                    issue: request.params.id
                });
                await vote.save();
                issue.votes++;
                await issue.save();
                return response.status(200).json({
                    success: true,
                    message: "Support recorded successfully.",
                    votes: issue.votes
                });
            }
        }
    }
    catch (err) {
        response.status(500).json({
            success: false,
            message: err.message
        });
    }
}
module.exports = {
    createIssue,
    getUserIssue,
    getAllIssues,
    getIssueById,
    voteIssue
};
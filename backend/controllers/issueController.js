const Issue = require("../models/Issue");
const IssueTrack = require("../models/IssueTrack");

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

        const image = req.file ? req.file.filename : "";

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
const getUserIssue = async(request,response) => {
    try{
        console.log("Inside getUserIssue");
        const issues = await Issue.find(
            {
                user : request.user.id
            }
        )
          return  response.json({
            success:true,
            userIssues:issues
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

module.exports = {
    createIssue,
    getUserIssue,
    getAllIssues,
    getIssueById 
};
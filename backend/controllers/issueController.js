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
            publicVoting
        } = req.body;

        const image = req.file ? req.file.filename : "";

        const issue = new Issue({
            title,
            description,
            location,
            latitude,
            longitude,
            category,
            publicVoting,
            image,
            user: req.user.id
        });

        await issue.save();

        // Create tracking document for this issue
        await IssueTrack.create({
            issue: issue._id
        });

        res.status(201).json({
            message: "Issue created successfully",
            issue
        });

    } catch (error) {
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
module.exports = {
    createIssue,
    getUserIssue,
    getAllIssues
};
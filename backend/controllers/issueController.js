const Issue = require("../models/Issue");

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

        const image = req.file
            ? req.file.filename
            : "";
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);
        console.log("USER:", req.user);

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

module.exports = {
    createIssue
};
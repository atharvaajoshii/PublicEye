const Report = require("../models/Report");

const createReport = async (req, res) => {
    try {
        const { issueId } = req.params;
        const { reason, description } = req.body;

        if (!reason) {
            return res.status(400).json({
                message: "Reason is required",
            });
        }

        const report = await Report.create({
            issue: issueId,
            officer: req.user._id,
            reason,
            description,
        });

        res.status(201).json({
            message: "Report submitted successfully",
            report,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createReport,
};
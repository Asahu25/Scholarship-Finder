const ScholarIndex = require("../models/ScholarFav");

exports.getFavItem = async (req, res, next) => {
    try {
        const items = await ScholarIndex.fetchByUsername(req.params.username);
        res.status(200).json(items); // Send the fetched data as JSON
    } catch (err) {
        console.error("Error in getItem:", err); // Log the error
        res.status(500).json({ error: "Failed to fetch scholarships" }); // Send error response
    }
};
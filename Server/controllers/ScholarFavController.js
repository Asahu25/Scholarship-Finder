const ScholarFav = require("../models/ScholarFav");

exports.getFavItem = async (req, res, next) => {
    try {
        const items = await ScholarFav.fetchByEmail(req.params.email);
        res.status(200).json(items);
    } catch (err) {
        console.error("Error in getItem:", err);
        res.status(500).json({ error: "Failed to fetch scholarships" });
    }
};

exports.addFavorite = async (req, res, next) => {
    try {
        const { ScholarTitle, Amount, Deadline, ScholarUrl, email } = req.body;
        const favorite = new ScholarFav(ScholarTitle, Amount, Deadline, ScholarUrl, email);
        await favorite.save();
        res.status(201).json({ message: "Added to favorites successfully" });
    } catch (err) {
        console.error("Error in addFavorite:", err);
        res.status(500).json({ error: "Failed to add to favorites" });
    }
};

exports.removeFavorite = async (req, res, next) => {
    try {
        const { scholarshipId, email } = req.body;
        await ScholarFav.removeByIdAndEmail(scholarshipId, email);
        res.status(200).json({ message: "Removed from favorites successfully" });
    } catch (err) {
        console.error("Error in removeFavorite:", err);
        res.status(500).json({ error: "Failed to remove from favorites" });
    }
};
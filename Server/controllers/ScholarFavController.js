const ScholarFav = require("../models/ScholarFav");

exports.getFavItem = async (req, res, next) => {
    try {
        const email = req.params.email;
        const items = await ScholarFav.fetchByEmail(email);
        res.status(200).json(items);
    } catch (err) {
        console.error("Error in getFavItem:", err);
        res.status(500).json({ error: "Failed to fetch favorites" });
    }
};

exports.checkFavorite = async (req, res, next) => {
    try {
        const { email, scholarshipId } = req.params;
        const isFavorited = await ScholarFav.checkIfFavorited(email, scholarshipId);
        res.status(200).json({ isFavorited });
    } catch (err) {
        console.error("Error in checkFavorite:", err);
        res.status(500).json({ error: "Failed to check favorite status" });
    }
};

exports.addFavorite = async (req, res, next) => {
    try {
        const { ScholarTitle, Amount, Deadline, ScholarUrl, email } = req.body;
        const scholarFav = new ScholarFav(ScholarTitle, Amount, Deadline, ScholarUrl, email);
        await scholarFav.save();
        res.status(201).json({ message: "Added to favorites successfully" });
    } catch (err) {
        console.error("Error in addFavorite:", err);
        res.status(500).json({ error: "Failed to add to favorites" });
    }
};

exports.removeFavorite = async (req, res, next) => {
    try {
        const { scholarshipId, email } = req.body;
        await ScholarFav.remove(scholarshipId, email);
        res.status(200).json({ message: "Removed from favorites successfully" });
    } catch (err) {
        console.error("Error in removeFavorite:", err);
        res.status(500).json({ error: "Failed to remove from favorites" });
    }
};
const ScholarIndex = require("../models/ScholarIndex");

exports.getItem = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        
        const { items, total } = await ScholarIndex.fetchPaginated(page, limit, search);
        
        if (!items || !Array.isArray(items)) {
            console.error("Invalid items returned from database:", items);
            return res.status(500).json({ 
                message: "Failed to fetch scholarships: Invalid data format" 
            });
        }

        console.log(`Successfully fetched ${items.length} scholarships for page ${page}`);
        res.status(200).json({
            items,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total
        });
    } catch (err) {
        console.error("Error in getItem:", err);
        res.status(500).json({ 
            message: err.message || "Failed to fetch scholarships"
        });
    }
};
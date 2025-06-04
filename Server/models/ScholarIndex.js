const {getDB} = require("../utils/databaseUtils");

module.exports = class ScholarIndex{
    constructor(ScholarTitle, Amount, Deadline, ScholarUrl){
        this.ScholarTitle = ScholarTitle;
        this.Amount = Amount;
        this.Deadline = Deadline;
        this.ScholarUrl = ScholarUrl;
    }

    static async fetchPaginated(page, limit) {
        const db = getDB();
        try {
            console.log("Fetching paginated scholarships...");
            const startTime = Date.now();

            // Create index if it doesn't exist
            await db.collection('Index').createIndex({ ScholarTitle: 1 });

            const skip = (page - 1) * limit;
            
            // Use Promise.all to run count and find in parallel
            const [total, items] = await Promise.all([
                db.collection('Index').countDocuments(),
                db.collection('Index')
                    .find()
                    .sort({ ScholarTitle: 1 })
                    .skip(skip)
                    .limit(limit)
                    .toArray()
            ]);

            const endTime = Date.now();
            console.log(`Fetched ${items.length} scholarships in ${endTime - startTime}ms`);

            return { items, total };
        } catch (err) {
            console.error("Error in ScholarIndex.fetchPaginated:", err);
            throw new Error("Failed to fetch scholarships: " + err.message);
        }
    }

    static async fetchAll(){
        const db = getDB();
        try {
            console.log("Fetching all scholarships (deprecated)...");
            const items = await db.collection('Index')
                .find()
                .sort({ ScholarTitle: 1 })
                .toArray();
            return items;
        } catch (err) {
            console.error("Error in ScholarIndex.fetchAll:", err);
            throw new Error("Failed to fetch scholarships: " + err.message);
        }
    }
};
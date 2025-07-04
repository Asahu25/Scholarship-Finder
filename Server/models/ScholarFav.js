const {getDB} = require("../utils/databaseUtils");
const { ObjectId } = require('mongodb');

module.exports = class ScholarFav{
    constructor(ScholarTitle, Amount, Deadline, ScholarUrl, email){
        this.ScholarTitle = ScholarTitle;
        this.Amount = Amount;
        this.Deadline = Deadline;
        this.ScholarUrl = ScholarUrl;
        this.email = email;
    }

    async save() {
        const db = getDB();
        try {
            // Check if already exists
            const existing = await db.collection('Favorites').findOne({
                ScholarTitle: this.ScholarTitle,
                email: this.email
            });

            if (existing) {
                throw new Error('Scholarship already in favorites');
            }

            const result = await db.collection('Favorites').insertOne(this);
            return result;
        } catch (err) {
            console.error("Error saving favorite:", err);
            throw err;
        }
    }

    static async fetchByEmail(email) {
        const db = getDB();
        try {
            return await db.collection('Favorites').find({ email: email }).toArray();
        } catch (err) {
            console.error("Error fetching favorites:", err);
            throw err;
        }
    }

    static async remove(scholarshipId, email) {
        const db = getDB();
        try {
            const result = await db.collection('Favorites').deleteOne({
                _id: new ObjectId(scholarshipId),
                email: email
            });
            if (result.deletedCount === 0) {
                throw new Error('Favorite not found');
            }
            return result;
        } catch (err) {
            console.error("Error removing favorite:", err);
            throw err;
        }
    }

    static async checkIfFavorited(email, scholarshipId) {
        const db = getDB();
        try {
            // First try to find by ID
            let favorite = await db.collection('Favorites').findOne({
                _id: new ObjectId(scholarshipId),
                email: email
            });

            if (!favorite) {
                // If not found by ID, try to find by ScholarTitle
                const scholarship = await db.collection('Index').findOne({
                    _id: new ObjectId(scholarshipId)
                });

                if (scholarship) {
                    favorite = await db.collection('Favorites').findOne({
                        ScholarTitle: scholarship.ScholarTitle,
                        email: email
                    });
                }
            }

            return !!favorite; // Convert to boolean
        } catch (err) {
            console.error("Error checking favorite status:", err);
            return false;
        }
    }
};
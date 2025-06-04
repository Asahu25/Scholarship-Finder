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
            const favorite = await db.collection('Favorites').findOne({
                _id: new ObjectId(scholarshipId),
                email: email
            });
            return !!favorite; 
        } catch (err) {
            console.error("Error checking favorite status:", err);
            return false;
        }
    }
};
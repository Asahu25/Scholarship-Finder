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

    static fetchByEmail(email){
        const db = getDB();
        return db.collection('Favourites').find({email: email}).toArray()
            .then((homes) => {
                console.log("Fetched Scholarships:", homes); // Add detailed logging
                return homes;
            })
            .catch((err) => {
                console.error("Error fetching scholarships:", err); // Use error logging
                throw err; 
            });
    }

    async save() {
        const db = getDB();
        return db.collection('Favourites').insertOne(this);
    }

    static async removeByIdAndEmail(scholarshipId, email) {
        const db = getDB();
        return db.collection('Favourites').deleteOne({
            _id: new ObjectId(scholarshipId),
            email: email
        });
    }
};
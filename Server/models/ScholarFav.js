const {getDB} = require("../utils/databaseUtils");

module.exports = class ScholarFav{
    constructor(ScholarTitle, Amount, Deadline, ScholarUrl, username){
        this.ScholarTitle = ScholarTitle;
        this.Amount = Amount;
        this.Deadline = Deadline;
        this.ScholarUrl = ScholarUrl;
        this.username = username;
    }
    static fetchByUsername(username){
        const db = getDB();
        return db.collection('Favourites').find({username: username}).toArray()
            .then((homes) => {
                console.log("Fetched Scholarships:", homes); // Add detailed logging
                return homes; // Return the fetched data
            })
            .catch((err) => {
                console.error("Error fetching scholarships:", err); // Use error logging
                throw err; // Ensure errors are propagated
            });
    }
};
const {getDB} = require("../utils/databaseUtils");

module.exports = class ScholarIndex{
    constructor(ScholarTitle, Amount, Deadline, ScholarUrl){
        this.ScholarTitle = ScholarTitle;
        this.Amount = Amount;
        this.Deadline = Deadline;
        this.ScholarUrl = ScholarUrl;
    }
    static fetchAll(){
        const db = getDB();
        return db.collection('Index').find().toArray()
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
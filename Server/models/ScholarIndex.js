const {getDB} = require("../utils/databaseUtils");

module.exports = class ScholarIndex{
    constructor(ScholarTitle, Amount, Deadline, ScholarUrl){
        this.ScholarTitle = ScholarTitle;
        this.Amount = Amount;
        this.Deadline = Deadline;
        this.ScholarUrl = ScholarUrl;
    }
    fetchAll(){
        const db = getDB();
        return db.collection('Index').find().then((homes)=>{
            console.log(homes);
        }).catch((err)=>{
            console.log("failed", err);
        })
    }
};
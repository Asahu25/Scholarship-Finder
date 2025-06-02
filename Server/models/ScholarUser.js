const {getDB} = require("../utils/databaseUtils");

module.exports = class ScholarUser{
    constructor(username, password){
        this.username = username;
        this.password = password;
    }
    static fetchByUsername(username){
        const db = getDB();
        return db.collection('Users').find({username: username}).toArray()
            .then((users) => {
                console.log("Fetched Users:", users); // Add detailed logging
                return users; // Return the fetched data
            })
    }
}
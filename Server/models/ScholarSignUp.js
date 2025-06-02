const {getDB} = require("../utils/databaseUtils");

module.exports = class ScholarSignUp{
    constructor(username, email, password){
        this._id = username;
        this.email = email;
        this.password = password;
    }

    static checkEmail(email){
        const db = getDB();
        const arr =  db.collection('Users').find({email: email}).toArray()
        console.log(arr);
        return arr.length > 0;
    }
    
    static save(user){
        const db = getDB();
        return db.collection('Users').insertOne(user);
    }
}
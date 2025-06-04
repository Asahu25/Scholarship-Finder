const {getDB} = require("../utils/databaseUtils");

module.exports = class ScholarSignUp {
    constructor(username, email, password) {
        this._id = email; 
        this.email = email;
        this.username = username;
        this.password = password;
        this.createdAt = new Date();
    }

    static async checkEmail(email) {
        const db = getDB();
        const user = await db.collection('Users').findOne({_id: email});
        return user !== null;
    }
    
    static async save(user) {
        try {
            const db = getDB();
            return await db.collection('Users').insertOne(user);
        } catch (error) {
            console.error("Error saving user:", error);
            throw new Error("Failed to create user account");
        }
    }
}
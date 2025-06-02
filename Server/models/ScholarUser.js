const {getDB} = require("../utils/databaseUtils");

module.exports = class ScholarUser{
    constructor(username, password){
        this.username = username;
        this.password = password;
    }

    static async login(email, password) {
        const db = getDB();
        const user = await db.collection('Users').findOne({ email: email });
        
        if (!user) {
            throw new Error("Email does not exist. Please sign up first.");
        }

        if (user.password !== password) {
            throw new Error("Incorrect password.");
        }

        // Don't send password back to client
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    static async fetchByEmail(email){
        const db = getDB();
        console.log(email);
        const arr = await db.collection('Users').find({email: email}).toArray()
        console.log(arr);
        return arr;
    }
}
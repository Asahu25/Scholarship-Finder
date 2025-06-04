const {getDB} = require("../utils/databaseUtils");

module.exports = class ScholarUser{
    constructor(email, username, password){
        this._id = email;
        this.email = email;
        this.username = username;
        this.password = password;
    }

    static async login(email, password) {
        const db = getDB();
        const user = await db.collection('Users').findOne({ _id: email });
        
        if (!user) {
            throw new Error("Email does not exist. Please sign up first.");
        }
        if (user.password !== password) {
            throw new Error("Incorrect password.");
        }

        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}
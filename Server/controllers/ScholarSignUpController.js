const ScholarSignUp = require("../models/ScholarSignUp");

exports.signUp = async (req, res, next) => {
    try {
        const {username, email, password} = req.body;
        
        // Check if email exists
        const emailExists = await ScholarSignUp.checkEmail(email);
        if(emailExists) {
            return res.status(400).json({message: "Email already exists"});
        }

        // Create and save new user
        const user = new ScholarSignUp(username, email, password);
        await ScholarSignUp.save(user);
        
        // Set session
        req.session.user = { email, username };
        
        res.status(201).json({
            message: "User created successfully",
            user: { email, username }
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            message: "Error creating user",
            error: error.message
        });
    }
}
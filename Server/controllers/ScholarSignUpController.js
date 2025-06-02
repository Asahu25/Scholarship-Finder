const ScholarSignUp = require("../models/ScholarSignUp");

exports.signUp = async (req, res, next) => {
    const {username,email, password} = req.body;
    const user = new ScholarSignUp(username, email, password);
    await ScholarSignUp.checkUsername(username);
    if(await ScholarSignUp.checkUsername(username)){
        res.status(400).json({message: "Username already exists"});
    }else{
        await ScholarSignUp.save(user);
        res.status(201).json({message: "Users created successfully"});
    }
}
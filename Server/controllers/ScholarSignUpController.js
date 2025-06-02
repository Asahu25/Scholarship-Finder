const ScholarSignUp = require("../models/ScholarSignUp");

exports.signUp = async (req, res, next) => {
    const {username,email, password} = req.body;
    const user = new ScholarSignUp(username, email, password);
    await ScholarSignUp.checkEmail(email);
    if(await ScholarSignUp.checkEmail(email)){
        res.status(400).json({message: "Email already exists"});
    }else{
        await ScholarSignUp.save(user);
        res.status(201).json({message: "Users created successfully"});
    }
}
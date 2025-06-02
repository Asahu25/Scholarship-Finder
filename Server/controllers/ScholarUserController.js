const ScholarUser = require("../models/ScholarUser");

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await ScholarUser.login(email, password);
        res.status(200).json(user);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.getUser = async (req, res, next) => {
    console.log(req);
    const user = await ScholarUser.fetchByEmail(req.params.email);
    console.log(user);
    if(user.length === 0){
        res.status(400).json({message: "Email does not exist. Please choose a different email / Please Sign Up."});
    }else{
        res.status(200).json(user);
    }
}
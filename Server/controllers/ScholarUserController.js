const ScholarUser = require("../models/ScholarUser");

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await ScholarUser.login(email, password);
        if(user){
            req.session.user = user;
            console.log("req.session.user", req.session.user);
            res.status(200).json({message: "Login successful"});
        }else{
            res.status(401).json({message: "Login failed"});
        }
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
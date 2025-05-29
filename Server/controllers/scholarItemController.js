const ScholarIndex = require("../models/ScholarIndex");

exports.getItem = async(req, res, next)=>{
    try{
        const items = await ScholarIndex.fetchAll();
    }catch(err){
        next(err);
    }
}
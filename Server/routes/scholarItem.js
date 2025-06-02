const express = require('express');
const scholarItem = express.Router();

const scholarItemController = require("../controllers/scholarItemController");
const scholarFavController = require("../controllers/ScholarFavController");
const scholarSignUpController = require("../controllers/ScholarSignUpController");


scholarItem.get("/api/getItem", scholarItemController.getItem);
scholarItem.get("/api/getFavItem/:username", scholarFavController.getFavItem);
scholarItem.post("/api/signUp", scholarSignUpController.signUp);

module.exports = scholarItem;
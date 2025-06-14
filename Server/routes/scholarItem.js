const express = require('express');
const scholarItem = express.Router();

const scholarItemController = require("../controllers/scholarItemController");
const scholarFavController = require("../controllers/ScholarFavController");
const scholarSignUpController = require("../controllers/ScholarSignUpController");
const scholarUserController = require("../controllers/ScholarUserController");

scholarItem.get("/api/getItem", scholarItemController.getItem);
scholarItem.get("/api/getFavItem/:email", scholarFavController.getFavItem);
scholarItem.get("/api/checkFavorite/:email/:scholarshipId", scholarFavController.checkFavorite);
scholarItem.post("/api/addFavorite", scholarFavController.addFavorite);
scholarItem.delete("/api/removeFavorite", scholarFavController.removeFavorite);
scholarItem.post("/api/signUp", scholarSignUpController.signUp);
scholarItem.post("/api/login", scholarUserController.login);
scholarItem.post("/api/logout", scholarUserController.logout);

module.exports = scholarItem;
const express = require('express');
const scholarItem = express.Router();

const scholarItemController = require("../controllers/scholarItemController");
const scholarFavController = require("../controllers/ScholarFavController");

scholarItem.get("/api/getItem", scholarItemController.getItem);
scholarItem.get("/api/getFavItem", scholarFavController.getFavItem);

module.exports = scholarItem;
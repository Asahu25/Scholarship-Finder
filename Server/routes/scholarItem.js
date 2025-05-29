const express = require('express');
const scholarItem = express.Router();

const scholarItemController = require("../controllers/scholarItemController");

scholarItem.get("/api/getItem", scholarItemController.getItem);
module.exports = scholarItem;
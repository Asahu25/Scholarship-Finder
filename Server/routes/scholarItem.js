const express = require('express');
const scholarItem = express.Router();

const scholarItemController = require("../controllers/scholarItemController");

scholarItem.get("/", scholarItemController.getItem);
scholarItem.post("/", scholarItemController.addItem);
module.exports = scholarItem;
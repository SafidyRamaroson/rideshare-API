const express = require("express");

const saveRouter = express.Router();
const saveController = require("./../controllers/savePost/index");

// save post trip
saveRouter.post("/save-Trip-Post/:tripid/:userId",saveController.savePostTrip);


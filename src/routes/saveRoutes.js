const express = require("express");

const saveRouter = express.Router();
const saveController = require("./../controllers/savePost/index");

// save post trip
saveRouter.post("/trip/:tripid/:userId",saveController.savePostTrip);

// get list post trip saved by an user
saveRouter.get("/",saveController.getAllSave);


module.exports = saveRouter;



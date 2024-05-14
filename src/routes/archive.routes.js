const express = require("express");
const archiveRouter = express.Router();
const { saveOneTrip, getAllArchives, deleteOneArchive } = require("../controllers/archive.controller");

// save post trip
archiveRouter.post("/trip/:tripid/:userId",saveOneTrip);

// get list post trip saved by an user
archiveRouter.get("/",getAllArchives);

archiveRouter.delete("/delete/:archiveId",deleteOneArchive);

module.exports = archiveRouter;



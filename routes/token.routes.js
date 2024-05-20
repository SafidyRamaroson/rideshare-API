const express = require("express");
const decodeToken = require("../controllers/token.controller");
const tokenRouter = express.Router();

tokenRouter.post("/decode",decodeToken);


module.exports = tokenRouter;
const express = require("express");
const appRouter = express.Router();
const userRoutes = require('./userRoutes');
const authRoutes = require("./authRoutes");
const tripRoutes = require("./tripRoutes");

appRouter.use('/users',userRoutes);
appRouter.use("/auth",authRoutes);
appRouter.use("/trips",tripRoutes);

module.exports = appRouter;

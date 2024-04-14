const express = require("express");
const appRouter = express.Router();
const userRoutes = require('./userRoutes');
const authRoutes = require("./authRoutes");

appRouter.use('/users',userRoutes);
appRouter.use("/auth",authRoutes);

module.exports = appRouter;

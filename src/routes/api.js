const express = require("express");
const appRouter = express.Router();
const userRoutes = require('./userRoutes');
const authRoutes = require("./authRoutes");
const tripRoutes = require("./tripRoutes");
const reservationRoutes = require("./reservationRoutes");


appRouter.use('/users',userRoutes);
appRouter.use("/auth",authRoutes);
appRouter.use("/trips",tripRoutes);
appRouter.use("./reservarion",reservationRoutes);

module.exports = appRouter;

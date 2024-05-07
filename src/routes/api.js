const express = require("express");
const appRouter = express.Router();
const userRoutes = require('./userRoutes');
const authRoutes = require("./authRoutes");
const tripRoutes = require("./tripRoutes");
const reservationRoutes = require("./reservationRoutes");
const saveRoutes = require("./saveRoutes");

appRouter.use('/users',userRoutes);
appRouter.use("/auth",authRoutes);
appRouter.use("/trips",tripRoutes);
appRouter.use("./reservarion",reservationRoutes);
appRouter.use("/save", saveRoutes);

module.exports = appRouter;

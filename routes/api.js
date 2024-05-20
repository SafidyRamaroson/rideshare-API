const express = require("express");
const appRouter = express.Router();
const userRoutes = require('./user.routes');
const authRoutes = require("./auth.routes");
const tripRoutes = require("./trip.routes");
const reservationRoutes = require("./reservation.routes");
const archiveRouter = require("./archive.routes");
const reviewsRoutes = require("./reviews.routes");
const passwordRouter = require("./password.routes");
const tokenRoutes = require("./token.routes");


appRouter.use('/users',userRoutes);
appRouter.use("/auth",authRoutes);
appRouter.use("/trips",tripRoutes);
appRouter.use("/reservarion",reservationRoutes);
appRouter.use("/archive", archiveRouter);
appRouter.use("/reviewsRoutes",reviewsRoutes);
appRouter.use("/password",passwordRouter);
appRouter.use("/token",tokenRoutes);



module.exports = appRouter;

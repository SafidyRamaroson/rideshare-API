const express  = require("express");
const userRouter = express.Router();
const userController = require("../../controllers/users/users.controller");
const { authMiddleware } = require("../../middlewares/auth");


// udpateProfil of current user
userRouter.post("/profile/update/:userId",userController.udpateProfile);

// get profile of current user 
userRouter.get("/profile",authMiddleware,userController.getProfil);

// get profile by userId 
userRouter.get("/profile/:userId",userController.getProfilByuserId);

// delete profil after a confirmation
userRouter.delete("/profile/delete/:userId",userController.confirmDeleteAccount);

module.exports = userRouter;


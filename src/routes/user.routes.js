const express  = require("express");
const userRouter = express.Router();
const profilController = require("../controllers/profile.controller");
const authMiddleware = require("../middlewares/auth");

// udpateProfil of current user
userRouter.post("/profile/update/:userId",profilController.updateUserProfile);

// get profile 
userRouter.get("/profile/:userId",authMiddleware,profilController.getUserProfile);

// delete profil after a confirmation
userRouter.delete("/profile/delete/:userId",profilController.confirmDeleteAccount);

module.exports = userRouter;


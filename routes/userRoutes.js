const express  = require("express");
const userRouter = express.Router();
const userController = require("../controllers/users/users.controller");
const { authMiddleware } = require("../middlewares/auth");


// udpateProfil of current user
userRouter.post("/profile/update/:UserID",userController.udpateProfile);

// get profile of current user 
userRouter.get("/profile",authMiddleware,userController.getProfil);

// get profile by userID 
userRouter.get("/profile/:UserID",userController.getProfilByUserID);

// delete profil after a confirmation
userRouter.delete("/profile/delete/:UserID",userController.confirmDeleteAccount);

module.exports = userRouter;


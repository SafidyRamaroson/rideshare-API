const express  = require("express");
const router = express.Router();
const userController = require("../controllers/users/index.Controller");
const { authMiddleware } = require("../middlewares/auth");


//Register and login 
router.post("/register",userController.register);
router.post("/login",userController.login);

// udpateProfil of current user
router.post("/updateProfil/:UserID",userController.udpateProfil);

// get profile of current user 
router.get("/profile",authMiddleware,userController.getProfil);

// get profile by userID 
router.get("/profile/:UserID",userController.getProfilByUserID);

// delete profil after a confirmation
router.delete("/profile/delete/:UserID",userController.confirmDeleteAccount);


// forgot password 
router.post("/forgotPassword",userController.forgotPassword);

// feat:reset password 
router.post("/resetPassword",userController.resetPassword);


module.exports = router;


const express  = require("express");
const router = express.Router();
const { 
    register,
    login, 
    udpateProfil,
    getProfil, 
    getProfilByUserID,
    confirmDeleteAccount 
} = require("./../controllers/userController");
const { authMiddleware } = require("../middlewares/auth");

//Register and login 
router.post("/register",register);
router.post("/login",login);

// udpateProfil of current user
router.post("/updateProfil",udpateProfil);

// get profile of current user 
router.get("/profile",authMiddleware,getProfil);

// get profile by userID 
router.get("/profile/:UserID",getProfilByUserID);

// delete profil after a confirmation
router.delete("/profile/delete/:UserID",confirmDeleteAccount);



module.exports = router;


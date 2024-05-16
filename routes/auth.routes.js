const express = require("express");
const { register, redirectRegisterDialogFacebook, callbackFacebookRegister } = require("../controllers/register.controller");
const { login, redirectToLoginDialogFacebook, callbackFacebookLogin, logout } = require("../controllers/auth.controller");
const authRouter = express.Router();

//Register with email,password,..rest
authRouter.post("/register",register);

// Initiates the Facebook Register flow 
authRouter.get("/register/facebook",redirectRegisterDialogFacebook);

// login with email and password
authRouter.post("/login",login);

// Initiates the Facebook Login flow 
authRouter.get("/facebook",redirectToLoginDialogFacebook);

// Callback URL for handling the Facebook Login response
authRouter.get("/facebook/callback",callbackFacebookLogin);

// Callback URL for handling the Facebook register response
authRouter.get("/register/facebook/callback",callbackFacebookRegister);

//Logout route
authRouter.get("/logout",logout);

module.exports = authRouter ; 
const express = require("express");
const authController = require("./../controllers/oauth/auth/index");
const passwordController = require('./../controllers/oauth/password/index');
const {register,callbackFacebookRegister,redirectRegisterDialogFacebook} = require("./../controllers/oauth/register/register.controller");


const authRouter = express.Router();

//Register with email,password,..rest
authRouter.post("/register",register);

// Initiates the Facebook Register flow 
authRouter.get("/register/facebook",redirectRegisterDialogFacebook);

// login with email and password
authRouter.post("/login", authController.login);

// Initiates the Facebook Login flow 
authRouter.get("/facebook",authController.redirectToLoginDialogFacebook);

// Callback URL for handling the Facebook Login response
authRouter.get("/facebook/callback",authController.callbackFacebookLogin);

// Callback URL for handling the Facebook register response
authRouter.get("/register/facebook/callback",callbackFacebookRegister);

//Logout route
authRouter.get("/logout",authController.logout);

// forgot password 
authRouter.post("/forgotPassword",passwordController.forgotPassword);

// feat:reset password 
authRouter.post("/resetPassword",passwordController.resetPassword);

module.exports = authRouter ; 
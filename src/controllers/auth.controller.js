const db  = require("../models/index");
const { getLoginDialogUrl, getProfileResponse, handleLogin } = require("../services/auth/auth.service");
const httpException = require("../utils/httpException").default;
const { USER_NOT_FOUND } = require("../utils/error.message");
require("dotenv").config();



//login with email and password 
const login = async(req,res,next) => {
    try {
        await handleLogin(req?.body);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// Facebook login flow 
const redirectToLoginDialogFacebook =  (req,res,next) => {
    try {
        const loginDialogUrl = getLoginDialogUrl();
        res.redirect(loginDialogUrl);
        console.log("redirect reussie");
    } catch (error) {
        console.log(error);
        next(error);
    }
    // const url = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&scope=email`;
} 

// Callback URL for handling the Facebook Login response
const callbackFacebookLogin = async(req,res, next)=> {
    const { code } = req?.query;

    try{
        // Exchange authorization code for access token
        const { email } = getProfileResponse(code);
        
        // check if user is not registered in database 
        const foundUser  = await db.user.findOne({where:{email}});

        if(!foundUser){
            throw new httpException(404,USER_NOT_FOUND);
        }
        
        // redirect user to the page after he is logged to the app
        res
        .send("<Redirect user to the page if he is logged to the app>")
        // .redirect("URL redirect to main of the app")
    }catch(error){
        console.error('Error:', error);
        next(error);
    }
}

// to log out 
const logout = (req,res)=>{
    res.redirect("/login")
}

module.exports = { login,redirectToLoginDialogFacebook,callbackFacebookLogin,logout };


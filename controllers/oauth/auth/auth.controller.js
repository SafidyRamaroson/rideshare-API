const { parseLoginData } = require("../../../utils/user/parseData");
const generateToken = require("../../../utils/user/generateToken");
const bcrypt = require("bcryptjs");
const db  = require("../../../models/index");
const axios = require("axios");
require("dotenv").config();

const APP_ID = process.env.FACEBOOK_CLIENT_ID;
const APP_SECRET = process.env.FACEBOOK_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:5000/api/auth/facebook/callback';

//login with email and password 
const login = async(req,res) => {
    const { email, password } = req.body;
    const parsedData = parseLoginData(req.body);
        if(!parsedData.success){
            const err = parsedData.error.issues.map((e) => ({ path: e.path[0], message: e.message })) 
            return res.status(401).json([...err]);
        }
        
        const foundUser = await db.user.findOne({where:{email}});
        
        if(!foundUser){
            return res.status(400).json({message:"User not exist"});
        }
        
        const isMatch = await bcrypt.compare(password, foundUser.password);
        
        if(!isMatch){
            return res.status(400).json({
                message:"Incorrect Password"
            })
        }else{  
            const token =  generateToken(foundUser);
            res.status(200).header("token",token).json({
                token,
            })
        }
}


// Facebook login flow 
const redirectToLoginDialogFacebook =  (req,res) => {
    try {
        const loginDialogUrl = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&scope=email`;
    
        res.redirect(loginDialogUrl);;
        console.log("redirect reussie");
    } catch (error) {
        console.log(error);
    }
    // const url = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&scope=email`;
} 

// Callback URL for handling the Facebook Login response
const callbackFacebookLogin = async(req,res)=> {
    const { code } = req.query;

    try{
        // Exchange authorization code for access token
        const response  = await axios.get(`https://graph.facebook.com/v13.0/oauth/access_token?client_id=${APP_ID}&client_secret=${APP_SECRET}&code=${code}&redirect_uri=${REDIRECT_URI}`);
        const { access_token } = response.data ; 

        // Use access_token to fetch user profile
        const profileResponse = await axios.get(`https://graph.facebook.com/v13.0/me?access_token=${access_token}`);
        const userData = profileResponse.data;
        const facebookID = userData.id;

        // check if user is not registered in database 
        const foundUser  = await db.user.findOne({where:{facebookID}});
        if(!foundUser){
            
           return  res.redirect('/signup');
        }
        
        // redirect user to the page after he is logged to the app
        res
        .send("<Redirect user to the page if he is logged to the app>")
        // .redirect("URL redirect to main of the app")
    }catch(error){
        console.error('Error:', error);
        res.redirect('/login');
    }
}

// to log out 
const logout = (req,res)=>{
    res.redirect("/login")
}

module.exports = { login,redirectToLoginDialogFacebook,callbackFacebookLogin,logout };


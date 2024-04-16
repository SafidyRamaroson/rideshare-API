const db = require("../../../models/index");
const hashPassword = require("../../../utils/user/hashPassword");
const { parseRegisterData } = require("../../../utils/user/parseData");
const axios = require("axios");
require("dotenv").config();

const APP_ID = process.env.FACEBOOK_CLIENT_ID;
const APP_SECRET = process.env.FACEBOOK_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:5000/api/auth/register/facebook/callback';

const register = async(req,res)=>{
    const { firstName,lastName,email,password } = req.body;

    const parsedData = parseRegisterData(req.body);

    if(!parsedData.success){
        const err = parsedData.error.issues.map((e) => ({ path: e.path[0], message: e.message })) 
        return res.status(400).json({error:[err[0]]});
    }
    const foundUser = await db.user.findOne({where:{email}});
 
    if(foundUser !== null){
        return res.status(400).json({message:"User already exists in this email"});
    }


    const hashedPassword = await hashPassword(password);
    
    // Inserted the subscriber if he is a special subscriber
    if(req.body.unsubscribe){
        const subscriber = await db.SpecialSubscriber.findOne({where:{email}});

        if(subscriber !== null){
            await db.SpecialSubscriber.create({email});
        }
    }

    // save the user to database;
    db.user.create({firstName,lastName,email,password:hashedPassword})
    .then((user)=>{
        res.status(200).json({message:"User successfully registered"});
    })
    .catch((err)=>{
        console.error("Error during the user creation");
        throw new Error(err);
    });
};
// Facebook login flow 
const redirectRegisterDialogFacebook =  (req,res) => {
    try {
        const loginDialogUrl = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&scope=email`;
    
        res.redirect(loginDialogUrl);;
        console.log("redirect register");
    } catch (error) {
        console.log(error);
    }
} 

const callbackFacebookRegister = async(req,res)=> {
    const { code } = req.query;

    try{
        // Exchange authorization code for access token
        const response  = await axios.get(`https://graph.facebook.com/v13.0/oauth/access_token?client_id=${APP_ID}&client_secret=${APP_SECRET}&code=${code}&redirect_uri=${REDIRECT_URI}`);
        const { access_token } = response.data ; 

        // Use access_token to fetch user profile
        const profileResponse = await axios.get(`https://graph.facebook.com/v13.0/me?fields=first_name,last_name,email&access_token=${access_token}`);
        const userData = profileResponse.data;
        const { first_name, last_name , email ,id } = userData ; 

        // check if user is already exist  in database 
        const foundUser  = await db.user.findOne({where: {email}});
       
        if(foundUser){
           return  res.redirect("<URL after he registered to the app ,to login page >");
        }
        // save the user to database;
        db.user.create({firstName:first_name,lastName:last_name,email,facebookID:id})

        // redirect user to main page of client
        res.send("<URL after he registered to the app ,to login page >");
    }catch(error){
        console.error('Error:', error);
        res.redirect('/login');
    }
}

module.exports = { register ,callbackFacebookRegister,redirectRegisterDialogFacebook };
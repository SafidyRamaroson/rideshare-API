const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user)=>{
    return jwt.sign({User:user},process.env.JWT_SECRET,{expiresIn:"15d"});
}

module.exports = generateToken;
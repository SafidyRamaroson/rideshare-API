const jwt = require("jsonwebtoken");
require("dotenv").config();


const getDecodeToken = async(token) => {
     const decodedToken = await jwt.decode(token,process.env.JWT_SECRET);
     
     if(!decodedToken){
          throw new Error("User not found")
     }
     return decodedToken;
}

module.exports = getDecodeToken;
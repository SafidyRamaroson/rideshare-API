const { DATE } = require("sequelize");
const db = require("./../../models/index");
const jwt = require("jsonwebtoken");
const hashPassword = require("./../../utils/user/hashPassword");
require("dotenv").config();

const resetPassword = async(req,res)=>{
    try {
        const { password , token , UserID } = req.body;

        const decoded =  jwt.verify(token,process.env.RESET_PASSWORD_JWT_SECRET);
        
        if(decoded.UserID  != UserID ){
            return res.status(400).json({ message : "Invalid token"});
        }

        if(decoded.exp < DATE.now()){
            return res.status(401).json({ message: "Token expired"});
        }
        
        const hashedPassword = await hashPassword(password);

        db.user.update({...req.body,password:hashedPassword},{where:{UserID:decoded.UserID}})
        .then(()=>{
            res.status(200).json({message:"Udpated User successfully"});
        })
        .catch((err)=> console.error(err))
        
    } catch (error) {
        return res.status(400).json({ message: "Invalid token" });
    }
}


module.exports = resetPassword ; 







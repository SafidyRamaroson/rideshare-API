const { parseLoginData } = require("./../../utils/user/parseData");
const generateToken = require("../../utils/user/generateToken");
const bcrypt = require("bcryptjs");
const db  = require("./../../models/index");

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
                // id:foundUser.UserID,
                // firstName:foundUser?.firstName,
                // lastName:foundUser?.lastName,
                // email:foundUser?.email,
                // phone:foundUser?.phone,
                token,
            })
        }
}

module.exports = login;


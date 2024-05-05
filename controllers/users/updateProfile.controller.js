const hashPassword = require("../../utils/user/hashPassword");
const db = require("./../../models/index");
const bcrypt = require("bcryptjs");

const udpateProfile = async(req,res)=>{
    const UserID = req.params.UserID;
    const user = await db.user.findOne({where:{UserID}});

    if(!user) return res.status(400).send("User with ID "+UserID+" don't exist in Database");

    const { password } = req.body;
    const hashedPassword = await hashPassword(password);
    db.user.update({...req.body,password:hashedPassword},{where:{UserID}})
    .then(()=>{
        res.status(200).json({message:"Udpated User successfully"});
    })
    .catch((err)=> console.error(err))
}

module.exports = udpateProfile;



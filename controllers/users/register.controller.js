const db = require("./../../models/index");
const hashPassword = require("./../../utils/user/hashPassword");
const { parseRegisterData } = require("./../../utils/user/parseData");

const register = async(req,res)=>{
    const { firstName,lastName,email, password } = req.body;
    const parsedData = parseRegisterData(req.body);

    if(!parsedData.success){
        return res.status(400).json({message:"Please add all fields"});
    }
    const foundUser = await db.user.findOne({where:{email}});
    if(foundUser){
        return res.json({message:"User already exists"});
    }

    const hashedPassword = await hashPassword(password);
    
    // save the user to database;
    db.user.create({firstName,lastName,email,password:hashedPassword})
    .then((user)=>{
        res.status(200).send(user);
    })
    .catch((err)=>{
        console.error("Error during the user creation");
        throw new Error(err);
    });

};

module.exports = register;
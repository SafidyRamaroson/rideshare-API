/** MANAGE THE REQUEST INCONMING AND RETURN RESPONSE ***/

// CREATE USER 
// Obtain INFO OF DRIVER ID
// Obtain INFO OF USER 
// Obtain ALL RESERVATION FOLLOWED BY USER
// OBTAIN INFORMATION ON A USER'S DRIVING LICENSES
// AND  THEIR RENTED CARS
// DELETE USER OR DRIVER ID
// UPDATE INFO OF CURRENT USER 
const { parseRegisterData, parseLoginData } = require("../middlewares/parseData");
const db = require("./../models/index");
const hashPassword = require("../utils/user/hashPassword");
const generateToken = require("../utils/user/generateToken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const register = async(req,res)=>{
    const { firstName,lastName,email, password } = req.body;
    const parsedData = parseRegisterData(req.body);


    if(!parsedData.success){
        return res.status(400).send("Please add all fields");
    }

    const foundUser = await db.user.findOne({where:{email}});

    if(foundUser){
        return res.send("User already exists");
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

const login = async(req,res) => {
    const { email, password } = req.body;
    const parsedData = parseLoginData(req.body);
    if(!parsedData.success){
            return res.status(401).send("Please add all fields");
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
            const token =  generateToken(foundUser.UserID);
            res.status(200).header("token",token).json({
                id:foundUser.UserID,
                firstName:foundUser?.firstName,
                lastName:foundUser?.lastName,
                email:foundUser?.email,
                phone:foundUser?.phone,
                token,
            })
        }
    }

const udpateProfil = async(req,res)=>{
    
    const { email } = req.body;
    db.user.update(req.body,{where:{email}})
    .then(()=>{
        res.status(200).json("Udpated User successfully");
    })
    .catch((err)=> console.error(err))
}

// get profile of current user 
const getProfil = async(req,res)=>{
    res.status(200).json(req.user);
}

// get profile by users/:id
const getProfilByUserID = async(req,res)=>{
    const UserID = req.params.UserID;

    try {
        const user = await db.user.findOne({where:{UserID}});

        if(!user){
            return res.status(404).send("User not found");
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(400).send("Invalid UserID format");
    }

}

const confirmDeleteAccount = async(req,res)=>{
    const UserID = req.params.UserID;
    const confirmed = req.body.confirmation;

    if(!confirmed){
        return res.status(400).send("Confirmation required to delete user");
    }
    
    try{
        const deletedUser  = await db.user.destroy({where:{UserID}});

        if(!deletedUser){
            return res.status(400).send("User to delete is not found");
        }

        res.status(200).send("User deleted successfully");
    }catch(error){
        console.error(error);
        res.status(500).send("Internal server error");
    }
}


module.exports = { 
    register,
    login,
    udpateProfil,
    getProfil,
    getProfilByUserID,
    confirmDeleteAccount
}
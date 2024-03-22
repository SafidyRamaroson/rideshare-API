/** MANAGE THE REQUEST INCONMING AND RETURN RESPONSE ***/

// CREATE USER 
// Obtain INFO OF DRIVER ID
// Obtain INFO OF USER 
// Obtain ALL RESERVATION FOLLOWED BY USER
// OBTAIN INFORMATION ON A USER'S DRIVING LICENSES
// AND  THEIR RENTED CARS
// DELETE USER OR DRIVER ID
// UPDATE INFO OF CURRENT USER 
const jwt = require("jsonwebtoken");
const { validateInputRegister, validateInputLogin } = require("./../middlewares/validateUserInput");
const db = require("./../models/index");
const hashPassword = require("../utils/user/hashPassword");
const generateToken = require("../utils/user/generateToken");
require("dotenv").config();

const register = async(req,res)=>{
    const { firstName,lastName,email, password } = req.body;
    const validatedUser = validateInputRegister(req.body);

    //validate the user input
    if(!validatedUser){
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
    const validatedUser = validateInputLogin(req.body);
    const { email, password } = req.body;
    if(!validatedUser){
        res.status(401).send("Please add all fields");
    }

    const foundUser = await db.user.findOne({where:{email}});

    if(!foundUser){
        return res.status(400).json({message:"User not exist"});
    }

    const isMatch = await await bcrypt.compare(password, foundUser.password);

    if(!isMatch){
        return res.status(400).json({
            message:"Incorrect Password"
        })
    }else{
        res.status(200).json({
            id:foundUser.UserId,
            firstName:foundUser.firstName,
            lastName:foundUser.lastName,
            token:generateToken(foundUser.id)
        })
    }
}


module.exports = { register,login }
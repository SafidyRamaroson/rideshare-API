const db = require("./../../models/index");
const hashPassword = require("./../../utils/user/hashPassword");
const { parseRegisterData } = require("./../../utils/user/parseData");

const register = async(req,res)=>{
    const { firstName,lastName,email,password } = req.body;

    const parsedData = parseRegisterData(req.body);

    if(!parsedData.success){
        const err = parsedData.error.issues.map((e) => ({ path: e.path[0], message: e.message })) 
        return res.status(400).json({error:[...err]});
    }
    const foundUser = await db.user.findOne({where:{email}});
    if(foundUser){
        return res.json({message:"User already exists"});
    }


    const hashedPassword = await hashPassword(password);
    
    // Inserted the subscriber if he is a special subscriber
    if(req.body.unsubscribe){
        const subscriber = await db.SpecialSubscriber.findOne({where:{email}});

        if(subscriber.length == 0){
            await db.SpecialSubscriber.create({email});
        }
    }

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
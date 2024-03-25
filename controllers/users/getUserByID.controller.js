const db = require("./../../models/index");

// get profile by users/:id
const getProfilByUserID = async(req,res)=>{
    const UserID = req.params.UserID;

    try {
        const user = await db.user.findOne({where:{UserID}});

        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(400).json({message:"Invalid UserID format"});
    }

}

module.exports = getProfilByUserID;
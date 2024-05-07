const db = require("../../src/models/index");

// get profile by users/:id
const getProfilByuserId = async(req,res)=>{
    const userId = req.params.userId;

    try {
        const user = await db.user.findOne({where:{userId}});

        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(400).json({message:"Invalid userId format"});
    }

}

module.exports = getProfilByuserId;
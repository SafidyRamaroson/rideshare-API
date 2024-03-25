
// get profile of current user 
const getProfil = async(req,res)=>{
    res.status(200).json(req.user);
}

module.exports = getProfil;
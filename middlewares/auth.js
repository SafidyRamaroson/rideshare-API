const jwt = require("jsonwebtoken");

const auth  = (req,res,next)=>{
    const token  = req.header("token");
    if(!token){
        return res.status(401).json({
            message:"Auth error"
        });
    }

    try {
        const decoded =  jwt.verify(token,process.env.JWT_SECRET);
        req.user.id = decoded.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Invalid token"
        });
    }

}

module.exports = { auth };

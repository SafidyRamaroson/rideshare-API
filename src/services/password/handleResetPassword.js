const db = require("../../models");
const httpException = require("../../utils/httpException");

const handleResetPassword = async(req)=>{
    const { userId, token , newPassword } = req?.body;
    // decoding user info
    const decoded =  jwt.verify(token,process.env.RESET_PASSWORD_JWT_SECRET);
    if(decoded.userId  != userId ){
        throw new httpException(400,INVALID_TOKEN);
    }
    if(decoded.exp < DATE.now()){
        throw new httpException(401,TOKEN_EXPIRED);
    }
    
    const hashedNewPassword = await hashPassword(newPassword);
    await db.user.update({...req.body,password:hashedNewPassword},{where:{userId:decoded.userId}})
}

module.exports = handleResetPassword;
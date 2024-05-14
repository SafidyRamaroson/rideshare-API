const db = require("../../models");
const { USER_NOT_FOUND, INCORRECT_PASSWORD } = require("../../utils/error.message");
const { default: httpException } = require("../../utils/httpException");

const handleLogin = async(userInfoLoginInput)=>{
    const {error:errorInputData,success } = parseLoginData(userInfoLoginInput);

        if(!success) throw new httpException(401,...errorInputData);
        
        const foundUser = await db.user.findOne({where:{email}});
        
        if(!foundUser) throw new httpException(400,USER_NOT_FOUND);
        
        const isMatch = await bcrypt.compare(password, foundUser.password);
        
        if(!isMatch){
            throw new httpException(400,INCORRECT_PASSWORD)
        }else{  
            const token =  generateToken(foundUser);
            res.status(200).header("token",token).json({token});
        }
}

module.exports = handleLogin;

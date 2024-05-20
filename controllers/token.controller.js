const getDecodeToken = require("../services/decodeToken");
const handleError = require("../utils/handleError");


const decodeToken = async(req,res) => {
    const {token} = req.body;
    try {
        const decodedTokenUser = await getDecodeToken(token);
        res.status(200).json(decodedTokenUser);   
    } catch (error) {
        handleError(res,error);
    }
}



module.exports = decodeToken;
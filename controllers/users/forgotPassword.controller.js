const jwt = require("jsonwebtoken");
const db = require("./../../models/index");
const { sendEmail, mailTemplate } = require("./../../utils/user/email");


const forgotPassword = async(req,res)=>{

    try {
        const { email } = req.body;
        const user = await db.user.findOne({where:{email}});
        if(!user) {
            return res.status(404).json({
                status:"error",
                message:"You are not registered !"
            });
        }
    
        const token = jwt.sign(
            { UserID:user.UserID},
            process.env.RESET_PASSWORD_JWT_SECRET,
            { expiresIn:"15m" }
        );
        
    
        const mailOption = {
            email: email,
            subject: "Forgot Password Link",
            message: mailTemplate(
              "We have received a request to reset your password. Please reset your password using the link below.",
              `${process.env.CROSS_ORIGIN}/resetPassword?id=${user.UserID}&token=${token}`,
              "Reset Password"
            ),
          };
    
        await sendEmail(mailOption)
        .then(()=>{
            res.status(200).json({
                message: "A password reset link has been sent to your email.",
            });
        })
        .catch((err)=>{
            res.status(400).json({
                message:`Error occured during the send email ${err}`
            })
        })
    
    } catch (error) {
        console.log(error);

    }
}

module.exports = forgotPassword;
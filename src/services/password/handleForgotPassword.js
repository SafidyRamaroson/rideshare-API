const { USER_NOT_FOUND } = require("../../utils/error.message");
const httpException = require("../../utils/handleError");
const { sendEmail } = require("./../../utils/email");
require("dotenv").config();

const handleForgotPassword = async(email)=> {
    const user = await db.user.findOne({ where:{email}});
    if(!user) {
        throw new  httpException(404,USER_NOT_FOUND);
    }

    const token = jwt.sign({ userId:user.userId},process.env.RESET_PASSWORD_JWT_SECRET,{ expiresIn:"15m"});

    const mailOption = {
        email: email,
        subject: "Forgot Password Link",
        message: mailTemplate(
          "We have received a request to reset your password. Please reset your password using the link below.",
          `${process.env.CROSS_ORIGIN}/resetPassword?id=${user.userId}&token=${token}`,
          "Reset Password"
        ),
      }

    await sendEmail(mailOption);
}

module.exports  = handleForgotPassword;
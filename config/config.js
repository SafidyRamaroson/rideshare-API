require("dotenv").config()
module.exports = {
    PORT: process.env.PORT ?? 5000,
    corsOptions:{
        origin:process.env.CROSS_ORIGIN,
        methods:['GET','POST','PUT','DELETE'],
        allowedHeaders:['Content/type', 'Authorization']
    }
};

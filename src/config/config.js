require("dotenv").config()
module.exports = {
    PORT: process.env.PORT ?? 5000,
    corsOptions:{
        origin:"*",
        methods:['GET','POST','PUT','DELETE'],
        allowedHeaders:['Content/type', 'Authorization']
    }
};

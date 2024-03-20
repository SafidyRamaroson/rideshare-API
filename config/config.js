module.exports = {
    PORT: process.env.PORT,
    db:{
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        options:{
            host:process.env.DB_HOST,
            dialect:'mysql',
            pool:{
                max: 6,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            logging:false
        }
    },
    corsOptions:{
        origin:process.env.CROSS_ORIGIN,
        methods:['GET','POST','PUT','DELETE'],
        allowedHeaders:['Content/type', 'Authorization']
    }
};
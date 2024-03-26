const {Sequelize,DataTypes} = require("sequelize");

require("dotenv").config();

const database = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
    host:process.env.DB_HOST,
    dialect:"mysql",
    pool:{
        max:6,
        min:0,
        acquire:30000,
        idle:10000
    },
    logging:false
})

const db = {}

db.Sequelize = Sequelize
db.databaseConf = database

//function drop the existing table and re-sync database
db.dropNoteManagementTable = ()=>{
    db.databaseConf.sync({force:true})
    .then(()=>{
        console.log('e-covoiture-ch table just dropped and db re-synced.');
    })
}

db.user = require("./user.model.js")(database,DataTypes);
db.trip = require("./trip.model.js")(database,DataTypes);
db.reservation = require("./reservation.model.js")(database,DataTypes);
db.vehicle = require("./vehicle.model.js")(database,DataTypes);
db.drivingLicense = require("./drivingLicense.model.js")(database,DataTypes);
db.SpecialSubscriber = require("./specialSubscriber.model.js")(database,DataTypes);

module.exports = db
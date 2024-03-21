const {Sequelize,DataTypes} = require("sequelize");
const dbConfig = require("./../config/db.config.js");
require("dotenv").config();

const database = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host:dbConfig.HOST,
    dialect:dbConfig.dialect,
    pool:{
        max:dbConfig.pool.max,
        min:dbConfig.pool.min,
        acquire:dbConfig.pool.acquire,
        idle:dbConfig.pool.idle
    }
})

const db = {}

db.Sequelize = Sequelize
db.databaseConf = database

//function drop the existing table and re-sync database
db.dropNoteManagementTable = ()=>{
    db.databaseConf.sync({force:true})
    .then(()=>{
        console.log('e-covoiture-ch table just dropped and db re-synced.')
    })
}

db.user = require("./user.model.js")(database,DataTypes);
db.trip = require("./trip.model.js")(database,DataTypes);
db.reservation = require("./reservation.model.js")(database,DataTypes);
db.vehicle = require("./vehicle.model.js")(database,DataTypes);
db.drivingLicense = require("./drivingLicense.model.js")(database,DataTypes);

module.exports = db
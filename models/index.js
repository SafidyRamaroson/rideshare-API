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

db.Sequelize = Sequelize;
db.databaseConf = database;

//function drop the existing table and re-sync database
db.dropRideShareTable = ()=>{
    db.databaseConf.sync({force:true})
    .then(()=>{
        console.log('Rideshare table just dropped and db re-synced.');
    });
}

db.SpecialSubscriber = require("./specialSubscriber.model.js")(database,DataTypes);
db.user = require("./user.model.js")(database,DataTypes);
db.trip = require("./trip.model.js")(database,DataTypes);
db.stop = require("./stop.model.js")(database,DataTypes);
db.reservation = require("./reservation.model.js")(database,DataTypes);
db.archive = require("./archive.model.js")(database,DataTypes);
db.reviews = require("./reviews.model.js")(database,DataTypes);

// define associations
db.archive.belongsTo(db.trip, { foreignKey: 'tripId' });
db.archive.belongsTo(db.user, { foreignKey: 'userId' });
db.reservation.belongsTo(db.user,{foreignKey:'userId'});
db.reservation.belongsTo(db.trip,{foreignKey:'tripId'});
db.reviews.belongsTo(db.trip, { foreignKey: 'tripId' });
db.reviews.belongsTo(db.user, { foreignKey: 'userId' });
db.stop.belongsTo(db.trip, { foreignKey: 'tripId' });
db.trip.belongsTo(db.user, { foreignKey: 'driverId' });
db.trip.hasMany(db.stop, { foreignKey: 'tripId' });


module.exports = db;

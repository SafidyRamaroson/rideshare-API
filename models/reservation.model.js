module.exports = (database,DataTypes)=>{
    const Reservation = database.define('Reservation', {
        reservationId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        numberSeats: {
          type:DataTypes.INTEGER,
          allowNull:false,
        },
        amountPaid: {
          type: DataTypes.FLOAT,
          allowNull:false
        },
        contact: {
          type:DataTypes.STRING
        }
      },{
        timestamps: false, 
    });
      
    Reservation.belongsTo(require("./user.model")(database,DataTypes),{foreignKey:'userId'});
    Reservation.belongsTo(require("./trip.model")(database,DataTypes),{foreignKey:'tripId'});

    return Reservation;   
}
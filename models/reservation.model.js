module.exports = (database,DataTypes)=>{
    const Reservation = database.define('Reservation', {
        ReservationID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        reservationDate: {
          type: DataTypes.DATE
        },
        reservationStatus: {
          type: DataTypes.STRING
        },
        amountPaid: {
          type: DataTypes.FLOAT
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        }
      });
      
    Reservation.belongsTo(require("./user.model")(database,DataTypes),{foreignKey:'UserID'});
    Reservation.belongsTo(require("./trip.model")(database,DataTypes),{foreignKey:'TripID'});

    return Reservation;   
}
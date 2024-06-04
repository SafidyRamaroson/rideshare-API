module.exports = (database,DataTypes)=>{
    const Reservation = database.define('reservation', {
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

    return Reservation;   
}




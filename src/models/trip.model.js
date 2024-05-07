module.exports = (database,DataTypes) => {
    const Trip = database.define('Trip', {
        tripId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,  
        },
        departureProvince:{
          type: DataTypes.STRING,
          allowNull : false
        },
        departurePrecise :{
          type:DataTypes.STRING,
          allowNull : false
        },
        destinationProvince:{
          type: DataTypes.STRING,
          allowNull:false
        },
        destinationPrecise :{
          type:DataTypes.STRING,
          allowNull:false
        },
        dateOfDeparture : {
          type:DataTypes.DATE,
          allowNull : false
        },
        additionalNotes: {
          type: DataTypes.STRING,
          allowNull: false
        },
        numberOfSeats:{
          type: DataTypes.INTEGER,
          allowNull:false
        },
        pricePerSeat: {
          type: DataTypes.FLOAT,
          allowNull:false
        },
        returnDatetime:{
          type:DataTypes.DATE,
          allowNull:true,
        },
        refundable: {
          type: DataTypes.BOOLEAN
        },
        oneWay: {
          type: DataTypes.BOOLEAN
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        },
        status: {
          type: DataTypes.ENUM('available', 'passed'),
          allowNull:false,
        }
      });

    Trip.belongsTo(require("./user.model")(database,DataTypes), { foreignKey: 'driverId' });    
    return Trip ;
}
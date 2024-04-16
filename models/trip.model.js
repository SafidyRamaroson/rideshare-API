module.exports = (database,DataTypes) => {
    const Trip = database.define('Trip', {
        TripID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        departureProvince:{
          type: DataTypes.STRING
        },
        departurePrecise :{
          type:DataTypes.STRING
        },
        destinationProvince:{
          type: DataTypes.STRING
        },
        destinationPrecise :{
          type:DataTypes.STRING
        },
        stops: {
          type: DataTypes.JSON
        },
        setsOffered: {
          type: DataTypes.JSON 
        },
        pricePerSeat: {
          type: DataTypes.FLOAT
        },
        additionalNotes: {
          type: DataTypes.STRING,
          allowNull: true
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
        }
      });

    Trip.belongsTo(require("./user.model")(database,DataTypes), { foreignKey: 'DriverID' });    
    return Trip ;
}
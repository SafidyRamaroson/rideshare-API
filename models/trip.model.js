module.exports = (database,DataTypes) => {
    const Trip = database.define('Trip', {
        TripID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        departureLocation: {
          type: DataTypes.STRING
        },
        destination: {
          type: DataTypes.STRING
        },
        departureTime: {
          type: DataTypes.DATE
        },
        arrivalTime: {
          type:DataTypes.DATE
        },
        pricePerPassenger: {
          type: DataTypes.FLOAT
        },
        availableSeats: {
          type: DataTypes.INTEGER
        },
        tripDescription: {
          type: DataTypes.STRING
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
    Trip.belongsTo(require("./drivingLicense.model")(database,DataTypes), { foreignKey: 'VehicleID' });
    
    return Trip ;
}
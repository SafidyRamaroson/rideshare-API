
modele.exports = (database,DataTypes)=>{
    const Vehicle = database.define('Vehicle', {
        VehicleID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        brand: {
          type: DataTypes.STRING
        },
        model: {
          type: DataTypes.STRING
        },
        manufactureYear: {
          type: DataTypes.INTEGER
        },
        color: {
          type: DataTypes.STRING
        },
        availableSeats: {
          type: DataTypes.INTEGER
        },
        vehicleConditions: {
          type: DataTypes.STRING
        },
        vehicleImage: {
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
      
    Vehicle.belongsTo(require("./user.model")(database,DataTypes), { foreignKey: 'UserID' });
    return Vehicle ;
}
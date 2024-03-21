
module.exports = (database,DataTypes)=>{
    const DrivingLicense = database.define('DrivingLicense', {
        DrivingLicenseID: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        licenseNumber: {
          type: DataTypes.STRING
        },
        expirationDate: {
          type: DataTypes.DATE
        },
        licenseImage: {
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
      
      DrivingLicense.belongsTo(require("./user.model")(database,DataTypes), { foreignKey: 'UserID' });
    return DrivingLicense;
}
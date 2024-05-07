module.exports = (database,DataTypes) => {
    const Save = database.define('Save', {
        saveId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        saveAt: {
            type: DataTypes.DATE,
            default: DataTypes.NOW,
        }
    });
    
    Save.belongsTo(require("./trip.model")(database,DataTypes), { foreignKey: 'tripId' });
    Save.belongsTo(require("./user.model")(database,DataTypes), { foreignKey: 'userId' });

    return Save;
}
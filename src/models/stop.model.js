module.exports = (database,DataTypes) => {
    const Stop = database.define('Stop', {
        stopId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    
    Stop.belongsTo(require("./trip.model")(database,DataTypes), { foreignKey: 'tripId' });

    return Stop;
}
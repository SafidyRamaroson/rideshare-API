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
        price: {
            type: DataTypes.INTEGER,
            allowNull:false
        }
    },{
        timestamps: false, 
    });
    
    Stop.belongsTo(require("./trip.model")(database,DataTypes), { foreignKey: 'tripId' });

    return Stop;
}
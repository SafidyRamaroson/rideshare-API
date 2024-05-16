module.exports = (database,DataTypes) => {
    const Archive = database.define('Archive', {
        archiveId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        saveAt: {
            type: DataTypes.DATE,
            default: DataTypes.NOW,
        }
    },{
            timestamps: false, 
    });
    
    Archive.belongsTo(require("./trip.model")(database,DataTypes), { foreignKey: 'tripId' });
    Archive.belongsTo(require("./user.model")(database,DataTypes), { foreignKey: 'userId' });

    return Archive;
}
module.exports = (database,DataTypes) => {
    const Archive = database.define('archive', {
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
    
    return Archive;
}
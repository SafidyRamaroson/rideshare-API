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
    
    return Archive;
}
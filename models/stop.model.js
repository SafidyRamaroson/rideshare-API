module.exports = (database,DataTypes) => {
    const Stop = database.define('stop', {
        stopId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        typeDepartureOrReturn:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        timestamps: false, 
    });
    
   
    return Stop;
}
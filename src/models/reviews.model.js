module.exports = (database,DataTypes) => {
    const Reviews = database.define('Reviews', {
        reviewId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content:{
            type: DataTypes.TEXT,
        },
        createdAt: {
            type: DataTypes.DATE,
            default: DataTypes.NOW,
        },
        updatedAt:{
            type:  DataTypes.DATE,
            defaultValue : DataTypes.Now
        }  
    },{
        timestamps: false, 
    });
    
    //  un commentaire appartient à un voyage 
    // chaque commentaire est identfie par un utilisateur(user id)
    Reviews.belongsTo(require("./trip.model")(database,DataTypes), { foreignKey: 'tripId' });
    Reviews.belongsTo(require("./user.model")(database,DataTypes), { foreignKey: 'userId' });

    return Reviews;
}
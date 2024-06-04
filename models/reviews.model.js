module.exports = (database,DataTypes) => {
    const Reviews = database.define('reviews', {
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
    
    return Reviews;
}
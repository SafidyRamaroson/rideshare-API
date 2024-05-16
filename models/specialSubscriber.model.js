module.exports = (database,DataTypes)=>{
    const SpecialSubscriber = database.define("SpecialSubscriber",{
        subscriberId:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email:{
            type:DataTypes.STRING,
            unique:true,
            allowNull:false,
        }
    },{
        timestamps: false, 
    });
    return SpecialSubscriber
}
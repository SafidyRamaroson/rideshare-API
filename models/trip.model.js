module.exports = (database,DataTypes) => {
    const Trip = database.define('Trip', {
        tripId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,  
        },
        departureProvince:{
          type: DataTypes.STRING,
          allowNull : false
        },
        departurePrecise :{
          type:DataTypes.STRING,
          allowNull : false
        },
        destinationProvince:{
          type: DataTypes.STRING,
          allowNull:false
        },
        destinationPrecise :{
          type:DataTypes.STRING,
          allowNull:false
        },
        departureTime : {
          type:DataTypes.STRING, 
          allowNull : false
        },
        departureDate : {
          type:DataTypes.STRING,
          allowNull: false
        },
        isComfort: {
          type:DataTypes.BOOLEAN,
          allowNull:false,
        },
        seats:{
          type: DataTypes.INTEGER,
          allowNull:false
        },
        returnDate:{
          type:DataTypes.DATEONLY,
          allowNull:true,
        },
        returnTime:{
          type: DataTypes.TIME,
          allowNull:true
        },
        refundable: {
          type: DataTypes.BOOLEAN
        },
        oneWay: {
          type: DataTypes.BOOLEAN,
          allowNull:false,
        },
        fixedPriceDeparture:{
          type:DataTypes.BOOLEAN,
        },
        fixedPriceReturn: {
          type:DataTypes.BOOLEAN
        },
        departurePrice:{
          type:DataTypes.INTEGER,
          allowNull:false
        },
        returnPrice:{
          type:DataTypes.INTEGER,
          allowNull:false
        },
        phoneNumber: {
          type:DataTypes.STRING,
          allowNull:false
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        },
        },{
          timestamps: false, 
      });

    Trip.belongsTo(require("./user.model")(database,DataTypes), { foreignKey: 'driverId' });    
    return Trip ;
}
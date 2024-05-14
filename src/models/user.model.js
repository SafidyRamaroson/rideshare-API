

/*** GENERAL USER SCHEMA ***/
module.exports = (database,DataTypes,)=>{
    const User= database.define('User',{
        userId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        firstName: {
          type: DataTypes.STRING
        },
        lastName: {
          type: DataTypes.STRING
        },
        dateOfBirth: {
          type: DataTypes.DATE
        },
        email: {
          type: DataTypes.STRING,
          unique:true,
        },
        gender: {
          type:DataTypes.STRING,
          default:null
        },
        password: {
          type: DataTypes.STRING
        },
        phoneNumber: {
          type: DataTypes.STRING
        },
        nationalID: {
          type: DataTypes.STRING,
          unique:true
        },
        hasTripCreated:{
          type: DataTypes.BOOLEAN,
          defautlValue:false
        }
      },{
        timestamps: false, 
    });
    return User; 
}




/*** GENERAL USER SCHEMA ***/
module.exports = (database,DataTypes,)=>{
    const User= database.define('User',{
        UserID: {
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
          type: DataTypes.STRING
        },
        password: {
          type: DataTypes.STRING
        },
        phoneNumber: {
          type: DataTypes.STRING
        },
        nationalID: {
          type: DataTypes.STRING
        } 
      },{
        timestamps: false, 
    });
    return User; 
}


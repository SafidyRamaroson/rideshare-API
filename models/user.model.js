

/*** GENERAL USER SCHEMA ***/
module.exports = (database,DataTypes,)=>{
    const User= database.define('User', {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING,
          validate: {
            is: /^[0-9]{10}$/,
          },
        },
        resetPasswordLink: {
          type: DataTypes.STRING,
          defaultValue: '',
        }
      }, {
        timestamps: false, 
      });
    
    return User; 
}


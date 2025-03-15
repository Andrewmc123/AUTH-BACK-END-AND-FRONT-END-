'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define associations if needed, for example:
      // User.hasMany(models.Post, { foreignKey: 'userId' });
    }
  };

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error('Cannot be an email.');
            }
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true,
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY, // Keep this if you're using a binary format for hashed passwords
        allowNull: false,
        validate: {
          len: [60, 60], // Ensure the hashed password is exactly 60 characters (for bcrypt hashes)
        }
      }
    },
    {
      sequelize,
      modelName: 'User',
      
        }
  );

  return User;
};

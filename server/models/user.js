'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsToMany(models.product, {through: models.cart})
    }
  };
  user.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Not an email'
        },
        notEmpty: {
          msg: 'Email is required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6],
          msg: 'Password at least 6 characters'
        },
        notEmpty: {
          msg: 'Password is required'
        }
      }
    },
    role: DataTypes.STRING,
  }, {
    hooks: {
      beforeCreate(instance, option){
        instance.role = 'customer'
        instance.password = hashPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'user',
  });
  return user;
};
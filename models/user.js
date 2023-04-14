'use strict';
const {
  Model
} = require('sequelize');
const { post } = require('./post');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.post, {
        foreignKey: {
          name: "user_id",
        },
      });
      models.user.hasMany(models.comment, {
        foreignKey: {
          name: "user_id",
        },
      });
    }
  }
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};
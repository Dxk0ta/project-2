'use strict';
const {
  Model
} = require('sequelize');
// const user = require('./user');
// const { comment } = require('./Comment');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    //   post.belongsTo(models.user);
      models.post.belongsTo(models.user, {
        foreignKey: {
          name: "user_id",
        },
      });
    }
  }
  post.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};
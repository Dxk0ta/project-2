'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gif extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.gif.belongsTo(models.user, {
        foreignKey: {
          name: "user_id",
        },
      });
      models.gif.belongsTo(models.post, {
        foreignKey: {
          name: "post_id",
        },
      });
    }
  }
  gif.init({
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'gif',
  });
  return gif;
};
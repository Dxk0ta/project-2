const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Gif = sequelize.define('Gif', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Gif;
};
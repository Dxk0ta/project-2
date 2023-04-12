'use strict';
const Post = require('./posts.js')
// import{post} from "/posts.js"
const {
  Model, Sequelize, DataTypes
} = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
class User extends Model {
  name = 'User';
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
User.init({
  id : { 
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  email: DataTypes.STRING,
  password: DataTypes.STRING
}, {
  sequelize,
  modelName: 'User',
});
User.hasMany(Post)
module.exports = User;

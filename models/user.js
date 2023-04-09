'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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

class UserModel {
  constructor() {
    // initialize user data
    this.users = [];
  }

  addUser(user) {
    // add a user to the users list
    this.users.push(user);
  }

  getUsers() {
    // get all users
    return this.users;
  }

  // other methods for user-related operations
}

module.exports = UserModel;
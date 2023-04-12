'use strict';
const {
    Model, Sequelize, DataTypes
} = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
    */
   static associate(models) {
       // define association here
    }
}
 Message.init({
    postId: {
            type: DataTypes.INTEGER,
            references:  {
                model: 'Post',
                key: 'Id'
            }
        },
        message: DataTypes.STRING
        }, {
            sequelize,
            modelName:  'Message',
            });
module.exports = Message;
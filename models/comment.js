'use strict';
const {
    Model
} = require('sequelize');
// const { post } = require('./Post');
module.exports = (sequelize, DataTypes) => {
    class comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
        */
       static associate(models) {
           // define association here
           models.comment.belongsTo(models.post, {
               foreignKey: {
                   name: "post_id",
                },
            });
        }
    }
    comment.init({
        content: DataTypes.STRING,
        user_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'comment',
    });
    return comment;
};
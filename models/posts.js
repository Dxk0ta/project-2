'use strict';
const {
    Model, Sequelize, DataTypes
} = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
    }
}
Post.init({
    userId: {
        type: DataTypes.INTEGER,
        references:  {
            model: 'users',
            key: 'id'
        }
    },
    message: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Post',
});
module.exports = Post;
    
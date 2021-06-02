'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    
    static associate(models) {
      
      models.Comment.belongsTo(models.User, {
        foreignKey: {
          name: "idUsers",
          allowNull: false,
        },
      });
      
      models.Comment.belongsTo(models.Message, {
        foreignKey: {
          name: "idMessages",
          allowNull: false,
        },
      });
    }
  };
  
  Comment.init({
    idUsers: DataTypes.INTEGER,
    idMessages: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  
  return Comment;
};
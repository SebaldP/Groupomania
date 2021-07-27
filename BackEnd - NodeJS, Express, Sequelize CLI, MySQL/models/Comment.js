'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    
    static associate(models) {
      
      this.belongsTo(models.User, {
        foreignKey: {
          name: "idUsers",
          allowNull: false,
        },
      });
      
      this.belongsTo(models.Message, {
        foreignKey: {
          name: "idMessages",
          allowNull: false,
        },
      });

      this.hasMany(models.Report, {
        foreignKey: {
          name: "idComments",
          allowNull: false
        },
        onDelete: "CASCADE",
        hooks: true
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
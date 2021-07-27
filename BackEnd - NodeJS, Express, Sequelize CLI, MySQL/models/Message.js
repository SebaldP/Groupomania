'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    
    static associate(models) {
      
      this.belongsTo(models.User, {
        foreignKey: {
          name: "idUsers",
          allowNull: false
        },
      });
      
      this.hasMany(models.Comment, {
        foreignKey: {
          name: "idMessages",
          allowNull: false
        },
        onDelete: "CASCADE",
        hooks: true
      });

      this.hasMany(models.Report, {
        foreignKey: {
          name: "idMessages",
          allowNull: false
        },
        onDelete: "CASCADE",
        hooks: true
      });
    }
  };
  
  Message.init({
    idUsers: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Message',
  });
  
  return Message;
};
'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      
      models.User.hasMany(models.Message, {
        foreignKey: "idUsers",
        onDelete: "cascade",
        hooks: true,
      });
      
      models.User.hasMany(models.Comment, {
        foreignKey: "idUsers",
        onDelete: "cascade",
        hooks: true,
      });
      
      models.User.hasMany(models.Report, {
        foreignKey: "idUsers",
        onDelete: "cascade",
        hooks: true,
      });
    }
  };
  
  User.init({
    pseudonym: DataTypes.STRING,
    registration: DataTypes.STRING,
    password: DataTypes.STRING,
    oldPassword: DataTypes.STRING,
    resetKey: DataTypes.STRING,
    image: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  
  return User;
};
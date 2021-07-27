'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      
      this.hasMany(models.Message, {
        foreignKey: "idUsers",
        onDelete: "CASCADE",
        hooks: true,
      });
      
      this.hasMany(models.Comment, {
        foreignKey: "idUsers",
        onDelete: "CASCADE",
        hooks: true,
      });
      
      this.hasMany(models.Report, {
        foreignKey: "idUsers",
        onDelete: "CASCADE",
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
    avatar: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    isModerator: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  
  return User;
};
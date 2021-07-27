'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    
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
      
      this.belongsTo(models.Comment, {
        foreignKey: {
          name: "idComments",
          allowNull: true,
        },
      });
    }
  };
  
  Report.init({
    idUsers: DataTypes.INTEGER,
    idMessages: DataTypes.INTEGER,
    idComments: {type: DataTypes.INTEGER, allowNull:true},
    report: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Report',
  });
  
  return Report;
};
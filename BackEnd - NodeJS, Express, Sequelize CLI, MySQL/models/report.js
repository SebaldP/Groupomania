'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    static associate(models) {
      models.Report.belongsTo(models.User, {
        foreignKey: {
          name: "idUsers",
          allowNull: false,
        },
      });
      models.Report.belongsTo(models.Message, {
        foreignKey: {
          name: "idMessages",
          allowNull: true,
        },
      });
      models.Report.belongsTo(models.Comment, {
        foreignKey: {
          name: "idComments",
          allowNull: true,
        },
      });
    }
  };
  Report.init({
    idUsers: DataTypes.STRING,
    idMessages: DataTypes.STRING,
    idComments: DataTypes.STRING,
    report: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Report',
  });
  return Report;
};
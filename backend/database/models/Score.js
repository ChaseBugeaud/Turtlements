'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Score extends Model {
    static associate(models) {
      Score.belongsTo(models.Contestant, {
        foreignKey: {
          allowNull: false,
          name: "contestant_id"
        },
        as: "contestant"
      })
      Score.belongsTo(models.Matchup, {
        foreignKey: {
          allowNull: false,
          name: "matchup_id"
        },
        as: "matchup"
      })
    }
  }
  Score.init({
    matchup_id: DataTypes.INTEGER,
    contestant_id: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Score',
  });
  return Score;
};

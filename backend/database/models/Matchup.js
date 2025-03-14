'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Matchup extends Model {
    static associate(models) {
      Matchup.hasMany(models.Score, {
        foreignKey: "matchup_id",
        as: "scores"
      })
      Matchup.belongsTo(models.Tournament, {
        foreignKey: {
          allowNull: false,
          name: "tournament_id"
        },
        as: "tournament"
      })
    }
  }
  Matchup.init({
    tournament_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Matchup',
  });
  return Matchup;
};

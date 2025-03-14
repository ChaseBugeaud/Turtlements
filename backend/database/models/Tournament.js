'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tournament extends Model {
    static associate(models) {
      Tournament.hasMany(models.Matchup, {
        foreignKey: "tournament_id",
        as: "matchups"
      })
      Tournament.hasMany(models.Contestant, {
        foreignKey: "tournament_id",
        as: "contestants"
      })
      Tournament.hasOne(models.Sponsor, {
        foreignKey: "tournament_id",
        as: "sponsor"
      })
    }
  }
  Tournament.init({
    name: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    prize: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tournament',
  });
  return Tournament;
};

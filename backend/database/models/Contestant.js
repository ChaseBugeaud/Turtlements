'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contestant extends Model {
    static associate(models) {
      Contestant.hasMany(models.Score, {
        foreignKey: "contestant_id",
        as: "scores"
      })
      Contestant.belongsTo(models.Tournament, {
        foreignKey: {
          allowNull: false,
          name: "tournament_id"
        },
        as: "tournament"
      })
    }
  }
  Contestant.init({
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    seed: DataTypes.INTEGER,
    tournament_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Contestant',
  });
  return Contestant;
};

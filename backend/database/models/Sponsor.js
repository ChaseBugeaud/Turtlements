'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sponsor extends Model {
    static associate(models) {
      Sponsor.belongsTo(models.Tournament, {
        foreignKey: {
          allowNull: false,
          name: "tournament_id"
        },
        as: "tournament"
      })
    }
  }
  Sponsor.init({
    name: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    header_image: DataTypes.STRING,
    description: DataTypes.STRING,
    tournament_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sponsor',
  });
  return Sponsor;
};

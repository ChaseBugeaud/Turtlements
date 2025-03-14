'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contestant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contestant.init({
    name: DataTypes.STRING,
    seed: DataTypes.INTEGER,
    logo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Contestant',
  });
  return Contestant;
};
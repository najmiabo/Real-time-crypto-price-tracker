'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Crypto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Crypto.hasMany(models.WatchList)
    }
  }
  Crypto.init({
    rawName: DataTypes.STRING,
    coinName: DataTypes.STRING,
    lastPrice: DataTypes.DECIMAL,
    currentPrice: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Crypto',
  });
  return Crypto;
};
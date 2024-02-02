'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WatchList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WatchList.belongsTo(models.User)
      WatchList.belongsTo(models.Crypto)
    }
  }
  WatchList.init({
    UserId: DataTypes.INTEGER,
    CryptoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'WatchList',
  });
  return WatchList;
};
"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Products.init(
    {
      NAME: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      DESC: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      PRICE: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      CATEGORY_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      IMAGE_NAME:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      CD: DataTypes.STRING,
      CREATED_DATE: DataTypes.DATE,
      CREATED_BY: DataTypes.INTEGER,
      MODIFIED_DATE: DataTypes.DATE,
      MODIFIED_BY: DataTypes.INTEGER,
      IS_DELETED: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Products",
      createdAt: "CREATED_DATE",
      updatedAt: "MODIFIED_DATE",
    }
  )
  return Products
}

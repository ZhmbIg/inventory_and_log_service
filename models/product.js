const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        name: {
            type: DataTypes.STRING,
            allownull: false,
        },
        plu: {
            type: DataTypes.STRING,
            allownull: false,
            unique: true,
        },
    });
    Product.associate = (models) => {
        Product.hasMany(models.Inventory, { foreignKey: 'product_id' });
    };

    return Product
}
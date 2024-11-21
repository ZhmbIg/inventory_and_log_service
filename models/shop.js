module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define('Shop', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Shop.associate = (models) => {
    Shop.hasMany(models.Inventory, { foreignKey: 'shop_id' });
  };

  return Shop;
};

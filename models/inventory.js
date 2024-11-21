module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define('Inventory', {
      product_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: 'Products',
              key: 'id',
          },
      },
      shop_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: 'Shops',
              key: 'id',
          },
      },
      quantity_on_shelf: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
      },
      quantity_in_order: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
      },
  });

  Inventory.associate = (models) => {
      Inventory.belongsTo(models.Product, { foreignKey: 'product_id' });
      Inventory.belongsTo(models.Shop, { foreignKey: 'shop_id' });
  };

  return Inventory;
};

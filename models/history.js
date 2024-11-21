module.exports = (sequelize, DataTypes) => {
  const Histories = sequelize.define('Histories', {
    shop_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    plu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity_changed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    old_quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    new_quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  return Histories;
};

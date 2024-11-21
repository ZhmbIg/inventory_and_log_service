const { Inventory, Product, Shop } = require('../models');

class InventoryService {
  static async createInventory(product_id, shop_id, shelf_quantity, order_quantity) {
    return await Inventory.create({ product_id, shop_id, shelf_quantity, order_quantity });
  }

  static async updateInventory(id, shelf_quantity, order_quantity) {
    const inventory = await Inventory.findByPk(id);
    if (inventory) {
      inventory.shelf_quantity += shelf_quantity;
      inventory.order_quantity += order_quantity;
      await inventory.save();
    }
    return inventory;
  }

  static async getInventoriesByFilters({ plu, shop_id, shelf_quantity_min, shelf_quantity_max, order_quantity_min, order_quantity_max }) {
    const filters = {};

    if (plu) {
      const product = await Product.findOne({ where: { plu } });
      filters.product_id = product ? product.id : null;
    }

    if (shop_id) filters.shop_id = shop_id;
    if (shelf_quantity_min || shelf_quantity_max) filters.shelf_quantity = { [Op.between]: [shelf_quantity_min, shelf_quantity_max] };
    if (order_quantity_min || order_quantity_max) filters.order_quantity = { [Op.between]: [order_quantity_min, order_quantity_max] };

    return await Inventory.findAll({
      where: filters,
      include: [Product, Shop],
    });
  }
}

module.exports = InventoryService;

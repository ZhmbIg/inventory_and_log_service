const { Shop } = require('../models');

class ShopService {
  static async createShop(name) {
    const shop = await Shop.create({ name });
    return shop;
  }

  static async getAllShops() {
    const shops = await Shop.findAll(); 
    return shops;
  }
}

module.exports = ShopService;

const { Product } = require('../models');

class ProductService {
  static async createProduct(name, plu) {
    return await Product.create({ name, plu });
  }

}

module.exports = ProductService;

const ProductService = require('../services/productService');
const logHistory = require('../logger/historyLogger');
const { Product } = require('../models');

class ProductController {
  static async createProduct(req, res) {
    try {
      const { name, plu } = req.body;
      const product = await ProductService.createProduct(name, plu);

      const historyData = {
        plu: product.plu,
        shop_id: req.body.shop_id || 0,
        date: new Date(),
      };
      
      console.log('Logging history with data:', historyData);
      
      await logHistory('CREATE_PRODUCT', historyData);
      return res.status(201).json(product);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getProductByFilters(req, res) {
    try {
        const { name, plu } = req.query;
        let where = {};

        if (name) where.name = name;
        if (plu) where.plu = plu;

        const products = await Product.findAll({ where });
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
}

module.exports = ProductController;

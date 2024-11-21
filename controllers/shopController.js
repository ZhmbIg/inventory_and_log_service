const ShopService = require('../services/shopService');

class ShopController {
    static async createShop(req, res) {
        try {
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({ error: 'Name is required' });
            }

            const shop = await ShopService.createShop(name);

            return res.status(201).json(shop);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    static async getAllShops(req, res) {
        try {
            const shops = await ShopService.getAllShops();

            return res.status(200).json(shops);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ShopController;

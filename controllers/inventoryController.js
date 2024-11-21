const { Inventory, Product, Shop } = require('../models');
const logHistory = require('../logger/historyLogger');

class InventoryController {
    static async createInventory(req, res) {
        try {
            const { product_id, shop_id, quantity_on_shelf, quantity_in_order } = req.body;

            const product = await Product.findByPk(product_id);
            const shop = await Shop.findByPk(shop_id);
            if (!product || !shop) {
                return res.status(404).json({ error: 'Product or Shop not found' });
            }

            const inventory = await Inventory.create({
                product_id,
                shop_id,
                quantity_on_shelf,
                quantity_in_order,
            });

            const plu = product ? product.plu : null; 
            const oldQuantity = 0;
            const newQuantity = quantity_on_shelf + quantity_in_order;

            await logHistory('CREATE_STOCK', {
                plu,
                shop_id: inventory.shop_id,
                quantity_changed: newQuantity - oldQuantity,
                old_quantity: oldQuantity,
                new_quantity: newQuantity,
                date: new Date(),
            });

            return res.status(201).json(inventory);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async updateInventory(req, res) {
        try {
            const { id } = req.params;
            const { quantity_on_shelf, quantity_in_order } = req.body;

            const inventory = await Inventory.findByPk(id);
            if (!inventory) {
                return res.status(404).json({ error: 'Inventory not found' });
            }
            const product = await Product.findByPk(inventory.product_id);
            const plu = product ? product.plu : null;

            const oldQuantityOnShelf = inventory.quantity_on_shelf;
            const oldQuantityInOrder = inventory.quantity_in_order;
            const oldTotalQuantity = oldQuantityOnShelf + oldQuantityInOrder;

            const newQuantityOnShelf = parseInt(quantity_on_shelf) || 0;
            const newQuantityInOrder = parseInt(quantity_in_order) || 0;

            inventory.quantity_on_shelf += newQuantityOnShelf;
            inventory.quantity_in_order += newQuantityInOrder;

            await inventory.save();

            const newTotalQuantity = inventory.quantity_on_shelf + inventory.quantity_in_order;

            const logData = {
                plu: plu,
                shop_id: inventory.shop_id,
                quantity_changed: newTotalQuantity - oldTotalQuantity,
                old_quantity: oldTotalQuantity,
                new_quantity: newTotalQuantity,
                date: new Date(),
            };

            console.log('Log data before sending:', logData);

            try {
                await logHistory('UPDATE_STOCK', logData);
            } catch (error) {
                console.error('Failed to log history:', error.message);
            }

            return res.status(200).json(inventory);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async getInventories(req, res) {
        try {
            const { plu, shop_id, quantity_on_shelf_from, quantity_on_shelf_to, quantity_in_order_from, quantity_in_order_to } = req.query;

            const where = {};
            if (plu) where['$Product.plu$'] = plu;
            if (shop_id) where.shop_id = shop_id;
            if (quantity_on_shelf_from) where.quantity_on_shelf = { ...where.quantity_on_shelf, $gte: quantity_on_shelf_from };
            if (quantity_on_shelf_to) where.quantity_on_shelf = { ...where.quantity_on_shelf, $lte: quantity_on_shelf_to };
            if (quantity_in_order_from) where.quantity_in_order = { ...where.quantity_in_order, $gte: quantity_in_order_from };
            if (quantity_in_order_to) where.quantity_in_order = { ...where.quantity_in_order, $lte: quantity_in_order_to };

            const inventories = await Inventory.findAll({
                where,
                include: [Product, Shop],
            });

            return res.status(200).json(inventories);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = InventoryController;

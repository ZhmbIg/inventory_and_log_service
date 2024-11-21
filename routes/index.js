const express = require('express');
const ProductController = require('../controllers/productController');
const InventoryController = require('../controllers/inventoryController');
const ShopController = require('../controllers/shopController');
const HistoryController = require('../controllers/historyController')

const router = express.Router();

router.post('/products', ProductController.createProduct);
router.get('/products', ProductController.getProductByFilters);

router.post('/shops', ShopController.createShop);
router.get('/shops', ShopController.getAllShops);

router.post('/inventories', InventoryController.createInventory);
router.patch('/inventories/:id', InventoryController.updateInventory);
router.get('/inventories', InventoryController.getInventories);

router.post('/history', HistoryController.createHistory);
router.get('/history', HistoryController.getHistories);


module.exports = router;

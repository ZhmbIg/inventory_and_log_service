const { Histories } = require('../models');

class HistoryController {
  static async createHistory(req, res) {
    try {
      const { action, plu, shop_id, quantity_changed, old_quantity, new_quantity, date } = req.body;
      console.log('Received data:', req.body);

      if (!action || !plu || !shop_id || quantity_changed === undefined || old_quantity === undefined || new_quantity === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

      const history = await Histories.create({
        action,
        plu,
        shop_id,
        quantity_changed,
        old_quantity,
        new_quantity,
        date,
      });

      res.status(201).json(history);
    } catch (error) {
      console.error('Error in createHistory:', error.message);
      res.status(500).json({ error: error.message });
    }
  }

  static async getHistories(req, res) {
    try {
      const { shop_id, plu, action, startDate, endDate, page = 1, limit = 10 } = req.query;

      const filters = {};
      if (shop_id) filters.shop_id = shop_id;
      if (plu) filters.plu = plu;
      if (action) filters.action = action;
      if (startDate && endDate) {
        filters.date = { [Op.between]: [new Date(startDate), new Date(endDate)] };
      }

      const offset = (page - 1) * limit;
      const histories = await Histories.findAndCountAll({
        where: filters,
        offset,
        limit: parseInt(limit),
        order: [['date', 'DESC']],
      });

      return res.status(200).json({
        data: histories.rows,
        total: histories.count,
        page: parseInt(page),
        totalPages: Math.ceil(histories.count / limit),
      });
    } catch (error) {
      console.error('Error in getHistories:', error.message);
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = HistoryController;

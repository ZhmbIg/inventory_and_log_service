const db = require('../models');

class HistoryService {
  static async getHistory({ shop_id, plu, startDate, endDate, action, page = 1, limit = 10 }) {
    const where = {};

    if (shop_id) where.shop_id = shop_id;
    if (plu) where.plu = plu;
    if (startDate && endDate) where.date = { [Op.between]: [startDate, endDate] };
    if (action) where.action = action;

    const history = await db.History.findAll({
      where,
      limit,
      offset: (page - 1) * limit,
      order: [['date', 'DESC']],
    });

    return history;
  }
}

module.exports = HistoryService;

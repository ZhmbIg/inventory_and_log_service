const axios = require('axios');

const historyServiceUrl = 'http://localhost:4000/api/history';

async function logHistory(action, data) {
  try {
    console.log('Sending log data:', {
      action,
      ...data,
    });

    await axios.post(historyServiceUrl, {
      action,
      ...data,
    });
  } catch (error) {
    console.error('Failed to log history:', error.message);
  }
}


module.exports = logHistory;

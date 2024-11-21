const express = require('express');
const app = express();
const port = 3001;
const router = require('../routes/index.js');

app.use(express.json());

app.use('/api', router);

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});

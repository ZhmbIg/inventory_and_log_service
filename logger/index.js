const express = require('express');
const app = express();
const port = 4000;
const router = require('../routes/index');

app.use(express.json());

app.use('/api', router);

app.listen(port, () => {
  console.log(`History service is running on http://localhost:${port}`);
});

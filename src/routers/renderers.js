const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/database', (req, res) => {
  res.render('database');
});

module.exports = router;

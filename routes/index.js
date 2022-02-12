const express = require('express');
const router = express.Router();

// @desc    Login / Landing page
// @route   GET /
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');
});

module.exports = router;

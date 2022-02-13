const express = require('express');
const passport = require('passport');
const router = express.Router();

// @desc    Login / Landing page
// @route   GET /
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// @desc    Dashboard
// @route   GET /dashboard
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/dashboard');
    }
);

module.exports = router;

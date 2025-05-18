const express = require('express');
const passport = require('passport');
const router = express.Router();

// Login with Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: 'https://event-frontend-hkq4.onrender.com',
    failureRedirect: 'https://event-frontend-hkq4.onrender.com/login',
  })
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('https://event-frontend-hkq4.onrender.com');
  });
});

module.exports = router;

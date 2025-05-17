const express = require("express");
const passport = require("passport");
const router = express.Router();

// Login
router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

// Callback
router.get("/google/callback", passport.authenticate("google", {
  failureRedirect: `${process.env.FRONTEND_URL}/login`,
  successRedirect: `${process.env.FRONTEND_URL}/dashboard`
}));

// Current user
router.get("/me", (req, res) => {
  res.send(req.user);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect(process.env.FRONTEND_URL);
  });
});

module.exports = router;

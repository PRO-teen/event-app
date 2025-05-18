// routes/auth.js
const express = require("express");
const passport = require("passport");

const router = express.Router();

// Login with Google
router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback URL
router.get("/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://event-frontend-hkq4.onrender.com/login",
    session: true
  }),
  (req, res) => {
    // Redirect after successful login
    res.redirect("https://event-frontend-hkq4.onrender.com/my-courses");
  }
);

// Logout route
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("https://event-frontend-hkq4.onrender.com/");
  });
});

// Get logged-in user data
router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ user: null });
  }
});

module.exports = router;

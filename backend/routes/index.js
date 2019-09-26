const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// Welcome Page
router.get("/", forwardAuthenticated, (req, res) => {
  console.log("Homepage");
});

// Dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) =>
  console.log("Dashboard")
);

module.exports = router;

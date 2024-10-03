const express = require("express");
const {
  getRegisterPage,
  registerUser,
  getLoginPage,
  loginUser,
} = require("../controllers/authController");

const router = express.Router();

// Register routes
router.get("/register", getRegisterPage);
router.post("/register", registerUser);

// Login routes
router.get("/login", getLoginPage);
router.post("/login", loginUser);

module.exports = router;

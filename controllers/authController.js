const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Render register page
const getRegisterPage = (req, res) => {
  res.render("register");
};

// Register user logic
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.render("register", { message: "User already exists" });
    }

    const user = new User({ username, email, password });
    await user.save();
    res.redirect("/api/auth/login");
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Render login page
const getLoginPage = (req, res) => {
  res.render("login");
};

// Login user logic
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("login", { message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", { message: "Invalid credentials" });
    }

    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getRegisterPage,
  registerUser,
  getLoginPage,
  loginUser,
};

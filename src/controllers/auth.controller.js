// src/controllers/auth.controller.js
const User = require("../models/user.model");
const authService = require("../services/auth.service");

/**
 * Register (dev-friendly)
 * - If email already exists, return tokens for that user (idempotent behavior for dev/testing)
 * - Otherwise create user, hash password (handled in model), return tokens
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email & Password required" });
    }

    const normalizedEmail = email.toLowerCase();
    const existing = await User.findOne({ email: normalizedEmail });

    if (existing) {
      // DEV MODE: return tokens for existing user so register is idempotent during development
      const tokens = authService.generateTokens(existing);
      return res.status(200).json({
        user: {
          id: existing._id,
          name: existing.name,
          email: existing.email,
          phone: existing.phone
        },
        tokens,
        note: "Existing user — returned tokens (dev mode)"
      });
    }

    const user = new User({
      name,
      email: normalizedEmail,
      password,
      phone
    });

    await user.save();

    const tokens = authService.generateTokens(user);

    return res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      },
      tokens
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * Login
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "email and password required" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const match = await user.comparePassword(password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const tokens = authService.generateTokens(user);

    return res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      },
      tokens
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * Refresh token
 */
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: "refreshToken required" });

    const tokens = await authService.refreshTokens(refreshToken);
    if (!tokens) return res.status(401).json({ error: "Invalid refresh token" });

    return res.json(tokens);
  } catch (err) {
    console.error("Refresh token error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

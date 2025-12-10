const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/user.model");

async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({ error: "Invalid token format" });
    }

    let payload;
    try {
      payload = jwt.verify(token, config.jwtSecret);
    } catch (e) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    const user = await User.findById(payload.sub).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    return res.status(500).json({ error: "Auth middleware failed" });
  }
}

module.exports = { authMiddleware };

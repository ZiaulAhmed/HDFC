const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/user.model");

function generateTokens(user) {
  const accessToken = jwt.sign(
    { sub: user._id.toString(), email: user.email },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );

  const refreshToken = jwt.sign(
    { sub: user._id.toString() },
    config.jwtRefreshSecret,
    { expiresIn: config.refreshExpiresIn }
  );

  return { accessToken, refreshToken };
}

async function refreshTokens(refreshToken) {
  try {
    const payload = jwt.verify(refreshToken, config.jwtRefreshSecret);
    const user = await User.findById(payload.sub);
    if (!user) return null;

    return generateTokens(user);
  } catch {
    return null;
  }
}

module.exports = { generateTokens, refreshTokens };

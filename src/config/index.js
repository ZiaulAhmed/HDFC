// src/config/index.js
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/kyc_mvp",
  jwtSecret: process.env.JWT_SECRET || "change_this_secret",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "change_refresh_secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "15m",
  refreshExpiresIn: process.env.REFRESH_EXPIRES_IN || "7d",
  imagekit: { publicKey: process.env.IMAGEKIT_PUBLIC_KEY, privateKey: process.env.IMAGEKIT_PRIVATE_KEY, urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT },
  notification: { provider: process.env.NOTIFICATION_PROVIDER || "console" }
};
////abcde:PZUu4k6T9ObWfBQe@cluster0.7li2vre.mongodb.net/?appName=Cluster0

const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

// route imports
const authRoutes = require("./routes/auth.routes");
const kycRoutes = require("./routes/kyc.routes");
const eligibilityRoutes = require("./routes/eligibility.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const { authMiddleware } = require("./middlewares/auth.middleware");

const app = express();

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

// attach routes

app.use("/api/kyc", kycRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/kyc", kycRoutes);
app.use("/api/eligibility", eligibilityRoutes);
app.use("/api/analytics", analyticsRoutes);

// root and health
app.get("/", (req, res) => {
  res.json({ status: "DigitalKYC backend", env: process.env.NODE_ENV || "development" });
});
app.get("/health", (req, res) => res.json({ ok: true }));

// small protected test endpoint
app.get("/api/me", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// global error handler (must be after routes)
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Internal Server Error" });
});

module.exports = app;

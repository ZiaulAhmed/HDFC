const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analytics.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

router.post("/record", authMiddleware, analyticsController.recordEvent);
router.get("/funnel", authMiddleware, analyticsController.funnel);

module.exports = router;

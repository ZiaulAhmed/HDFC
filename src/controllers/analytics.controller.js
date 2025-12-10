const analyticsService = require("../services/analytics.service");

exports.recordEvent = async (req, res) => {
  const e = await analyticsService.record({
    ...req.body,
    userId: req.user._id
  });
  res.status(201).json(e);
};

exports.funnel = async (req, res) => {
  const stats = await analyticsService.funnelStats(req.query);
  res.json(stats);
};

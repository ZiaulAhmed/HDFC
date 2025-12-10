const eligibilityService = require("../services/eligibility.service");

exports.check = async (req, res) => {
  const result = await eligibilityService.checkEligibility(req.body);
  res.json(result);
};

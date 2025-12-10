const express = require("express");
const router = express.Router();
const EligibilityController = require("../controllers/eligibility.controller");

router.post("/check", EligibilityController.check);

module.exports = router;

const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth.middleware");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const KycController = require("../controllers/kyc.controller");

router.post("/start", authMiddleware, KycController.startSession);
router.post("/step/:sessionId/:stepName", authMiddleware, KycController.updateStep);
router.post("/upload/:sessionId", authMiddleware, upload.single("image"), KycController.uploadImage);
router.get("/resume/:sessionId", authMiddleware, KycController.resumeSession);
router.post("/complete/:sessionId", authMiddleware, KycController.completeSession);

module.exports = router;

const sessionService = require("../services/session.service");
const imageService = require("../services/image.service");
const analyticsService = require("../services/analytics.service");

exports.startSession = async (req, res) => {
  const session = await sessionService.createSession(req.user, req.body.initialData || {});
  await analyticsService.record({ eventType: "session_start", sessionId: session.sessionId, userId: req.user._id });
  res.status(201).json(session);
};

exports.updateStep = async (req, res) => {
  const session = await sessionService.updateStep(
    req.user,
    req.params.sessionId,
    req.params.stepName,
    { data: req.body.data, status: req.body.status }
  );
  await analyticsService.record({
    eventType: req.body.status === "completed" ? "step_complete" : "step_update",
    sessionId: req.params.sessionId,
    userId: req.user._id,
    stepName: req.params.stepName
  });
  res.json(session);
};

exports.uploadImage = async (req, res) => {
  const image = await imageService.uploadBuffer(req.file, { filename: req.file.originalname });
  await sessionService.attachImage(req.params.sessionId, image._id);
  await analyticsService.record({ eventType: "image_uploaded", sessionId: req.params.sessionId, userId: req.user._id });
  res.status(201).json(image);
};

exports.resumeSession = async (req, res) => {
  const session = await sessionService.getSessionForResume(req.user, req.params.sessionId);
  res.json(session);
};

exports.completeSession = async (req, res) => {
  const session = await sessionService.markComplete(req.params.sessionId);
  await analyticsService.record({ eventType: "session_complete", sessionId: req.params.sessionId, userId: req.user._id });
  res.json(session);
};
 
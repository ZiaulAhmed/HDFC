const KycSession = require("../models/kycSession.model");
const Image = require("../models/image.model");
const { v4: uuidv4 } = require("uuid");

exports.createSession = async (user, initialData = {}) => {
  const session = new KycSession({
    userId: user._id,
    sessionId: uuidv4(),
    currentStep: initialData.startStep || "eligibility",
    steps: [],
    lastActiveAt: new Date()
  });

  if (initialData.firstStepData) {
    session.steps.push({
      stepName: session.currentStep,
      data: initialData.firstStepData,
      startedAt: new Date()
    });
  }

  await session.save();
  return session;
};

exports.updateStep = async (user, sessionId, stepName, { data, status }) => {
  const session = await KycSession.findOne({ sessionId, userId: user._id });
  if (!session) throw { status: 404, message: "Session not found" };

  let step = session.steps.find(s => s.stepName === stepName);
  
  if (!step) {
    step = { stepName, status, data, startedAt: new Date() };
    session.steps.push(step);
  }

  step.data = data;
  step.status = status;
  if (status === "completed") step.completedAt = new Date();

  session.currentStep = status === "completed" ? null : stepName;
  session.lastActiveAt = new Date();

  await session.save();
  return session;
};

exports.attachImage = async (sessionId, imageId) => {
  const session = await KycSession.findOne({ sessionId });
  if (!session) throw { status: 404, message: "Session not found" };

  session.images.push(imageId);
  session.lastActiveAt = new Date();
  await session.save();
};

exports.getSessionForResume = async (user, sessionId) => {
  const session = await KycSession.findOne({ sessionId, userId: user._id }).populate("images");
  if (!session) throw { status: 404, message: "Session not found" };
  return session;
};

exports.markComplete = async (sessionId) => {
  const session = await KycSession.findOne({ sessionId });
  if (!session) throw { status: 404, message: "Session not found" };

  session.status = "completed";
  session.updatedAt = new Date();
  await session.save();
  return session;
};

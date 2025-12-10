const mongoose = require("mongoose");

const stepSchema = new mongoose.Schema({
  stepName: String,
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  startedAt: Date,
  completedAt: Date,
  data: mongoose.Schema.Types.Mixed
});

const kycSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  sessionId: { type: String, unique: true, index: true },
  currentStep: String,
  steps: [stepSchema],
  eligibility: {
    eligible: { type: Boolean, default: null },
    reasons: [String]
  },
  images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
  status: { type: String, enum: ["in-progress", "completed", "abandoned", "failed"], default: "in-progress" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  lastActiveAt: Date
});

module.exports = mongoose.model("KycSession", kycSessionSchema);

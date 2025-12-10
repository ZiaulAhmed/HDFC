const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventType: String,
  sessionId: String,
  userId: mongoose.Schema.Types.ObjectId,
  stepName: String,
  payload: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Event", eventSchema);

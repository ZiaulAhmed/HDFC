const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  filename: String,
  url: String,
  provider: String,
  uploadedAt: { type: Date, default: Date.now },
  metadata: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model("Image", imageSchema);

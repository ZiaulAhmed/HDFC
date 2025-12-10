const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  phone: { type: String },
  password: { type: String, required: true },
  metadata: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now }
});

// Hash Password
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare Password
userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

// Prevent OverwriteModelError
module.exports = mongoose.models.User || mongoose.model("User", userSchema);

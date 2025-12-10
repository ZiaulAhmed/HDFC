// scripts/delete-user.js
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../src/models/user.model");

async function run() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connected to MongoDB");
  const email = process.argv[2];
  if (!email) {
    console.error("Usage: node scripts/delete-user.js email@example.com");
    process.exit(1);
  }
  const res = await User.deleteMany({ email: email.toLowerCase() });
  console.log("Deleted count:", res.deletedCount);
  await mongoose.disconnect();
}
run().catch(err => { console.error(err); process.exit(1); });

// src/server.js
const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config");

const PORT = config.port || 4000;

async function start() {
  try {
    await mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start:", err);
    process.exit(1);
  }
}
app.use('/api/kyc', require('./routes/kyc.routes'));

start();

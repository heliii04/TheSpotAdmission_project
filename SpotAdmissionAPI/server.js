const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = require("./app");
const sendEmail = require("./utils/emailService");

// ✅ Load environment variables first
dotenv.config();

// ✅ Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

// 6. Server Start
const server = app.listen(PORT, async () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  // ✅ Verify Email configuration on startup
  await sendEmail.verifyEmailConfig();
});

// ✅ Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`❌ Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// ✅ Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`❌ Uncaught Exception: ${err.message}`);
  process.exit(1);
});

const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = require("./app");

// ✅ Load environment variables first
dotenv.config();

// ✅ Connect to MongoDB
connectDB();

// 6. Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

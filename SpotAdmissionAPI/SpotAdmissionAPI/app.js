const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const errorHandler = require("./middleware/errorHandler");

// Route imports
const authRoutes = require("./routes/authRoutes");
const schoolRoutes = require("./routes/schoolRoutes");
const collegeRoutes = require("./routes/collegeRoutes");
const counsellingRoutes = require("./routes/counsellingRoutes");
const admissionRoutes = require("./routes/admissionRoutes");
const videoRoutes = require("./routes/videoRoutes");
const podcastRoutes = require("./routes/podcastRoutes");
const contentRoutes = require("./routes/contentRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const contactRoutes = require("./routes/contactRoutes");
const careerFormRoutes = require("./routes/careerFormRoutes");
const admissionFormRoutes = require("./routes/admissionFormRoutes");
const counselingFormRoutes = require("./routes/counselingFormRoutes");
const personalizedCounselingRoutes = require("./routes/PersonalizedCounselingRoute");
const prePrimaryRoutes = require("./routes/prePrimaryRoutes");

const app = express();

// Middlewares
app.use(helmet()); 
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

// Rate Limiting (Brute force protection)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: "Too many requests from this IP, please try again later.",
});
app.use("/auth/login", limiter);

app.get("/", (req, res) => res.send("The Spot Admission API is running"));

// Routes
app.use("/auth", authRoutes);
app.use("/", schoolRoutes);
app.use("/", collegeRoutes);
app.use("/", counsellingRoutes);
app.use("/", admissionRoutes);
app.use("/", videoRoutes);
app.use("/", podcastRoutes);
app.use("/", contentRoutes);
app.use("/", testimonialRoutes);
app.use("/", contactRoutes);
app.use("/careerform", careerFormRoutes);
app.use("/admissionform", admissionFormRoutes);
app.use("/counselingform", counselingFormRoutes);
app.use("/personalizedcounselingform", personalizedCounselingRoutes);
app.use("/preprimaryform", prePrimaryRoutes);

// Error Handler
app.use(errorHandler);

module.exports = app;

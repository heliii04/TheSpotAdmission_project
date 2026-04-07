const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const errorHandler = require('./middleware/errorHandler');

// ✅ Load environment variables first
dotenv.config();

// ✅ Connect to MongoDB
connectDB();

// 3. Initialize Express APP (Ye line sabse upar honi chahiye middleware se pehle)
const app = express();

// 4. Middlewares
app.use(cors({
    origin: "http://localhost:5173", // Aapka frontend URL
    credentials: true
}));
app.use(express.json()); // Body parser

// Route imports
const authRoutes = require('./routes/authRoutes');
const schoolRoutes = require('./routes/schoolRoutes');
const collegeRoutes = require('./routes/collegeRoutes');
const counsellingRoutes = require('./routes/counsellingRoutes');
const admissionRoutes = require('./routes/admissionRoutes');
const videoRoutes = require('./routes/videoRoutes');
const podcastRoutes = require('./routes/podcastRoutes');
const contentRoutes = require('./routes/contentRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const contactRoutes = require("./routes/contactRoutes");;
const careerFormRoutes = require("./routes/careerFormRoutes");
const admissionFormRoutes = require("./routes/admissionFormRoutes");
const counselinFormgRoutes  = require("./routes/admissionFormRoutes");
const personalizedCounselingRoutes  = require("./routes/PersonalizedCounselingRoute");
const prePrimaryRoutes = require("./routes/prePrimaryRoutes");

app.get('/', (req, res) => res.send('The Spot Admission API is running'));
// ✅ Routes (add your API routes here)
app.use('/auth', authRoutes);
app.use('/', schoolRoutes);
app.use('/', collegeRoutes);
app.use('/', counsellingRoutes);
app.use('/', admissionRoutes);
app.use('/', videoRoutes);
app.use('/ ', podcastRoutes);
app.use('/ ', contentRoutes);
app.use('/ ', testimonialRoutes);
app.use('/', contactRoutes);
app.use("/careerform", careerFormRoutes);
app.use("/admissionform", admissionFormRoutes);
app.use("/counselingform", counselinFormgRoutes);
app.use("/personalizedcounselingform", personalizedCounselingRoutes);
app.use("/preprimaryform", prePrimaryRoutes);

// ✅ Error Handler
app.use(errorHandler);

// 6. Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
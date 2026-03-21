const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');


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
// ✅ Load environment variables first
dotenv.config();

// ✅ Connect to MongoDB
connectDB();

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// 30 days token for Login
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

exports.register = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) { res.status(400); throw new Error('User already exists'); }
    const user = await User.create({ name, email, password, role });
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) });
});

exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) });
    } else {
        res.status(401); throw new Error('Invalid email or password');
    }
});

exports.getProfile = asyncHandler(async (req, res) => { res.json(req.user); });

// --- IMPROVED FORGOT PASSWORD ---
exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  
  if (!user) {
    res.status(404);
    throw new Error("User not found with this email");
  }

  // Token specifically for Password Reset (Short lived)
  const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS 
    }
  });

  const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

  const mailOptions = {
    from: `"The Spot Admission" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2>Password Reset</h2>
        <p>Aapne "The Spot Admission" portal ke liye password reset request ki hai.</p>
        <p>Niche diye gaye button par click karke apna password badlein:</p>
        <a href="${resetLink}" style="background: #6366F1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
        <p>Ye link 15 minutes mein expire ho jayega.</p>
        <hr />
        <p style="font-size: 12px; color: #888;">Agar aapne ye request nahi ki, toh is email ko ignore karein.</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
  res.status(200).json({ success: true, message: "Reset link sent to your email" });
});

// --- IMPROVED RESET PASSWORD ---
exports.resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Password hashing handling:
    // Agar aapka User Model mein "pre-save" hook hai toh ye automatically hash ho jayega
    user.password = password; 
    await user.save();

    res.status(200).json({ success: true, message: "Password updated successfully!" });
  } catch (error) {
    res.status(400);
    throw new Error("Link expired or invalid token.");
  }
});
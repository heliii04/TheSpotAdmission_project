const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/emailService');
const crypto = require('crypto');

const generateSecurePassword = (length = 12) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    const digits = "0123456789";
    const symbols = "!@#$%^&*()_+";
    
    let retVal = "";
    // Ensure at least one digit and one symbol using crypto for better randomness
    const randomBytes = crypto.randomBytes(length);
    retVal += digits[randomBytes[0] % digits.length];
    retVal += symbols[randomBytes[1] % symbols.length];
    
    for (let i = 2; i < length; ++i) {
        retVal += charset[randomBytes[i] % charset.length];
    }
    
    return retVal.split('').sort(() => 0.5 - Math.random()).join('');
};

// 30 days token for Login
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

exports.register = asyncHandler(async (req, res) => {
    const { name, role } = req.body;
    let { email, password } = req.body;
    
    if (!email) {
        res.status(400);
        throw new Error("Email is required.");
    }

    email = email.toLowerCase();
    const userExists = await User.findOne({ email });
    
    if (userExists) {
        // "Second time" logic: only send a "Registration Successful" notice, no password
        await sendEmail({
            email: userExists.email,
            subject: 'Confirmation: Application Received!',
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2>Hello, ${userExists.name}!</h2>
                    <p>We've received your recent application/registration. Since you already have an account, you can continue using your existing credentials to track your status.</p>
                    <p>Login here: <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/login">Dashboard Login</a></p>
                </div>
            `
        });
        return res.status(200).json({ 
            message: "Registration successful. Since you already have an account, please login with your existing password.",
            alreadyExists: true 
        });
    }
    
    // "First time" logic: Generate password
    if (!password) {
        password = generateSecurePassword(12);
    } else {
        // Validate manual password if provided
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]{8,15}$/;
        if (!passwordRegex.test(password)) {
            res.status(400);
            throw new Error("Password must be 8-15 characters and include at least one digit and one symbol.");
        }
    }

    const assignedRole = ['admin', 'counsellor'].includes(role) ? 'student' : (role || 'student');
    const user = await User.create({ name, email, password, role: assignedRole });

    // Send Welcome Email with Credentials
    try {
        await sendEmail({
            email: user.email,
            subject: 'Welcome! Your Login Credentials',
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #6366F1;">Welcome, ${name}!</h2>
                    <p>Your account has been successfully created. Here are your login credentials:</p>
                    <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Password:</strong> <span style="color: #6366F1; font-weight: bold;">${password}</span></p>
                    </div>
                    <p>Please use these details to login and track your admission progress.</p>
                    <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/login" style="display: inline-block; background: #6366F1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Login Now</a>
                    <hr />
                    <p style="font-size: 11px; color: #888;">For security, we recommend changing your password after your first login.</p>
                </div>
            `
        });
    } catch (emailError) {
        console.error("Welcome email failed to send:", emailError.message);
    }

    res.status(201).json({ 
        _id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role, 
        token: generateToken(user._id),
        message: "Registration successful. Credentials sent to your email."
    });
});

exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide email and password');
    }

    // Case-insensitive email search
    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

exports.getProfile = asyncHandler(async (req, res) => { res.json(req.user); });

// --- IMPROVED FORGOT PASSWORD ---
exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });
  
  if (!user) {
    res.status(404);
    throw new Error("User not found with this email");
  }

  // Token specifically for Password Reset (Short lived)
  const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

  const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

  const htmlContent = `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2>Password Reset</h2>
        <p>Aapne "The Spot Admission" portal ke liye password reset request ki hai.</p>
        <p>Niche diye gaye button par click karke apna password badlein:</p>
        <a href="${resetLink}" style="background: #6366F1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
        <p>Ye link 15 minutes mein expire ho jayega.</p>
        <hr />
        <p style="font-size: 12px; color: #888;">Agar aapne ye request nahi ki, toh is email ko ignore karein.</p>
      </div>
    `;

  await sendEmail({
    email: user.email,
    subject: 'Password Reset Request',
    html: htmlContent
  });
  
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
    user.password = password; 
    await user.save();

    res.status(200).json({ success: true, message: "Password updated successfully!" });
  } catch (error) {
    res.status(400);
    throw new Error("Link expired or invalid token.");
  }
});

exports.getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password');
    res.json(users);
});

exports.deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    if (user.role === 'admin') {
        res.status(400);
        throw new Error("Cannot delete an admin user");
    }
    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
});

exports.updateUserRole = asyncHandler(async (req, res) => {
    const { role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    user.role = role || user.role;
    await user.save();
    res.json({ message: "User role updated", user });
});

// --- ADMIN: MANAGE TEAM (Add Counsellor/Staff) ---
exports.addTeamMember = asyncHandler(async (req, res) => {
    const { name, email, role, phone } = req.body;
    
    if (!['admin', 'counsellor'].includes(role)) {
        res.status(400);
        throw new Error("Invalid team role. Must be admin or counsellor.");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User with this email already exists.");
    }

    // Auto-generate secure password for team member
    const password = generateSecurePassword(14);

    const user = await User.create({
        name,
        email,
        password,
        role,
        phone
    });

    // Send specialized email to team member
    try {
        await sendEmail({
            to: user.email,
            subject: `Welcome to the Team! [${role.toUpperCase()}]`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #6366F1; border-radius: 10px;">
                    <h2 style="color: #6366F1;">Hello, ${name}!</h2>
                    <p>You have been added as a <strong>${role}</strong> to "The Spot Admission" team.</p>
                    <p>Here are your administrative login credentials:</p>
                    <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #6366F1;">
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Password:</strong> <span style="font-family: monospace; font-size: 1.2em;">${password}</span></p>
                    </div>
                    <p>You can access the admin dashboard here: <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/login">Staff Portal</a></p>
                </div>
            `
        });
    } catch (e) { console.error("Team email failed:", e.message); }

    res.status(201).json({
        success: true,
        message: "Team member added successfully and credentials sent.",
        user: { _id: user._id, name: user.name, email: user.email, role: user.role }
    });
});

exports.updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.phone = req.body.phone || user.phone;
        
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            phone: updatedUser.phone,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

module.exports = {
  register: exports.register,
  login: exports.login,
  getProfile: exports.getProfile,
  updateProfile: exports.updateProfile,
  forgotPassword: exports.forgotPassword,
  resetPassword: exports.resetPassword,
  getUsers: exports.getUsers,
  deleteUser: exports.deleteUser,
  updateUserRole: exports.updateUserRole,
  addTeamMember: exports.addTeamMember
};

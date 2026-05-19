const User = require('../models/User');
const crypto = require('crypto');

/**
 * Generates a secure random password satisfying the 8-15 char policy with digits and symbols.
 */
const generateSecurePassword = (length = 12) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let retVal = "";
    // Fill with random chars
    for (let i = 0; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    // Ensure complexity requirements
    if (!/\d/.test(retVal)) {
        retVal = retVal.substring(0, length - 1) + (Math.floor(Math.random() * 10)).toString();
    }
    const symbols = "!@#$%^&*";
    if (!/[!@#$%^&*]/.test(retVal)) {
        retVal = retVal.substring(0, length - 2) + symbols.charAt(Math.floor(Math.random() * symbols.length)) + retVal.substring(length - 1);
    }
    
    return retVal;
};

/**
 * Checks if a user exists, if not, creates one.
 * Returns { user, password, isNew }
 */
const autoRegisterUser = async (name, email, phone) => {
    if (!email) return { user: null, isNew: false };
    
    const normalizedEmail = email.toLowerCase();
    let user = await User.findOne({ email: normalizedEmail });
    
    if (user) {
        return { user, isNew: false };
    }

    const password = generateSecurePassword(12);
    user = await User.create({
        name: name || 'New Student',
        email: normalizedEmail,
        password: password, // userSchema pre('save') hashes this
        phone: phone || '',
        role: 'student'
    });

    return { user, password, isNew: true };
};

const getCredentialsBlock = (email, password) => {
    const loginUrl = process.env.CLIENT_URL || 'http://localhost:5173/login';
    return `
        <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border-left: 4px solid #6366F1; margin: 25px 0; font-family: sans-serif;">
            <h4 style="margin-top: 0; color: #1e293b; display: flex; align-items: center; gap: 8px;">
                🔐 Login Credentials
            </h4>
            <p style="margin: 5px 0; font-size: 14px; color: #64748b;">A dashboard has been created for you to track your application status:</p>
            <div style="margin-top: 15px;">
                <p style="margin: 8px 0; font-size: 15px;"><strong>Email:</strong> <span style="color: #334155;">${email}</span></p>
                <p style="margin: 8px 0; font-size: 15px;"><strong>Password:</strong> <span style="font-family: monospace; color: #6366F1; font-weight: bold; font-size: 1.1em; background: #eef2ff; padding: 2px 6px; border-radius: 4px;">${password}</span></p>
            </div>
            <a href="${loginUrl}" style="display: inline-block; margin-top: 18px; background: #6366F1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.2);">Login to Dashboard</a>
            <p style="margin-top: 15px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; pt: 10px;">For security, we recommend changing your password after your first login.</p>
        </div>
    `;
};

module.exports = { autoRegisterUser, getCredentialsBlock };

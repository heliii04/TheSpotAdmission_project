require('dotenv').config();
const sendEmail = require('./utils/emailService');

const testEmail = async () => {
    console.log("--- Starting Email Test ---");
    console.log(`Primary Service: ${process.env.EMAIL_SERVICE || 'gmail'}`);
    console.log(`Fallback Service: ${process.env.FALLBACK_SERVICE || 'outlook'}`);
    console.log(`Sending to: ${process.env.EMAIL_USER}`);

    try {
        await sendEmail({
            email: process.env.EMAIL_USER,
            subject: "Test Email from The Spot Admission",
            message: "If you see this, your email SMTP configuration is working perfectly!",
            html: "<h1>Success!</h1><p>Your email SMTP configuration is working perfectly!</p>"
        });
        console.log("✅ SUCCESS: Email sent successfully!");
    } catch (error) {
        console.error("❌ FAILURE: Email could not be sent.");
        console.error("Error details:", error.message);
    }
};

testEmail();

const nodemailer = require('nodemailer');

/**
 * Creates a transporter based on the service name
 */
const createTransporter = (service) => {
  // 1. Support generic SMTP (host, port, secure) from environment variables or custom service format
  if (process.env.SMTP_HOST || (service && service.includes('.'))) {
    const host = process.env.SMTP_HOST || service;
    const port = parseInt(process.env.SMTP_PORT || '587');
    const secure = process.env.SMTP_SECURE === 'true' || port === 465;
    
    console.log(`Setting up custom SMTP: ${host}:${port} (secure: ${secure})`);
    return nodemailer.createTransport({
      host: host,
      port: port,
      secure: secure,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  // 2. Predefined services
  if (service === 'resend' || service === 'smtp.resend.com') {
    return nodemailer.createTransport({
      host: 'smtp.resend.com',
      port: 465,
      secure: true,
      auth: {
        user: 'resend',
        pass: process.env.RESEND_API_KEY
      }
    });
  } else if (service === 'outlook' || service === 'smtp-mail.outlook.com') {
    return nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      secure: false, // TLS
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
      }
    });
  } else if (service === 'gmail' || service === 'smtp.gmail.com') {
    // Using nodemailer's built-in service configuration for Gmail is extremely robust
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  } else {
    // Default fallback using standard service
    return nodemailer.createTransport({
      service: service || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
};

/**
 * Send an email with automatic fallback if the primary service fails
 * @param {Object} options - { email, subject, message, html }
 */
const sendEmail = async (options) => {
  const primaryService = process.env.EMAIL_SERVICE || 'gmail';
  const fallbackService = process.env.FALLBACK_SERVICE || 'outlook';

  const fromEmail = process.env.SENDER_EMAIL || process.env.EMAIL_USER;
  const mailOptions = {
    from: `"${process.env.FROM_NAME || 'The Spot Admission'}" <${fromEmail}>`,
    to: options.to || options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  try {
    // Try primary service
    console.log(`Attempting to send email via primary service: ${primaryService}`);
    const transporter = createTransporter(primaryService);
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully via ${primaryService}`);
  } catch (error) {
    console.error(`Primary service (${primaryService}) failed: ${error.message}`);
    
    // Attempt fallback
    if (fallbackService && fallbackService !== primaryService) {
      try {
        console.log(`Attempting fallback service: ${fallbackService}`);
        const fallbackTransporter = createTransporter(fallbackService);
        await fallbackTransporter.sendMail(mailOptions);
        console.log(`Email sent successfully via fallback: ${fallbackService}`);
      } catch (fallbackError) {
        console.error(`Fallback service (${fallbackService}) also failed: ${fallbackError.message}`);
        throw new Error('All email services failed. Please check SMTP configuration.');
      }
    } else {
      throw error;
    }
  }
};

// ✅ Verification function to check configuration status on server startup
sendEmail.verifyEmailConfig = async () => {
  const primaryService = process.env.EMAIL_SERVICE || 'gmail';
  const fallbackService = process.env.FALLBACK_SERVICE || 'outlook';

  console.log("🔍 Checking Email SMTP Service status...");

  try {
    const transporter = createTransporter(primaryService);
    // transporter.verify() checks if the connection is authenticated and ready
    await transporter.verify();
    console.log(`✅ EMAIL SERVICE STATUS: Primary Service (${primaryService}) is CONNECTED and ready!`);
    return { success: true, service: primaryService };
  } catch (error) {
    console.log(`⚠️ EMAIL SERVICE STATUS: Primary Service (${primaryService}) connection FAILED: ${error.message}`);
    
    if (fallbackService && fallbackService !== primaryService) {
      try {
        console.log(`🔄 Attempting fallback service connection: ${fallbackService}...`);
        const fallbackTransporter = createTransporter(fallbackService);
        await fallbackTransporter.verify();
        console.log(`✅ EMAIL SERVICE STATUS: Fallback Service (${fallbackService}) is CONNECTED and ready!`);
        return { success: true, service: fallbackService };
      } catch (fallbackError) {
        console.log(`❌ EMAIL SERVICE STATUS: Fallback Service (${fallbackService}) connection FAILED: ${fallbackError.message}`);
        console.log(`❌ EMAIL SERVICE STATUS: Both email services are OFFLINE. Please check your credentials.`);
        return { success: false, error: 'All email services offline' };
      }
    } else {
      console.log(`❌ EMAIL SERVICE STATUS: EMAIL SERVICE IS OFFLINE. Please check your credentials.`);
      return { success: false, error: error.message };
    }
  }
};

module.exports = sendEmail;

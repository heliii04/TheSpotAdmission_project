const nodemailer = require('nodemailer');

/**
 * Creates a transporter based on the service name
 */
const createTransporter = (service) => {
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
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  } else {
    // Default fallback
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

  const mailOptions = {
    from: `"${process.env.FROM_NAME || 'The Spot Admission'}" <${process.env.EMAIL_USER}>`,
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

module.exports = sendEmail;

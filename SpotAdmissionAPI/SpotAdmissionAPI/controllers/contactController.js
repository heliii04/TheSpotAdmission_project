const asyncHandler = require("express-async-handler");
const Contact = require("../models/Contact");
const sendEmail = require("../utils/emailService");

// 📩 Create a new contact
exports.createContact = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, service, preferredTime, message } = req.body;

  // Validation
  if (!name || !email || !phone || !message) {
    res.status(400);
    throw new Error("Please provide all required fields: name, email, phone, and message.");
  }

  const contact = new Contact({
    name,
    email,
    phone,
    subject,
    service,
    preferredTime,
    message,
  });

  const createdContact = await contact.save();

  // Send Email to Admin
  try {
    await sendEmail({
      email: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Contact Form: ${subject}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });

    // Send Confirmation to User
    await sendEmail({
      email: email,
      subject: "We received your message - The Spot Admission",
      html: `
        <h3>Hello ${name},</h3>
        <p>Thank you for contacting us. We have received your message regarding "${subject}" and will get back to you shortly.</p>
        <br/>
        <p>Regards,</p>
        <p>The Spot Admission Team</p>
      `
    });
  } catch (emailError) {
    console.error("Email sending failed:", emailError.message);
    // Continue even if email fails, so user knows form was submitted
  }

  res.status(201).json({
    success: true,
    message: "Contact form submitted successfully!",
    data: createdContact,
  });
});

// 📋 Get all contacts
exports.getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 }).limit(200);
  res.status(200).json({
    success: true,
    count: contacts.length,
    data: contacts,
  });
});

// 🔍 Get contact by ID
exports.getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  res.status(200).json({
    success: true,
    data: contact,
  });
});

// ❌ Delete contact by ID
exports.deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  await contact.deleteOne();
  res.status(200).json({
    success: true,
    message: "Contact deleted successfully",
  });
});

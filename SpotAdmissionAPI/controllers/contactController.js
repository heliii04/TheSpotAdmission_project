const asyncHandler = require("express-async-handler");
const Contact = require("../models/Contact");

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

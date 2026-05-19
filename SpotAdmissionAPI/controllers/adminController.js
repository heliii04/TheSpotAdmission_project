const getStudentInquiries = async (req, res) => {
  try {
    const { email } = req.query; // Student ka email frontend se aayega
    
    const [career, admission, counseling] = await Promise.all([
      Career.find({ email }).lean(),
      Admission.find({ semail: email }).lean(),
      Counseling.find({ email }).lean()
    ]);

    const combined = [
      ...career.map(i => ({ ...i, category: "Career", date: i.createdAt })),
      ...admission.map(i => ({ ...i, category: "Admission", date: i.createdAt })),
      ...counseling.map(i => ({ ...i, category: "Counseling", date: i.createdAt }))
    ];

    res.json({ success: true, data: combined.sort((a,b) => b.date - a.date) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// routes/pdfRoutes.js
const express = require('express');
const pdfController = require('../controllers/pdfController');

const router = express.Router();

router.post('/generate-pdf', async (req, res) => {
  try {
    const { text } = req.body;

    // Generate PDF
    const pdfContent = await pdfController.generatePdf(text);

    // Save PDF to Database
    await pdfController.savePdfToDatabase(pdfContent);

    res.sendStatus(200); // Success
  } catch (error) {
    console.error('Error in PDF generation or saving:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

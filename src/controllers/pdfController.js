// controllers/pdfController.js
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const PDFDocument = require('pdfkit');

const prisma = new PrismaClient();

async function generatePdf(text) {
  try {
    console.log('Generating PDF...');
    const pdf = new PDFDocument();
    pdf.text(text);
    const pdfBuffer = await new Promise((resolve) => {
      const chunks = [];
      pdf.on('data', (chunk) => chunks.push(chunk));
      pdf.on('end', () => resolve(Buffer.concat(chunks)));
    });

    // Save PDF to File
    const pdfFilePath = path.join(__dirname, '..', 'generated', 'output.pdf');
    fs.writeFileSync(pdfFilePath, pdfBuffer);

    console.log('PDF generated successfully.');
    return pdfBuffer.toString('base64');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error; // Rethrow the error to be caught by the calling function
  }
}

async function savePdfToDatabase(content) {
  try {
    console.log('Saving PDF to database...');
    const result = await prisma.pdf.create({
      data: {
        content,
      },
    });

    console.log('PDF saved to database:', result);
    return result;
  } catch (error) {
    console.error('Error saving PDF to database:', error);
    throw error; // Rethrow the error to be caught by the calling function
  }
}

module.exports = {
  generatePdf,
  savePdfToDatabase,
};

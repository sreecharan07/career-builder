import pdfParse from 'pdf-parse';

/**
 * Parses PDF file and extracts text content
 * @param buffer PDF file buffer
 * @returns Extracted text from the PDF
 * @throws Error if PDF parsing fails
 */
export async function parsePDF(buffer: Buffer): Promise<string> {
  try {
    const data = await pdfParse(buffer);

    // Extract text from parsed PDF
    const text = data.text;

    // Check if PDF is empty
    if (!text || text.trim().length === 0) {
      throw new Error('PDF contains no text');
    }

    // Clean and normalize the text
    const cleanedText = text
      .replace(/\r\n/g, '\n') // Normalize line breaks
      .replace(/\r/g, '\n')
      .trim();

    return cleanedText;
  } catch (error: any) {
    // Handle specific errors
    if (error.message.includes('PDF contains no text')) {
      throw error;
    }

    if (error.message.includes('password')) {
      throw new Error('Password-protected PDFs are not supported');
    }

    // Generic parsing error
    throw new Error('Unable to parse PDF file');
  }
}

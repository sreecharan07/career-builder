import mammoth from 'mammoth';

/**
 * Parses DOC/DOCX file and extracts text content
 * @param buffer DOC/DOCX file buffer
 * @returns Extracted text from the document
 * @throws Error if document parsing fails
 */
export async function parseDOCX(buffer: Buffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ buffer });

    // Extract text from result
    const text = result.value;

    // Check if document is empty
    if (!text || text.trim().length === 0) {
      throw new Error('Document contains no text');
    }

    // Clean and normalize the text
    const cleanedText = text
      .replace(/\r\n/g, '\n') // Normalize line breaks
      .replace(/\r/g, '\n')
      .trim();

    return cleanedText;
  } catch (error: any) {
    // Handle specific errors
    if (error.message.includes('Document contains no text')) {
      throw error;
    }

    // Generic parsing error
    throw new Error('Unable to parse document file');
  }
}

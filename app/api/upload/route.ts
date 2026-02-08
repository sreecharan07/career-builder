import { NextRequest, NextResponse } from 'next/server';
import { parsePDF } from '@/lib/parsers/pdfParser';
import { parseDOCX } from '@/lib/parsers/docParser';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    // Validate file exists
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: 'File is too large. Please upload a file under 10MB.' },
        { status: 413 }
      );
    }

    // Get file extension
    const fileName = file.name.toLowerCase();
    const isPDF = fileName.endsWith('.pdf');
    const isDOC = fileName.endsWith('.doc') || fileName.endsWith('.docx');

    // Validate file type
    if (!isPDF && !isDOC) {
      return NextResponse.json(
        { success: false, error: 'Please upload a PDF or DOC/DOCX file.' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Parse file based on type
    let text: string;
    try {
      if (isPDF) {
        text = await parsePDF(buffer);
      } else {
        text = await parseDOCX(buffer);
      }
    } catch (error: any) {
      return NextResponse.json(
        { success: false, error: error.message || 'Unable to read file. Please try a different file.' },
        { status: 500 }
      );
    }

    // Check if text was extracted
    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'No text found in resume. Please upload a different file.' },
        { status: 400 }
      );
    }

    // Return extracted text
    return NextResponse.json({
      success: true,
      text,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: 'An error occurred while processing your file.' },
      { status: 500 }
    );
  }
}

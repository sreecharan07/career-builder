import { NextRequest, NextResponse } from 'next/server';
import { extractSkills } from '@/lib/skillExtractor';
import { matchRoles } from '@/lib/rolesMatcher';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text } = body;

    // Validate text exists
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { success: false, error: 'No text provided' },
        { status: 400 }
      );
    }

    // Extract skills from text
    const skills = extractSkills(text);

    // Check if any skills were found
    if (skills.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No recognizable skills found. Try uploading a more detailed resume.' },
        { status: 400 }
      );
    }

    // Match roles based on skills
    const roles = matchRoles(skills);

    // Return results
    return NextResponse.json({
      success: true,
      skills,
      roles,
    });
  } catch (error: any) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { success: false, error: 'An error occurred while analyzing your resume.' },
      { status: 500 }
    );
  }
}

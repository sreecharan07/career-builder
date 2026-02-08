import { NextRequest, NextResponse } from 'next/server';
import { extractSkills } from '@/lib/skillExtractor';
import { matchRoles } from '@/lib/rolesMatcher';
import { supabase } from '@/lib/supabaseClient';
import { Skill, Role } from '@/types';

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

    // Fetch skills from Supabase
    const { data: skillsData, error: skillsError } = await supabase
      .from('skills')
      .select('name, variations');

    if (skillsError) {
      console.error('Error fetching skills:', skillsError);
      throw new Error('Failed to fetch skills data');
    }

    // Fetch roles from Supabase
    const { data: rolesData, error: rolesError } = await supabase
      .from('roles')
      .select('title, description, required_skills');

    if (rolesError) {
      console.error('Error fetching roles:', rolesError);
      throw new Error('Failed to fetch roles data');
    }

    // Map roles to match Role interface (snake_case to camelCase)
    const formattedRoles: Role[] = rolesData.map((role: any) => ({
      title: role.title,
      description: role.description,
      requiredSkills: role.required_skills || [], // Handle null/undefined
    }));

    // Extract skills from text
    const skills = extractSkills(text, skillsData as Skill[]);

    // Check if any skills were found
    if (skills.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No recognizable skills found. Try uploading a more detailed resume.' },
        { status: 400 }
      );
    }

    // Match roles based on skills
    const roles = matchRoles(skills, formattedRoles);

    // Return results
    return NextResponse.json({
      success: true,
      skills,
      roles,
    });
  } catch (error: any) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'An error occurred while analyzing your resume.' },
      { status: 500 }
    );
  }
}

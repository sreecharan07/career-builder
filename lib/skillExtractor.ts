import { skills } from './data/skills';

/**
 * Extracts skills from resume text using keyword matching
 * @param text The resume text to extract skills from
 * @returns Array of matched skill names
 */
export function extractSkills(text: string): string[] {
  const lowerText = text.toLowerCase();
  const foundSkills = new Set<string>();

  for (const skill of skills) {
    // Check the main skill name
    if (matchSkill(lowerText, skill.name)) {
      foundSkills.add(skill.name);
      continue;
    }

    // Check variations
    if (skill.variations) {
      for (const variation of skill.variations) {
        if (matchSkill(lowerText, variation)) {
          foundSkills.add(skill.name);
          break;
        }
      }
    }
  }

  return Array.from(foundSkills);
}

/**
 * Checks if a skill appears in the text using word boundary matching
 * @param text Lowercase text to search in
 * @param skill Skill name or variation to search for
 * @returns true if skill is found with word boundaries
 */
function matchSkill(text: string, skill: string): boolean {
  const lowerSkill = skill.toLowerCase();

  // Escape special regex characters but keep word characters
  const escapedSkill = lowerSkill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Create regex with word boundaries
  // Use lookahead/lookbehind for better matching
  const pattern = new RegExp(`(?:^|\\s|[^a-z0-9])${escapedSkill}(?:$|\\s|[^a-z0-9])`, 'i');

  return pattern.test(text);
}

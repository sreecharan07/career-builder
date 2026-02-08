import { Role, MatchedRole } from '@/types';

/**
 * Matches user skills to roles and calculates match scores
 * @param userSkills Array of skills the user possesses
 * @param rolesData List of roles to match against
 * @returns Array of matched roles sorted by match percentage (highest first)
 */
export function matchRoles(userSkills: string[], rolesData: Role[]): MatchedRole[] {
  const normalizedUserSkills = userSkills.map(s => s.toLowerCase());
  const matchedRoles: MatchedRole[] = [];

  for (const role of rolesData) {
    // Find intersection: which required skills does the user have?
    const matchedSkills: string[] = [];

    for (const requiredSkill of role.requiredSkills) {
      const normalizedRequired = requiredSkill.toLowerCase();
      // Check if user has this skill (case-insensitive)
      if (normalizedUserSkills.includes(normalizedRequired)) {
        matchedSkills.push(requiredSkill);
      }
    }

    const matchCount = matchedSkills.length;
    const totalSkills = role.requiredSkills.length;
    const matchPercentage = Math.round((matchCount / totalSkills) * 100);

    // Only include roles with >= 50% match
    if (matchPercentage >= 50) {
      matchedRoles.push({
        title: role.title,
        matchedSkills,
        matchCount,
        totalSkills,
        matchPercentage,
      });
    }
  }

  // Sort by match percentage (highest first)
  matchedRoles.sort((a, b) => b.matchPercentage - a.matchPercentage);

  return matchedRoles;
}

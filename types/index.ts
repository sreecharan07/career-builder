export interface Skill {
  name: string;
  variations?: string[];
}

export interface Role {
  title: string;
  requiredSkills: string[];
  description: string;
}

export interface MatchedRole {
  title: string;
  matchedSkills: string[];
  matchCount: number;
  totalSkills: number;
  matchPercentage: number;
}

export interface AnalysisResult {
  skills: string[];
  roles: MatchedRole[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

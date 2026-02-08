import { MatchedRole } from '@/types';

interface RoleCardProps {
  role: MatchedRole;
}

export default function RoleCard({ role }: RoleCardProps) {
  // Determine fit level text based on percentage
  const getFitLevel = (percentage: number): string => {
    if (percentage >= 75) return 'Strong fit because you have:';
    if (percentage >= 60) return 'Good fit because you have:';
    return 'Potential fit because you have:';
  };

  const fitLevel = getFitLevel(role.matchPercentage);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Role title */}
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        {role.title}
      </h3>

      {/* Match score */}
      <p className="text-sm text-gray-600 mb-4">
        {role.matchCount} of {role.totalSkills} skills match ({role.matchPercentage}%)
      </p>

      {/* Explanation with matched skills */}
      <div className="space-y-2">
        <p className="text-gray-700">
          {fitLevel}
        </p>
        <div className="flex flex-wrap gap-2">
          {role.matchedSkills.map((skill) => (
            <span
              key={skill}
              className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-md"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

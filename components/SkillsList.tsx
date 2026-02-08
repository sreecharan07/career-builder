'use client';

interface SkillsListProps {
  skills: string[];
  onRemoveSkill: (skill: string) => void;
}

export default function SkillsList({ skills, onRemoveSkill }: SkillsListProps) {
  return (
    <div className="w-full lg:w-96 bg-white border-r border-gray-200 p-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          Your Skills ({skills.length})
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Click × to remove skills
        </p>
      </div>

      {/* Skills tags */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div
            key={skill}
            className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm"
          >
            <span className="text-gray-800">{skill}</span>
            <button
              onClick={() => onRemoveSkill(skill)}
              className="text-gray-500 hover:text-red-600 transition-colors"
              aria-label={`Remove ${skill}`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

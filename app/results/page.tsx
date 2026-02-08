'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SkillsList from '@/components/SkillsList';
import RoleCard from '@/components/RoleCard';
import { MatchedRole, Role } from '@/types';
import { matchRoles } from '@/lib/rolesMatcher';
import { supabase } from '@/lib/supabaseClient';

export default function ResultsPage() {
  const router = useRouter();
  const [skills, setSkills] = useState<string[]>([]);
  const [roles, setRoles] = useState<MatchedRole[]>([]);
  const [allRoles, setAllRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        // 1. Load results from sessionStorage
        const resultsStr = sessionStorage.getItem('analysisResults');

        if (!resultsStr) {
          router.push('/');
          return;
        }

        const results = JSON.parse(resultsStr);
        setSkills(results.skills);
        setRoles(results.roles);

        // 2. Fetch all roles from Supabase for recalculation
        const { data: rolesData, error } = await supabase
          .from('roles')
          .select('title, description, required_skills');

        if (error) {
          console.error('Error fetching roles:', error);
        } else if (rolesData) {
          // Map to Role type
          const formattedRoles: Role[] = rolesData.map((role: any) => ({
            title: role.title,
            description: role.description,
            requiredSkills: role.required_skills || [],
          }));
          setAllRoles(formattedRoles);
        }
      } catch (err) {
        console.error('Failed to parse results or fetch roles:', err);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [router]);

  const handleRemoveSkill = (skillToRemove: string) => {
    // Remove skill from list
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);

    // Recalculate role matches with remaining skills
    // We need allRoles to be populated. If it failed to load, this might return empty matches.
    const updatedRoles = matchRoles(updatedSkills, allRoles);
    setRoles(updatedRoles);

    // Update sessionStorage
    sessionStorage.setItem('analysisResults', JSON.stringify({
      skills: updatedSkills,
      roles: updatedRoles,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-96">
        <SkillsList skills={skills} onRemoveSkill={handleRemoveSkill} />
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-96 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Suggested Career Roles
            </h1>
            {roles.length > 0 && (
              <p className="text-gray-600">
                Found {roles.length} {roles.length === 1 ? 'role' : 'roles'} matching your skills
              </p>
            )}
          </div>

          {/* Role cards */}
          {roles.length > 0 ? (
            <div className="space-y-6">
              {roles.map((role) => (
                <RoleCard key={role.title} role={role} />
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
              <p className="text-gray-700 text-lg mb-2">
                No strong matches found.
              </p>
              <p className="text-gray-500">
                Try uploading a different resume or removing skills to see more options.
              </p>
              <button
                onClick={() => router.push('/')}
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Upload Another Resume
              </button>
            </div>
          )}

          {/* Back button */}
          {roles.length > 0 && (
            <div className="mt-8">
              <button
                onClick={() => router.push('/')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Upload Another Resume
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

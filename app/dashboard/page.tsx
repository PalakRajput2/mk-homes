// app/dashboard/page.tsx
'use client';

import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { backendClient } from '@/client/backendClient';

type TeamMember = {
  id: number;
  name: string;
  designation: string;
  image: string;
};

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await backendClient.get('/admin/team/list');
        setTeam(response.data.data || []);
      } catch (error) {
        console.error('Failed to fetch team', error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) fetchTeam();
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {loading ? (
        <p>Loading team...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {team?.map((member) => (
            <div key={member.id} className="border p-4 rounded shadow">
              <img
                src={`/uploads/${member.image}`}
                alt={member.name}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="mt-2 text-lg font-semibold">{member.name}</h2>
              <p className="text-sm text-gray-600">{member.designation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

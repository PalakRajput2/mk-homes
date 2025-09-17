'use client';

import { useEffect, useState } from 'react';
import { fetchTeamList } from '@/client/endpoints/team';
import { TeamMember } from '@/types/team';
import { TQueryData } from '@/types/query';
import Loading from '../loader/Loading';

const TeamList = () => {
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const payload: TQueryData = {
            size: 10,
            skip: 0,
            search: '',
            sorting: {},
        };

        try {
            const data = await fetchTeamList(payload);

            if (Array.isArray(data)) {
                setTeam(data);
            } else if (Array.isArray(data.data)) {
                setTeam(data.data);
            } else {
                setTeam([]);
                console.warn('Unexpected team data structure:', data);
            }
        } catch (error) {
            console.error('Failed to fetch team:', error);
            setTeam([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="flex justify-center p-6">
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="w-[1000px] bg-white divide-y divide-gray-200">
                    <thead className="bg-blue-500">
                        <tr>
                            <th className="table-header-cell">ID</th>
                            <th className="table-header-cell">Name</th>
                            <th className="table-header-cell">Designation</th>
                            <th className="table-header-cell">Image</th>
                            <th className="table-header-cell">Facebook</th>
                            <th className="table-header-cell">Instagram</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {team.map((member) => (
                            <tr key={member.id} className="hover:bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{member.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{member.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{member.designation}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${member.image}`}
                                        alt={member.name}
                                        className="w-12 h-12 rounded object-cover"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <a
                                        href={member.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        Facebook
                                    </a>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <a
                                        href={member.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-pink-500 hover:underline"
                                    >
                                        Instagram
                                    </a>
                                </td>
                            </tr>
                        ))}
                        {team.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center p-4 text-gray-500">
                                    No team members found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeamList;

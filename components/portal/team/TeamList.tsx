// components/TeamList.tsx
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
            setTeam(data || []);
        } catch (error) {
            console.error('Failed to fetch team:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className='flex items-center justify-center'>
        <table className="w-[1200px] border border-blue-500  bg-white pt-30">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Image</th>
                    <th>Facebook</th>
                    <th>Instagram</th>
                </tr>
            </thead>
            <tbody>
                {team.map((member) => (
                    <tr key={member.id} className="border-gray-100">
                        <td>{member.name}</td>
                        <td>{member.designation}</td>
                        <td>
                            <img
                                src={`${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${member.image}`}
                                alt={member.name}
                                className="w-16 h-16 object-cover rounded"
                            />
                        </td>
                        <td>
                            <a
                                href={member.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500"
                            >
                                Facebook
                            </a>
                        </td>
                        <td>
                            <a
                                href={member.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500"
                            >
                                Instagram
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table></div>
    );
};

export default TeamList;

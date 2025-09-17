'use client';

import { useTeamList } from '@/hooks/useTeamList';
import Loading from '../loader/Loading';
import { FiEdit, FiTrash2 } from 'react-icons/fi'; // Feather icons

const TeamList = () => {
    const { data: team = [], isLoading, isError, error } = useTeamList();

    if (isLoading) return <Loading />;

    if (isError) {
        return (
            <div className="text-center text-red-500 p-6">
                Failed to load team members: {error.message}
            </div>
        );
    }

    if (team.length === 0) {
        return (
            <div className="text-center text-gray-500 p-6">
                No team members found.
            </div>
        );
    }

    return (
        <div className="flex justify-center p-10 pl-20">
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="w-[1200px] bg-white divide-y divide-gray-200">
                    <thead className="bg-blue-500">
                        <tr>
                            <th className="table-header-cell">ID</th>
                            <th className="table-header-cell">Name</th>
                            <th className="table-header-cell">Designation</th>
                            <th className="table-header-cell">Facebook</th>
                            <th className="table-header-cell">Instagram</th>
                            <th className="table-header-cell">Actions</th> {/* New column */}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {team.map((member) => (
                            <tr key={member.id} className="hover:bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {member.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {member.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {member.designation}
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
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex space-x-6">
                                    {/* Edit Icon */}
                                    <button
                                        onClick={() => console.log('Edit', member.id)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <FiEdit size={20} />
                                    </button>

                                    {/* Delete Icon */}
                                    <button
                                        onClick={() => console.log('Delete', member.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FiTrash2 size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeamList;

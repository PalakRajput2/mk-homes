'use client';

import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTeamRequest, FETCH_TEAMS_KEY } from '@/client/endpoints/team';
import toast, { Toaster } from 'react-hot-toast';
import { TeamMember } from '@/types/team';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useDateFormatter } from '@/hooks/dates/useDateFormatter';



interface TableProps {
    data: TeamMember[];
    refetch: () => void;
}

dayjs.extend(utc);
dayjs.extend(timezone);
const Table: React.FC<TableProps> = ({ data, refetch }) => {
    const queryClient = useQueryClient();
    const { formatListDate, formatListTime } = useDateFormatter();
    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteTeamRequest([id]),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [FETCH_TEAMS_KEY] });
            refetch();
            toast.success('Team member deleted successfully');
        },
        onError: (error) => {
            console.error('Delete failed:', error);
            toast.error('Failed to delete team member');
        }
    });

    const handleDelete = (id: number, name: string) => {
        toast((t) => (
            <div className="p-2 h-[100px] w-[200px]">
                <p className="text-lg mb-2">Delete {name}?</p>
                <div className="flex gap-2 justify-end">
                    <button
                        onClick={() => {
                            deleteMutation.mutate(id);
                            toast.dismiss(t.id);
                        }}
                        className="px-2 py-1 text-md bg-red-500 text-white rounded cursor-pointer"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-2 py-1 text-md border rounded cursor-pointer"
                    >
                        No
                    </button>
                </div>
            </div>
        ), { duration: 5000 });
    };


    return (
        <div>
            <Toaster position="top-center" />
            <div className="flex flex-col items-center p-10 pl-20">
                <div className="overflow-x-auto shadow-lg rounded-lg mb-6">
                    <table className="w-[1000px] bg-white divide-y divide-gray-200">
                        <thead className="bg-blue-500">
                            <tr>
                                <th className="table-header-cell">ID</th>
                                <th className="table-header-cell">Name</th>
                                <th className="table-header-cell">Designation</th>
                                <th className="table-header-cell">Facebook</th>
                                <th className="table-header-cell">Created At</th>
                                <th className="table-header-cell">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map((member) => (
                                <tr key={member.id} className="hover:bg-gray-100">
                                    <td className="px-6 py-4 text-sm text-gray-700">{member.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{member.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{member.designation}</td>
                                    <td className="px-6 py-4">
                                        <a
                                            href={member.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            Facebook
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {member.createdAt ? (
                                            <div className="flex flex-col gap-1">
                                                <span>{formatListDate(member.createdAt)}</span>
                                                <span className='text-red-500'>{formatListTime(member.createdAt)}</span>
                                            </div>
                                        ) : (
                                            ' - '
                                        )}
                                    </td>

                                    <td className="px-6 py-4 space-x-6">
                                        <Link href={`/portal/team/add?id=${member.id}`}>
                                            <button className="text-blue-500 hover:text-blue-700 cursor-pointer">
                                                <FiEdit size={20} />
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(member.id, member.name)}
                                            className="text-red-500 hover:text-red-700 cursor-pointer"
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
        </div>
    );
};

export default Table;

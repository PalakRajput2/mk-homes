'use client';

import React, { useEffect, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTeamRequest, GET_TEAM_KEY } from '@/client/endpoints/team';
import toast, { Toaster } from 'react-hot-toast';
import { TeamMember } from '@/types/team';
import { useDateFormatter } from '@/hooks/dates/useDateFormatter';
import { sortByCreatedAtDesc, sortByName, toggleSortOrder, SortOrder } from '../common/sorting';
import { showConfirmDeleteToast } from '@/utils/confirmDeleteToast';
import { BsDatabaseDash, BsDatabaseLock, BsRecord2 } from 'react-icons/bs';

interface TableProps {
    data: TeamMember[];
    refetch: () => void;
}

const Table: React.FC<TableProps> = ({ data, refetch }) => {
    const [sortOrder, setSortOrder] = useState<SortOrder>(null);
    const [sortedData, setSortedData] = useState<TeamMember[]>([]);

    const queryClient = useQueryClient();
    const { formatListDate, formatListTime } = useDateFormatter();
    const editPath = "/portal/team/edit";

    // On data load, sort by createdAt descending by default
    useEffect(() => {
        setSortedData(sortByCreatedAtDesc(data));
        setSortOrder(null);
    }, [data]);

    const handleSortByName = () => {
        const newSortOrder = toggleSortOrder(sortOrder);
        const sorted = sortByName(data, newSortOrder);
        setSortOrder(newSortOrder);
        setSortedData(sorted);
    };

    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteTeamRequest([id]),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [GET_TEAM_KEY] });
            refetch();
            toast.success('Team member deleted successfully');
        },
        onError: (error) => {
            console.error('Delete failed:', error);
            toast.error('Failed to delete team member');
        }
    });

    const handleDelete = (id: number, name: string) => {
        showConfirmDeleteToast({
            name,
            onConfirm: () => {
                deleteMutation.mutate(id);
            }
        });
    };

    return (
        <div>
            <Toaster position="top-center" />
            <div className="flex flex-col items-center md:pl-60">
                <div className="overflow-x-auto mb-6 ">
                    <table className="w-[1340px]">
                        <thead className="bg-white  text-gray-500 border-b border-gray-300 h-15">

                            <tr >
                                <th
                                    className="table-header-cell cursor-pointer"
                                    onClick={handleSortByName}
                                    aria-sort={
                                        sortOrder === 'asc' ? 'ascending' :
                                            sortOrder === 'desc' ? 'descending' : 'none'
                                    }
                                >
                                    Name {sortOrder === 'asc' ? '▲' : sortOrder === 'desc' ? '▼' : '▼'}
                                </th>
                                <th className="table-header-cell">Designation</th>
                                <th className="table-header-cell">Facebook</th>
                                <th
                                    className="table-header-cell cursor-pointer"
                                    onClick={handleSortByName}
                                    aria-sort={
                                        sortOrder === 'asc' ? 'ascending' :
                                            sortOrder === 'desc' ? 'descending' : 'none'
                                    }
                                >
                                    Created At {sortOrder === 'asc' ? '▲' : sortOrder === 'desc' ? '▼' : '▼'}
                                </th>
                                <th className="table-header-cell flex justify-end ">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {sortedData.length > 0 ? (
                                sortedData.map((member) => (
                                    <tr key={member.id} className="hover:bg-gray-100">
                                        <td className="px-6 py-4 text-sm text-gray-900">{member.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{member.designation}</td>
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
                                        <td className="px-6 py-4 text-sm text-gray-800">
                                            {member.createdAt ? (
                                                <div className="flex flex-col gap-1">
                                                    <span>{formatListDate(member.createdAt)}</span>
                                                    <span className="text-red-500">{formatListTime(member.createdAt)}</span>
                                                </div>
                                            ) : (
                                                ' - '
                                            )}
                                        </td>
                                        <td className="px-4 py-4 space-x-6 flex justify-end">
                                            <Link href={`${editPath}?id=${member.id}`}>
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
                                ))
                            ) : (
                                <tr >
                                    <td
                                        colSpan={5}
                                        className="text-center py-6 text-gray-500 italic"
                                    >
                                        No records found.
                                        <div className='flex items-center justify-center gap-5'>
                                            <BsDatabaseDash className='text-gray-400   text-center  text-7xl' />

                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Table;

'use client';

import React, { useEffect, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTeamRequest, GET_TEAM_KEY } from '@/client/endpoints/team';
import toast, { Toaster } from 'react-hot-toast';
import { TeamMember } from '@/types/team';
import { useDateFormatter } from '@/hooks/dates/useDateFormatter';
import { sortByCreatedAtDesc, sortByName, toggleSortOrder, SortOrder, } from '../common/sorting';
import { showConfirmDeleteToast } from '@/utils/confirmDeleteToast';
import { BsDatabaseDash } from 'react-icons/bs';
import Loading from '../loader/Loading';

interface TableProps {
    data: TeamMember[];
    refetch: () => void;
    selectedIds: number[];
    setSelectedIds: (ids: number[]) => void;
}

const Table: React.FC<TableProps> = ({ data, refetch, selectedIds, setSelectedIds }) => {
    const [sortOrder, setSortOrder] = useState<SortOrder>(null);
    const [sortedData, setSortedData] = useState<TeamMember[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient();
    const { formatListDate, formatListTime } = useDateFormatter();
    const editPath = '/portal/team/edit';

    // Sort on data load
    useEffect(() => {
        setSortedData(sortByCreatedAtDesc(data));
        setSortOrder(null);
        setSelectAll(false);
    }, [data, setSelectedIds]);

    const handleSortByName = () => {
        setLoading(true)
        setTimeout(() => {
            const newSortOrder = toggleSortOrder(sortOrder);
            const sorted = sortByName(data, newSortOrder);
            setSortOrder(newSortOrder);
            setSortedData(sorted);
            setLoading(false)
        }, 50)

    };

    const deleteMutation = useMutation({
        mutationFn: (ids: number[]) => deleteTeamRequest(ids),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [GET_TEAM_KEY] });
            refetch();
            setSelectedIds([]);
            setSelectAll(false);
            toast.success('Deleted successfully');
        },
        onError: (error) => {
            console.error('Delete failed:', error);
            toast.error('Failed to delete');
        },
    });

    const handleDelete = (id: number, name: string) => {
        showConfirmDeleteToast({
            name,
            onConfirm: () => deleteMutation.mutate([id]),
        });
    };

    const handleBulkDelete = () => {
        showConfirmDeleteToast({
            name: `${selectedIds.length} team member(s)`,
            onConfirm: () => deleteMutation.mutate(selectedIds),
        });
    };

    const toggleSelectAll = () => {
        if (selectAll) {
            setSelectedIds([]);
            setSelectAll(false);
        } else {
            const allIds = sortedData.map((member) => member.id);
            setSelectedIds(allIds);
            setSelectAll(true);
        }
    };

    const toggleSelectOne = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter((item) => item !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };
    if (loading) {
        return <Loading />
    }
    return (
        <div>
            <Toaster position="top-center" />
            <div className="flex flex-col items-center md:pl-65">
                <div className="overflow-x-auto mb-6">
                    <table className="w-[1360px]">
                        <thead className="bg-white text-gray-500 border-b border-gray-300 h-15">
                            <tr>
                                {sortedData.length > 0 && (
                                    <th className="relative">
                                        <input
                                            type="checkbox"
                                            checked={selectAll}
                                            onChange={toggleSelectAll}
                                            className="w-5 h-5 cursor-pointer absolute left-6 top-5"
                                        />
                                    </th>
                                )}
                                <th
                                    className="table-header-cell cursor-pointer"
                                    onClick={handleSortByName}
                                >
                                    Name {sortOrder === 'asc' ? '▲' : sortOrder === 'desc' ? '▼' : '▼'}
                                </th>
                                <th className="table-header-cell">Designation</th>
                                <th
                                    className="table-header-cell cursor-pointer"
                                    onClick={handleSortByName}
                                >
                                    Created At {sortOrder === 'asc' ? '▲' : sortOrder === 'desc' ? '▼' : '▼'}
                                </th>
                                <th className="table-header-cell flex justify-end px-10 mt-2">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {sortedData.length > 0 ? (
                                sortedData.map((member) => (
                                    <tr key={member.id} className="hover:bg-gray-100">
                                        <td className="px-6 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(member.id)}
                                                onChange={() => toggleSelectOne(member.id)}
                                                className="w-5 h-5 cursor-pointer"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-[15px] text-gray-900">{member.name}</td>
                                        <td className="px-6 py-4 text-[15px] text-gray-900">
                                            {member.designation}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-800">
                                            {member.createdAt ? (
                                                <div className="flex flex-col gap-1">
                                                    <span>{formatListDate(member.createdAt)}</span>
                                                    <span className="text-red-500">
                                                        {formatListTime(member.createdAt)}
                                                    </span>
                                                </div>
                                            ) : (
                                                ' - '
                                            )}
                                        </td>
                                        <td className="px-10 py-5 space-x-4 flex items-center justify-end">
                                            <Link href={`${editPath}?id=${member.id}`}>
                                                <button className="text-blue-500 hover:text-blue-700 cursor-pointer m-2">
                                                    <FiEdit size={20} />
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(member.id, member.name)}
                                                className="text-red-500 hover:text-red-700 cursor-pointer "
                                            >
                                                <FiTrash2 size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center py-6 text-gray-500 italic">
                                        No records found..
                                        <div className="flex items-center justify-center gap-5">
                                            <BsDatabaseDash className="text-gray-400 text-center text-7xl" />
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
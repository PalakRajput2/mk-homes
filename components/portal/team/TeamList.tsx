'use client';

import { useState } from 'react';
import { useTeamList } from '@/hooks/useTeamList';
import Loading from '../loader/Loading';
import Pagination from '../common/Pagination';
import Table from './Table';
import { ListHeader } from '../common/ListHeader';
import { useRouter } from 'next/navigation';
import { useDebounceSearch } from '@/utils/useDebounceSearch';
import { TQueryData } from '@/types/query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTeamRequest, GET_TEAM_KEY } from '@/client/endpoints/team';
import toast from 'react-hot-toast';
import { showConfirmDeleteToast } from '@/utils/confirmDeleteToast';

const TeamList = () => {
    const [page, setPage] = useState(0);
    const [loading ,setLoading] = useState(false)
    const [pageSize, setPageSize] = useState(10);
    const [searchInput, setSearchInput] = useState('');
    const [queryData, setQueryData] = useState<TQueryData>({
        skip: 0,
        size: 10,
        search: '',
        sorting: undefined,
    });

    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const router = useRouter();
    const queryClient = useQueryClient();

    const skip = page * pageSize;

    useDebounceSearch({
        setterFn: setQueryData,
        search: searchInput,
        delay: 1000,
    });

    const { search } = queryData;

    const {
        data: result = { data: [], total: 0 },
        isLoading,
        isError,
        error,
        isFetching,
        refetch,
    } = useTeamList(skip, pageSize, search);

    const team = result.data;
    const totalItems = result.total;

    const deleteMutation = useMutation({
        mutationFn: (ids: number[]) => deleteTeamRequest(ids),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [GET_TEAM_KEY] });
            refetch();
            toast.success('Deleted successfully');
            setSelectedIds([]);
        },
        onError: () => {
            toast.error('Failed to delete');
        },
    });

    const handleBulkDelete = () => {
        if (selectedIds.length === 0) return;

        showConfirmDeleteToast({
            name: `${selectedIds.length} team member(s)`,
            onConfirm: () => deleteMutation.mutate(selectedIds),
        });
    };

    const handleAddClick = () => router.push('/portal/team/add');

    const handleSearchChange = (value: string) => {
        setSearchInput(value);
        setPage(0);
    };

    if (isLoading || isFetching) return <Loading />;
    if (isError)
        return (
            <div className="text-center text-red-500 p-10">
                Failed to load team members: {error.message}
            </div>
        );

    return (
        <div>
            <ListHeader
                title="Team"
                searchValue={searchInput}
                onSearchChange={handleSearchChange}
                onAddClick={handleAddClick}
                selectedCount={selectedIds.length}
                onDeleteSelected={handleBulkDelete}
            />

            <Table
                data={team}
                refetch={refetch}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
            />

            <div className="flex border-t border-gray-200">
                <Pagination
                    page={page}
                    pageSize={pageSize}
                    totalItems={totalItems}
                    onNext={() => setPage((p) => p + 1)}
                    onPrev={() => setPage((p) => p - 1)}
                    onPageChange={setPage}
                    onPageSizeChange={(newSize) => {
                        setPageSize(newSize);
                        setPage(0);
                    }}
                    isNextDisabled={(page + 1) * pageSize >= totalItems}
                    isPrevDisabled={page === 0}
                />
            </div>
        </div>
    );
};

export default TeamList;

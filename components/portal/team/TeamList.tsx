'use client';

import { useState } from 'react';
import { useTeamList } from '@/hooks/useTeamList';
import Loading from '../loader/Loading';

import Pagination from '../common/Pagination';
import Table from './Table';

const TeamList = () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const skip = page * pageSize;

    const {
        data: result = { data: [], total: 0 },
        isLoading,
        isError,
        error,isFetching,
        refetch
    } = useTeamList(skip, pageSize);

    const team = result.data;
    const totalItems = result.total;

    const handleNext = () => {
        if ((page + 1) * pageSize < totalItems) setPage((prev) => prev + 1);
        
    };

    const handlePrev = () => {
        if (page > 0) setPage((prev) => prev - 1);
       
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (newSize: number) => {
        setPageSize(newSize);
        setPage(0);
    };
    if (isLoading || isFetching) return <Loading />;

    if (isError) {
        return (
            <div className="text-center text-red-500 p-10">
                Failed to load team members: {error.message}
            </div>
        );
    }

    if (team.length === 0 && page === 0) {
        return (
            <div className="text-center text-gray-500 p-6">
                No team members found.
            </div>
        );
    }

    return (
        <div>
          {/* Table */}
           <Table data={team} refetch={refetch}/>

            {/* Pagination */}
            <div className='flex border-t border-gray-200 '>
                <Pagination
                    page={page}
                    pageSize={pageSize}
                    totalItems={totalItems}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange} 
                    isNextDisabled={(page + 1) * pageSize >= totalItems}
                    isPrevDisabled={page === 0}
                />
            </div>
        </div>
    );
};

export default TeamList;

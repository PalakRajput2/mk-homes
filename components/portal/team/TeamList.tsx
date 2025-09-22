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

const TeamList = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // Immediate search input (typed by user)
  const [searchInput, setSearchInput] = useState('');

  // Debounced query data state, updated by useDebounceSearch
  const [queryData, setQueryData] = useState<TQueryData>({
    skip: 0,
    size: 10,
    search: '',
    sorting: undefined,
  });

  const router = useRouter();
  const skip = page * pageSize;

  // Use your debounce hook to update queryData.search with delay
  useDebounceSearch({
    setterFn: setQueryData,
    search: searchInput,
    delay: 1000,
  });

  // Use debounced search value for fetching
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

  const handleAddClick = () => {
    router.push('/portal/team/add');
  };

  // Update immediate search input and reset page
  const handleSearchChange = (value: string) => {
    setSearchInput(value);
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



  return (
    <div>
      <ListHeader
        title="Team"
        searchValue={searchInput}          
        onSearchChange={handleSearchChange}
        onAddClick={handleAddClick}
      />

      <Table data={team} refetch={refetch} />

      <div className="flex border-t border-gray-200">
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

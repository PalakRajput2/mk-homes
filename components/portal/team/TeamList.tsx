'use client';

import { useState } from 'react';
import { useTeamList } from '@/hooks/useTeamList';
import Loading from '../loader/Loading';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Pagination from './Pagination';

const TeamList = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10); // ✅ New state for records per page

  const skip = page * pageSize;

  const {
    data: result = { data: [], total: 0 },
    isLoading,
    isError,
    error,
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
  setPage(0); // Reset to first page when size changes
};
  if (isLoading) return <Loading />;

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
      <div className="flex flex-col items-center p-10 pl-20">
        <div className="overflow-x-auto shadow-lg rounded-lg mb-6">
          <table className="w-[1000px] bg-white divide-y divide-gray-200">
            <thead className="bg-blue-500">
              <tr>
                <th className="table-header-cell">ID</th>
                <th className="table-header-cell">Name</th>
                <th className="table-header-cell">Designation</th>
                <th className="table-header-cell">Facebook</th>
                <th className="table-header-cell">Instagram</th>
                <th className="table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {team.map((member) => (
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
                  <td className="px-6 py-4">
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-500 hover:underline"
                    >
                      Instagram
                    </a>
                  </td>
                  <td className="px-6 py-4 flex space-x-6">
                    <button
                      onClick={() => console.log('Edit', member.id)}
                      className="text-blue-500 hover:text-blue-700 cursor-pointer"
                    >
                      <FiEdit size={20} />
                    </button>
                    <button
                      onClick={() => console.log('Delete', member.id)}
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

      {/* Pagination */}
      <div className='flex '>
     <Pagination
  page={page}
  pageSize={pageSize}
  totalItems={totalItems}
  onNext={handleNext}
  onPrev={handlePrev}
  onPageChange={handlePageChange}
  onPageSizeChange={handlePageSizeChange} // ✅ pass it here
  isNextDisabled={(page + 1) * pageSize >= totalItems}
  isPrevDisabled={page === 0}
/>
</div>
    </div>
  );
};

export default TeamList;

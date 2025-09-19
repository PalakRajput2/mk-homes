// components/team/Pagination.tsx
'use client';

import React from 'react';

interface PaginationProps {
    page: number;
    pageSize: number;
    totalItems: number;
    onNext: () => void;
    onPrev: () => void;
    isNextDisabled: boolean;
    isPrevDisabled: boolean; onPageChange: (page: number) => void;
    onPageSizeChange: (newSize: number) => void; 
}

const Pagination: React.FC<PaginationProps> = ({
    page,
    pageSize,
    totalItems,
    onNext,
    onPrev,
    isNextDisabled,
    isPrevDisabled, onPageChange,
    onPageSizeChange,
}) => {
    const startEntry = totalItems === 0 ? 0 : page * pageSize + 1;
    const endEntry = Math.min((page + 1) * pageSize, totalItems);
    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const size = parseInt(e.target.value);
        onPageSizeChange(size);
    };
    return (
        <div className="pl-70  w-full flex items-center justify-between mt-4 ">
            {/* Showing X to Y of Z entries */}
            <div className="text-sm text-gray-600 font-medium">
                Showing {startEntry} to {endEntry} of {totalItems} entries
            </div>
            {/* Records per page selector */}
            <div className="flex items-center space-x-2 text-sm text-gray-700">
                <label htmlFor="pageSize" className="font-medium">
                    Records per page:
                </label>
                <select
                    id="pageSize"
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    className="border rounded px-2 py-1"
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                </select>
            </div>
            {/* Prev / Next buttons */}
            <div className="flex space-x-4 items-center justify-center">
                <button
                    onClick={onPrev}
                    disabled={isPrevDisabled}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50 cursor-pointer"
                >
                    Prev
                </button>
                <span className="px-2 py-2 text-gray-700 font-medium">
                    Page {page + 1} 
                </span>
                <button
                    onClick={onNext}
                    disabled={isNextDisabled}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50 cursor-pointer"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;

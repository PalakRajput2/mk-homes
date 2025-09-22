import React, { useRef, useEffect } from 'react';
import { BiPlus, BiSearch } from 'react-icons/bi';
import {  MdDeleteForever } from 'react-icons/md';

interface ListHeaderProps {
  title: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
  selectedCount: number;
  onDeleteSelected?: () => void;
}

export const ListHeader: React.FC<ListHeaderProps> = ({
  title,
  searchValue,
  onSearchChange,
  onAddClick,
  selectedCount,
  onDeleteSelected,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  if (inputRef.current && searchValue.trim() !== '') {
    inputRef.current.focus();
  }
}, [searchValue]);

  return (
    <div className='pl-60 w-[1600px] pt-5'>
    <div className="flex items-center h-[70px] justify-between mb-5  bg-white shadow-sm px-4 ">
      <h2 className="text-[22px] font-semibold px-1">{title}</h2>
      <div className="flex items-center space-x-3">
        {selectedCount > 0 && onDeleteSelected && (
          <button
            onClick={onDeleteSelected}
            className="flex justify-center items-center gap-3 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 text-[16px] cursor-pointer"
          >
          <MdDeleteForever className='text-xl'/>  Delete  ({selectedCount})
          </button>
        )}
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className=" bg-gray-100  rounded px-3 py-1 text-sm h-[35px]"

          />
          <BiSearch className="absolute right-2 top-0 text-2xl text-blue-200 h-[40px]" />
        </div>

        <button
          onClick={onAddClick}
          className="bg-red-500 w-35 flex items-center gap-2 text-white px-4 py-2 rounded-lg font-medium  hover:bg-red-600 text-[16px] cursor-pointer"
        >
          <BiPlus className='text-xl' /> Add New
        </button>
      </div>
    </div>
    </div>
  );
};
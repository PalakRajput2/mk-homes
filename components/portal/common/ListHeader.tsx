import React, { useRef, useEffect } from 'react';
import { BiSearch } from 'react-icons/bi';

interface ListHeaderProps {
  title: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
  addButtonText?: string;
}

export const ListHeader: React.FC<ListHeaderProps> = ({
  title,
  searchValue,
  onSearchChange,
  onAddClick,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep input focused whenever searchValue changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchValue]);

  return (
    <div className="flex items-center h-[70px] justify-between mb-4 bg-white shadow-sm">
      <h2 className="text-2xl font-semibold pl-70">{title}</h2>
      <div className="flex items-center space-x-3 pr-3">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="border border-gray-400 rounded px-3 py-1 text-sm h-[35px]"
          />
          <BiSearch className="absolute right-2 top-0 text-2xl text-gray-400 h-[40px]" />
        </div>
        <button
          onClick={onAddClick}
          className="bg-red-500 w-[150px] h-[40px] text-white px-4 py-2 rounded hover:bg-red-600 text-[16px] cursor-pointer"
        >
         + Add New
        </button>
      </div>
    </div>
  );
};

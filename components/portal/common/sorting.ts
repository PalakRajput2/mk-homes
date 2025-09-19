// sorting.ts

import { TeamMember } from '@/types/team';

export type SortOrder = 'asc' | 'desc' | null;

export interface SortingState {
  sortOrder: SortOrder;
  sortedData: TeamMember[];
}

// Default sort by createdAt descending (newest first)
export const sortByCreatedAtDesc = (data: TeamMember[]): TeamMember[] => {
  return [...data].sort((a, b) => {
    if (!a.createdAt) return 1;
    if (!b.createdAt) return -1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};

// Sort by name with given order
export const sortByName = (data: TeamMember[], order: Exclude<SortOrder, null>): TeamMember[] => {
  return [...data].sort((a, b) => {
    if (a.name < b.name) return order === 'asc' ? -1 : 1;
    if (a.name > b.name) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

// Toggle sort order for name
export const toggleSortOrder = (currentOrder: SortOrder): Exclude<SortOrder, null> => {
  if (currentOrder === 'asc') return 'desc';
  return 'asc';
};

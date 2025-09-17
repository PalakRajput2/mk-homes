export type TQueryData = {
  size: number;
  skip: number;
  search?: string;
  sorting?: Record<string, 'asc' | 'desc'>;
};

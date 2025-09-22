import { useEffect } from 'react';

import { TQueryData } from '@/types/query';


type Tprops = {
  setterFn: React.Dispatch<React.SetStateAction<TQueryData>>;
  search: string;
  delay?: number;
}

export function useDebounceSearch({ setterFn, search, delay = 1000 }: Tprops) {
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        
      }

      setterFn(prev => ({
        ...prev,
        search,
      }));
    }, delay);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);
}
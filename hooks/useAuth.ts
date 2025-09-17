import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { setAuthToken } from '@/client/backendClient';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'admin') {
      router.replace('/portal/team');
    } else {
      setAuthToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  return { isAuthenticated };
};

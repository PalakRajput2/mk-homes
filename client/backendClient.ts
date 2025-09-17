// client/backendClient.ts
import axios from 'axios';

export const backendClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});


export const setAuthToken = (token: string) => {
  backendClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};


if (typeof window !== 'undefined') {
  const token = localStorage.getItem('token');
  if (token) {
    backendClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

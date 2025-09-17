'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginRequest, TLogin } from '@/client/endpoints/auth/login';
import { setAuthToken } from '@/client/backendClient';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload: TLogin = { email, password };
      const response = await loginRequest(payload);
      const data = response.data;

      console.log(data); 

      if (data.success === true && data.data?.accessToken) {
        const token = data.data.accessToken;
        const role = data.data.user?.role;
        console.log("USER:", data.data.user);
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        setAuthToken(token); 
        router.replace('/'); 
      } else {
        alert('Invalid login credentials');
        console.log('Login response data:', data);
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-10">
      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2 mb-4 w-full"
      />
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border p-2 mb-4 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Login
      </button>
    </form>
  );
};

export default LoginPage;

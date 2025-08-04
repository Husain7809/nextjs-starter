"use client"
import React, { useState } from 'react';
import { useLoginMutation } from '@/features/auth';
import { useAppDispatch } from '@/redux/hooks';
import { setUser, setToken } from '@/features/auth';
import { Button } from '@/components/ui/Button';

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    username: 'emilys', // Pre-filled with demo user
    password: 'emilyspass', // Pre-filled with demo password
    expiresInMins: 30,
  });

  const [login, { isLoading, error }] = useLoginMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'expiresInMins' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await login(formData).unwrap();
      // The auth API automatically stores the token
      console.log('Login successful:', result);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-blue-700 text-sm">
          <strong>Demo Credentials:</strong><br />
          Username: emilys<br />
          Password: emilyspass
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>

        <div>
          <label htmlFor="expiresInMins" className="block text-sm font-medium text-gray-700 mb-1">
            Session Duration (minutes)
          </label>
          <input
            type="number"
            id="expiresInMins"
            name="expiresInMins"
            value={formData.expiresInMins}
            onChange={handleInputChange}
            min="1"
            max="1440"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">
              Login failed. Please try again.
            </p>
          </div>
        )}

        <Button
          type="submit"
          loading={isLoading}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
      
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>Try any user credentials from the <a href="https://dummyjson.com/users" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">DummyJSON Users API</a></p>
      </div>
    </div>
  );
};

export default LoginForm; 
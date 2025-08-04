import React from 'react';
import UserList from '@/components/Users/UserList';

const UsersPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
        <p className="text-gray-600 mt-2">
          Manage your application users with full CRUD operations powered by RTK Query.
        </p>
      </div>
      
      <UserList />
    </div>
  );
};

export default UsersPage; 
"use client"
import React, { useState, useEffect } from 'react';
import { useGetUsersQuery, useSearchUsersQuery, useDeleteUserMutation } from '@/features/users';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { 
  setSearchFilter, 
  setSortBy, 
  setSortOrder, 
  clearFilters,
} from '@/features/users';
import { Button } from '@/components/ui/Button';
import type { User } from '@/types';
import { nextPage, prevPage, setFilter, setPagination } from '@/features/users/slice/usersSlice';

const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { search, sortBy, sortOrder } = useAppSelector((state) => state.users.filters);
  const { limit, skip, total } = useAppSelector((state) => state.users.pagination);
  
  const [selectedFilter, setSelectedFilter] = useState<{ key: string; value: string }>({ key: '', value: '' });

  // Use search query if there's a search term, otherwise use regular users query
  const shouldUseSearch = search.length > 0;
  
  const { 
    data: usersData, 
    isLoading, 
    error, 
    refetch 
  } = useGetUsersQuery({ limit, skip }, { skip: shouldUseSearch });

  const { 
    data: searchData, 
    isLoading: isSearchLoading, 
    error: searchError 
  } = useSearchUsersQuery({ q: search, limit, skip }, { skip: !shouldUseSearch });

  // Use search data if searching, otherwise use regular data
  const currentData = shouldUseSearch ? searchData : usersData;
  const currentLoading = shouldUseSearch ? isSearchLoading : isLoading;
  const currentError = shouldUseSearch ? searchError : error;

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  // Update pagination total when data changes
  useEffect(() => {
    if (currentData) {
      dispatch(setPagination({ total: currentData.total }));
    }
  }, [currentData, dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchFilter(e.target.value));
    dispatch(setPagination({ skip: 0 })); // Reset to first page when searching
  };

  const handleSortChange = (field: 'firstName' | 'lastName' | 'email' | 'age') => {
    if (sortBy === field) {
      dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      dispatch(setSortBy(field));
      dispatch(setSortOrder('asc'));
    }
  };

  const handleFilterApply = () => {
    if (selectedFilter.key && selectedFilter.value) {
      dispatch(setFilter(selectedFilter));
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId).unwrap();
        refetch(); // Refresh the list
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  const handleNextPage = () => {
    dispatch(nextPage());
  };

  const handlePrevPage = () => {
    dispatch(prevPage());
  };

  if (currentLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading users...</span>
      </div>
    );
  }

  if (currentError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-600">Error loading users: {JSON.stringify(currentError)}</p>
        <Button onClick={() => refetch()} variant="outline" className="mt-2">
          Retry
        </Button>
      </div>
    );
  }

  const currentPage = Math.floor(skip / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={handleSearchChange}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <select
          value={selectedFilter.key}
          onChange={(e) => setSelectedFilter({ ...selectedFilter, key: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Filter by...</option>
          <option value="gender">Gender</option>
          <option value="role">Role</option>
          <option value="hair.color">Hair Color</option>
          <option value="eyeColor">Eye Color</option>
          <option value="company.department">Department</option>
        </select>

        <input
          type="text"
          placeholder="Filter value..."
          value={selectedFilter.value}
          onChange={(e) => setSelectedFilter({ ...selectedFilter, value: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!selectedFilter.key}
        />

        <div className="flex space-x-2">
          <Button onClick={handleFilterApply} variant="outline" disabled={!selectedFilter.key || !selectedFilter.value}>
            Apply Filter
          </Button>
          <Button onClick={() => dispatch(clearFilters())} variant="outline">
            Clear All
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Avatar
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" 
                onClick={() => handleSortChange('firstName')}
              >
                Name {sortBy === 'firstName' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" 
                onClick={() => handleSortChange('email')}
              >
                Email {sortBy === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" 
                onClick={() => handleSortChange('age')}
              >
                Age {sortBy === 'age' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData?.users.map((user: User) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img 
                    className="h-10 w-10 rounded-full" 
                    src={user.image} 
                    alt={`${user.firstName} ${user.lastName}`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/api/placeholder/40/40';
                    }}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-sm text-gray-500">@{user.username}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.age}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.role === 'admin' ? 'bg-red-100 text-red-800' :
                    user.role === 'moderator' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>{user.company.name}</div>
                  <div className="text-xs text-gray-400">{user.company.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      loading={isDeleting}
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {currentData && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {skip + 1} to {Math.min(skip + limit, total)} of {total} results
            {search && <span className="font-medium"> (filtered)</span>}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={skip === 0}
              onClick={handlePrevPage}
            >
              Previous
            </Button>
            <span className="px-3 py-2 text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={skip + limit >= total}
              onClick={handleNextPage}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList; 
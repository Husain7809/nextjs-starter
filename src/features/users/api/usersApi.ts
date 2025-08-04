import { api } from '@/lib/api';
import type { User, PaginationParams, DummyJsonUsersResponse } from '@/types';

// Define the users API slice for DummyJSON
export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users with pagination
    getUsers: builder.query<DummyJsonUsersResponse, PaginationParams>({
      query: ({ limit = 30, skip = 0 }) => ({
        url: '/users',
        params: { limit, skip },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),

    // Get user by ID
    getUserById: builder.query<User, number>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),

    // Search users
    searchUsers: builder.query<DummyJsonUsersResponse, { q: string; limit?: number; skip?: number }>({
      query: ({ q, limit = 30, skip = 0 }) => ({
        url: '/users/search',
        params: { q, limit, skip },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'SEARCH' },
            ]
          : [{ type: 'User', id: 'SEARCH' }],
    }),

    // Filter users
    filterUsers: builder.query<DummyJsonUsersResponse, { key: string; value: string; limit?: number; skip?: number }>({
      query: ({ key, value, limit = 30, skip = 0 }) => ({
        url: '/users/filter',
        params: { key, value, limit, skip },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'FILTER' },
            ]
          : [{ type: 'User', id: 'FILTER' }],
    }),

    // Sort users
    getSortedUsers: builder.query<DummyJsonUsersResponse, { sortBy: string; order: 'asc' | 'desc'; limit?: number; skip?: number }>({
      query: ({ sortBy, order, limit = 30, skip = 0 }) => ({
        url: '/users',
        params: { sortBy, order, limit, skip },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'SORTED' },
            ]
          : [{ type: 'User', id: 'SORTED' }],
    }),

    // Create new user (simulated)
    createUser: builder.mutation<User, Partial<User>>({
      query: (userData) => ({
        url: '/users/add',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),

    // Update user (simulated)
    updateUser: builder.mutation<User, { id: number; data: Partial<User> }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'User', id },
        { type: 'User', id: 'LIST' },
      ],
    }),

    // Delete user (simulated)
    deleteUser: builder.mutation<{ id: number; isDeleted: boolean; deletedOn: string }, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'User', id },
        { type: 'User', id: 'LIST' },
      ],
    }),
  }),
});

// Export hooks for use in components
export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useSearchUsersQuery,
  useFilterUsersQuery,
  useGetSortedUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi; 
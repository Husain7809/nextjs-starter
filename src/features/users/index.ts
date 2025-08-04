// Export API hooks
export {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useSearchUsersQuery,
  useFilterUsersQuery,
  useGetSortedUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from './api/usersApi';

// Export slice actions and reducer
export {
  setSelectedUser,
  setSearchFilter,
  setSortBy,
  setSortOrder,
  setLoading,
  setError,
  clearFilters,
} from './slice/usersSlice';
export { default as usersReducer } from './slice/usersSlice';

// Export types
export type { User } from '@/types'; 
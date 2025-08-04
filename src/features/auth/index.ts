// Export API hooks
export {
  useLoginMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
} from './api/authApi';

// Export slice actions and reducer
export {
  setUser,
  setToken,
  setLoading,
  setError,
  logout,
  clearError,
} from './slice/authSlice';
export { default as authReducer } from './slice/authSlice'; 
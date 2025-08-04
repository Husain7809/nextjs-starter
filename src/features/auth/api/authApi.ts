import { api } from '@/lib/api';
import type { LoginCredentials, AuthResponse } from '@/types';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Login user with DummyJSON
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: '/user/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Store token in localStorage
          localStorage.setItem('authToken', data.accessToken);
        } catch (error) {
          // Handle error
          console.error('Login failed:', error);
        }
      },
    }),

    // Get current authenticated user
    getCurrentUser: builder.query<AuthResponse, void>({
      query: () => '/user/me',
      providesTags: ['User'],
    }),

    // Logout user (client-side only for DummyJSON)
    logout: builder.mutation<void, void>({
      queryFn: async () => {
        // Remove token from localStorage
        localStorage.removeItem('authToken');
        return { data: undefined };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Invalidate all cached data
          dispatch(api.util.resetApiState());
        } catch (error) {
          // Handle error
          console.error('Logout failed:', error);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
} = authApi; 
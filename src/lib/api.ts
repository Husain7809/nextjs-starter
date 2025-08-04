import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ApiError } from '@/types';

// Define the base API configuration for DummyJSON
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
    prepareHeaders: (headers, { getState }) => {
      // Add auth token if available
      const token = localStorage.getItem('authToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['User', 'Post', 'Comment'], // Define cache tags for invalidation
  endpoints: () => ({}), // Empty endpoints - will be injected by feature slices
});

// Export hooks for use in components
export const {
  middleware: apiMiddleware,
  reducer: apiReducer,
  reducerPath: apiReducerPath,
} = api; 
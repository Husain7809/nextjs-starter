import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/types';

interface UsersState {
  selectedUser: User | null;
  filters: {
    search: string;
    sortBy: 'firstName' | 'lastName' | 'email' | 'age';
    sortOrder: 'asc' | 'desc';
    filterKey: string;
    filterValue: string;
  };
  pagination: {
    limit: number;
    skip: number;
    total: number;
  };
  ui: {
    isLoading: boolean;
    error: string | null;
  };
}

const initialState: UsersState = {
  selectedUser: null,
  filters: {
    search: '',
    sortBy: 'firstName',
    sortOrder: 'asc',
    filterKey: '',
    filterValue: '',
  },
  pagination: {
    limit: 30,
    skip: 0,
    total: 0,
  },
  ui: {
    isLoading: false,
    error: null,
  },
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
      // Reset pagination when searching
      state.pagination.skip = 0;
    },
    setSortBy: (state, action: PayloadAction<'firstName' | 'lastName' | 'email' | 'age'>) => {
      state.filters.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.filters.sortOrder = action.payload;
    },
    setFilter: (state, action: PayloadAction<{ key: string; value: string }>) => {
      state.filters.filterKey = action.payload.key;
      state.filters.filterValue = action.payload.value;
      // Reset pagination when filtering
      state.pagination.skip = 0;
    },
    setPagination: (state, action: PayloadAction<{ limit?: number; skip?: number; total?: number }>) => {
      if (action.payload.limit !== undefined) state.pagination.limit = action.payload.limit;
      if (action.payload.skip !== undefined) state.pagination.skip = action.payload.skip;
      if (action.payload.total !== undefined) state.pagination.total = action.payload.total;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.ui.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.ui.error = action.payload;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination.skip = 0;
    },
    nextPage: (state) => {
      if (state.pagination.skip + state.pagination.limit < state.pagination.total) {
        state.pagination.skip += state.pagination.limit;
      }
    },
    prevPage: (state) => {
      if (state.pagination.skip > 0) {
        state.pagination.skip = Math.max(0, state.pagination.skip - state.pagination.limit);
      }
    },
  },
});

export const {
  setSelectedUser,
  setSearchFilter,
  setSortBy,
  setSortOrder,
  setFilter,
  setPagination,
  setLoading,
  setError,
  clearFilters,
  nextPage,
  prevPage,
} = usersSlice.actions;

export default usersSlice.reducer; 
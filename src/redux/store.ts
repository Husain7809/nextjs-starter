import { configureStore } from '@reduxjs/toolkit';
import { api } from '@/lib/api';
import authReducer from '@/features/auth/slice/authSlice';
import usersReducer from '@/features/users/slice/usersSlice';
import counterReducer from '@/features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    // API reducer
    [api.reducerPath]: api.reducer,
    
    // Feature reducers
    auth: authReducer,
    users: usersReducer,
    counter: counterReducer,
  },
  
  // Add RTK Query middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
    
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

# Next.js Starter with RTK Query

A modern Next.js application with Redux Toolkit Query for efficient API management, featuring authentication, user management, and a well-organized folder structure.

## 🚀 Features

- **RTK Query**: Efficient API data fetching with automatic caching, background updates, and optimistic updates
- **Authentication**: Secure user authentication with JWT tokens
- **User Management**: Full CRUD operations for user management
- **Organized Structure**: Clean, scalable folder structure with feature-based organization
- **TypeScript**: Full TypeScript support with proper type definitions
- **Tailwind CSS**: Modern styling with Tailwind CSS
- **Redux Toolkit**: Modern Redux with RTK for state management

## 📁 Folder Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   │   └── login/
│   ├── users/             # User management pages
│   ├── counter/           # Demo counter page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── providers.tsx      # Redux provider
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   │   └── Button.tsx
│   ├── Auth/             # Authentication components
│   │   └── LoginForm.tsx
│   ├── Users/            # User management components
│   │   └── UserList.tsx
│   └── Counter.tsx       # Demo counter component
├── features/             # Feature-based modules
│   ├── auth/             # Authentication feature
│   │   ├── api/          # RTK Query API endpoints
│   │   │   └── authApi.ts
│   │   ├── slice/        # Redux slices
│   │   │   └── authSlice.ts
│   │   └── index.ts      # Feature exports
│   ├── users/            # Users feature
│   │   ├── api/          # RTK Query API endpoints
│   │   │   └── usersApi.ts
│   │   ├── slice/        # Redux slices
│   │   │   └── usersSlice.ts
│   │   └── index.ts      # Feature exports
│   └── counter/          # Counter feature (demo)
│       └── counterSlice.ts
├── lib/                  # Utility libraries
│   ├── api.ts           # RTK Query base configuration
│   └── utils.ts         # Utility functions
├── redux/               # Redux configuration
│   ├── store.ts         # Redux store setup
│   └── hooks.ts         # Typed Redux hooks
├── types/               # TypeScript type definitions
│   └── index.ts
└── middleware.ts        # Next.js middleware
```

## 🛠️ Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=https://your-api-url.com
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Usage

### RTK Query API Setup

The application uses RTK Query for efficient API management. Here's how it's structured:

#### Base API Configuration (`src/lib/api.ts`)
```typescript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Post', 'Comment'],
  endpoints: () => ({}),
});
```

#### Feature API Slices (`src/features/users/api/usersApi.ts`)
```typescript
import { api } from '@/lib/api';

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<PaginatedResponse<User>, PaginationParams>({
      query: ({ page, limit }) => ({
        url: '/users',
        params: { page, limit },
      }),
      providesTags: (result) => [
        ...result?.data.map(({ id }) => ({ type: 'User', id })) || [],
        { type: 'User', id: 'LIST' },
      ],
    }),
    // ... other endpoints
  }),
});
```

### Using RTK Query Hooks

```typescript
import { useGetUsersQuery, useCreateUserMutation } from '@/features/users';

function UserList() {
  const { data, isLoading, error } = useGetUsersQuery({ page: 1, limit: 10 });
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();

  // Use the data, loading states, and mutations
}
```

### Redux Store Configuration

The store is configured with RTK Query middleware:

```typescript
import { configureStore } from '@reduxjs/toolkit';
import { api } from '@/lib/api';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    users: usersReducer,
    // ... other reducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
```

## 🎯 Key Features Explained

### 1. Feature-Based Organization
Each feature (auth, users, etc.) is organized in its own folder with:
- **API layer**: RTK Query endpoints
- **State layer**: Redux slices for local state
- **Components**: Feature-specific components
- **Types**: Feature-specific TypeScript types

### 2. RTK Query Benefits
- **Automatic caching**: Data is cached and reused across components
- **Background updates**: Data is automatically refetched when needed
- **Optimistic updates**: UI updates immediately while API calls are in progress
- **Loading states**: Built-in loading and error states
- **Cache invalidation**: Automatic cache management with tags

### 3. Type Safety
- Full TypeScript support throughout the application
- Proper type definitions for API responses
- Typed Redux hooks and actions

### 4. Clean Architecture
- No unnecessary dependencies (removed axios in favor of RTK Query's fetch)
- Removed legacy code and unused files
- Modern React patterns with hooks and functional components

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📝 Environment Variables

- `NEXT_PUBLIC_API_URL` - Your API base URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

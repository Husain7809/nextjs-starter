"use client";
import { fetchUsers } from "@/features/users/userThunks";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();

  const { error, loading, users } = useAppSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main>
      <div>
        <h1>User List</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}

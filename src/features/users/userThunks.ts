import { httpConfig } from "@/services/api-config/api-config";
import apiClient from "@/services/config/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch users thunk
export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get(httpConfig.user.fetch);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

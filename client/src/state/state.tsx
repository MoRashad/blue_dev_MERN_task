import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  _id: string;
  user: string;
  taskName: string;
  tag: string;
  description: string | null;
  dueDate: Date;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  tasks: Task[];
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  tasks: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (
      state,
      action: PayloadAction<{
        user: string;
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    setLogout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    setTasks: (state, action: PayloadAction<{ tasks: Task[] }>) => {
      state.tasks = action.payload.tasks;
    },
  },
});

export const { setLogin, setLogout, setTasks } = authSlice.actions;

export default authSlice.reducer;

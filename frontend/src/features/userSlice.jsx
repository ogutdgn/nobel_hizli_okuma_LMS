import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.error = false;
      state.loading = true;
    },
    fetchSuccess: (state, { payload }) => {
      state.users = payload;
      state.loading = false;
      state.error = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    addUser: (state, { payload }) => {
      state.users.push(payload);
    },
    updateUser: (state, { payload }) => {
      const index = state.users.findIndex(user => user._id === payload._id);
      if (index !== -1) {
        state.users[index] = payload;
      }
    },
    deleteUser: (state, { payload }) => {
      state.users = state.users.filter(user => user._id !== payload);
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFail,
  addUser,
  updateUser,
  deleteUser,
} = userSlice.actions;

export default userSlice.reducer;

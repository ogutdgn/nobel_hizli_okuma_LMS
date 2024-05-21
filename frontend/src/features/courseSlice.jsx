import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  loading: false,
  error: false,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.error = false;
      state.loading = true;
    },
    fetchSuccess: (state, { payload }) => {
      state.courses = payload;
      state.loading = false;
      state.error = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    addCourse: (state, { payload }) => {
      state.courses.push(payload);
    },
    updateCourse: (state, { payload }) => {
      const index = state.courses.findIndex(course => course._id === payload._id);
      if (index !== -1) {
        state.courses[index] = payload;
      }
    },
    deleteCourse: (state, { payload }) => {
      state.courses = state.courses.filter(course => course._id !== payload);
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFail,
  addCourse,
  updateCourse,
  deleteCourse,
} = courseSlice.actions;

export default courseSlice.reducer;

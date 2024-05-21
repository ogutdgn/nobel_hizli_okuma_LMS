import { useDispatch } from "react-redux";
import { fetchStart, fetchSuccess, fetchFail, addCourse, updateCourse, deleteCourse } from "../features/courseSlice";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useCourseCalls = () => {
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();

  const getCourses = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get("/courses/");
      dispatch(fetchSuccess(data.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Courses could not be fetched.");
    }
  };

  const postCourse = async (courseInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post("/courses/", courseInfo);
      dispatch(addCourse(data.data));
      toastSuccessNotify("Course added successfully.");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Course could not be added.");
    }
  };

  const putCourse = async (courseInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.put(`/courses/${courseInfo._id}/`, courseInfo);
      dispatch(updateCourse(data.data));
      toastSuccessNotify("Course updated successfully.");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Course could not be updated.");
    }
  };

  const removeCourse = (courseId) => async (dispatch) => {
    dispatch(fetchStart());
    try {
        console.log("Deleting course with ID:", courseId);
        const response = await axiosWithToken.delete(`/courses/${courseId}/`);
        if (response.status === 200) {
            console.log("Course deleted successfully:", courseId);
            dispatch(deleteCourse(courseId));
            toastSuccessNotify(response.data.message || "Course deleted successfully.");
        } else {
            console.log("Failed to delete course, status code:", response.status);
            throw new Error(response.data.message || "Course could not be deleted.");
        }
    } catch (error) {
        console.log("Error response:", error.response);
        dispatch(fetchFail());
        if (error.response && error.response.status === 404) {
            toastErrorNotify("Course not found.");
        } else {
            toastErrorNotify(error.message || "Course could not be deleted.");
        }
    }
};

  return { getCourses, postCourse, putCourse, removeCourse };
};

export default useCourseCalls;

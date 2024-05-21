import { useDispatch } from "react-redux";
import { fetchStart, fetchSuccess, fetchFail, addEnrollment, updateEnrollment, deleteEnrollment, setDeletingId } from "../features/enrollmentSlice";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useEnrollmentCalls = () => {
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();

  const getEnrollments = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get("/enrollments/");
      dispatch(fetchSuccess(data.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Enrollments could not be fetched.");
    }
  };

  const postEnrollment = async (enrollmentInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post("/enrollments/", enrollmentInfo);
      dispatch(addEnrollment(data.data));
      toastSuccessNotify("Enrollment added successfully.");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Enrollment could not be added.");
    }
  };

  const putEnrollment = async (enrollmentInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.put(`/enrollments/${enrollmentInfo._id}/`, enrollmentInfo);
      dispatch(updateEnrollment(data.data));
      toastSuccessNotify("Enrollment updated successfully.");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Enrollment could not be updated.");
    }
  };

  const removeEnrollment = (enrollmentId) => async (dispatch) => {
    dispatch(fetchStart());
    dispatch(setDeletingId(enrollmentId));
    try {
        console.log("Deleting enrollment with ID:", enrollmentId);
        const response = await axiosWithToken.delete(`/enrollments/${enrollmentId}/`);
        if (response.status === 200) {
            console.log("Enrollment deleted successfully:", enrollmentId);
            dispatch(deleteEnrollment(enrollmentId));
            toastSuccessNotify(response.data.message || "Enrollment deleted successfully.");
        } else {
            console.log("Failed to delete enrollment, status code:", response.status);
            throw new Error(response.data.message || "Enrollment could not be deleted.");
        }
    } catch (error) {
        console.log("Error response:", error.response);
        dispatch(fetchFail());
        if (error.response && error.response.status === 404) {
            toastErrorNotify("Enrollment not found.");
        } else {
            toastErrorNotify(error.message || "Enrollment could not be deleted.");
        }
    } finally {
      dispatch(setDeletingId(null));
    }
  };

  return { getEnrollments, postEnrollment, putEnrollment, removeEnrollment };
};

export default useEnrollmentCalls;

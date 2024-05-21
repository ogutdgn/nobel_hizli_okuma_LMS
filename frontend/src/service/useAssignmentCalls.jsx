import { useDispatch } from "react-redux";
import { fetchStart, fetchSuccess, fetchFail, addAssignment, updateAssignment, deleteAssignment, setDeletingId } from "../features/assignmentSlice";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useAssignmentCalls = () => {
    const dispatch = useDispatch();
    const { axiosWithToken } = useAxios();
  
    const getAssignments = async () => {
      dispatch(fetchStart());
      try {
        const { data } = await axiosWithToken.get("/assignments/");
        console.log("Assignments fetched:", data); // Log assignments
        dispatch(fetchSuccess(data.data));
      } catch (error) {
        console.error("Error fetching assignments:", error.response?.data || error.message);
        dispatch(fetchFail());
        toastErrorNotify("Assignments could not be fetched.");
      }
    };

  const postAssignment = async (assignmentInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post("/assignments/", assignmentInfo);
      dispatch(addAssignment(data.data));
      toastSuccessNotify("Assignment added successfully.");
    } catch (error) {
      console.error("Error creating assignment:", error.response?.data || error.message);
      dispatch(fetchFail());
      toastErrorNotify("Assignment could not be added.");
    }
  };

  const putAssignment = async (assignmentInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.put(`/assignments/${assignmentInfo._id}/`, assignmentInfo);
      dispatch(updateAssignment(data.data));
      toastSuccessNotify("Assignment updated successfully.");
    } catch (error) {
      console.error("Error updating assignment:", error.response?.data || error.message);
      dispatch(fetchFail());
      toastErrorNotify("Assignment could not be updated.");
    }
  };

  const removeAssignment = (assignmentId) => async (dispatch) => {
    dispatch(fetchStart());
    dispatch(setDeletingId(assignmentId));
    try {
        console.log("Deleting assignment with ID:", assignmentId);
        const response = await axiosWithToken.delete(`/assignments/${assignmentId}/`);
        if (response.status === 204) {
            console.log("Assignment deleted successfully:", assignmentId);
            dispatch(deleteAssignment(assignmentId));
            toastSuccessNotify(response.data?.message || "Assignment deleted successfully.");
        } else {
            console.log("Failed to delete assignment, status code:", response.status);
            throw new Error(response.data?.message || "Assignment could not be deleted.");
        }
    } catch (error) {
        console.log("Error response:", error.response?.data || error.message);
        dispatch(fetchFail());
        if (error.response && error.response.status === 404) {
            toastErrorNotify("Assignment not found.");
        } else {
            toastErrorNotify(error.message || "Assignment could not be deleted.");
        }
    } finally {
      dispatch(setDeletingId(null));
    }
  };

  return { getAssignments, postAssignment, putAssignment, removeAssignment };
};

export default useAssignmentCalls;

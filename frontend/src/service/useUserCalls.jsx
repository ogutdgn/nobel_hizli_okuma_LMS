import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import { fetchStart, fetchSuccess, fetchFail, addUser, updateUser as updateUserAction, deleteUser } from "../features/userSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useUserCalls = () => {
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();

  const getUsers = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get("/users");
      dispatch(fetchSuccess(data.data));
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
      dispatch(fetchFail());
      toastErrorNotify("Users could not be fetched.");
    }
  };

  const getStudents = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get("/users?filter[isAdmin]=false");
      dispatch(fetchSuccess(data.data));
    } catch (error) {
      console.error("Error fetching students:", error.response?.data || error.message);
      dispatch(fetchFail());
      toastErrorNotify("Students could not be fetched.");
    }
  };

  const postUser = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post("/users/", userInfo);
      dispatch(addUser(data.data));
      toastSuccessNotify("User added successfully.");
    } catch (error) {
      console.error("Error creating user:", error.response?.data || error.message);
      dispatch(fetchFail());
      toastErrorNotify("User could not be added.");
    }
  };

  const updateUserCall = (userInfo) => async (dispatch) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.put(`/users/${userInfo._id}/`, userInfo);
      dispatch(updateUserAction(data.data));
      toastSuccessNotify("User updated successfully.");
    } catch (error) {
      console.error("Error updating user:", error.response?.data || error.message);
      dispatch(fetchFail());
      toastErrorNotify("User could not be updated.");
    }
  };

  const removeUser = (userId) => async (dispatch) => {
    dispatch(fetchStart());
    try {
      const response = await axiosWithToken.delete(`/users/${userId}/`);
      if (response.status === 204) {
        dispatch(deleteUser(userId));
        toastSuccessNotify("User deleted successfully.");
      } else {
        throw new Error(response.data?.message || "User could not be deleted.");
      }
    } catch (error) {
      console.error("Error deleting user:", error.response?.data || error.message);
      dispatch(fetchFail());
      if (error.response && error.response.status === 404) {
        toastErrorNotify("User not found.");
      } else {
        toastErrorNotify("User could not be deleted.");
      }
    }
  };

  return { getUsers, getStudents, postUser, updateUserCall, removeUser };
};

export default useUserCalls;

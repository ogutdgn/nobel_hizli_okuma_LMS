import { useDispatch } from "react-redux";
import { fetchStart, fetchSuccess, fetchFail, addUser, updateUser, deleteUser } from "../features/userSlice";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

const useUserCalls = () => {
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();

  const getUsers = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get("/users/");
      dispatch(fetchSuccess(data.data));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Users could not be fetched.");
    }
  };

  const postUser = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.post("/users/", userInfo);
      dispatch(addUser(data.data));
      toastSuccessNotify("User added successfully.");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("User could not be added.");
    }
  };

  const putUser = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.put(`/users/${userInfo._id}/`, userInfo);
      dispatch(updateUser(data.data));
      toastSuccessNotify("User updated successfully.");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("User could not be updated.");
    }
  };

  const removeUser = async (userId) => {
    dispatch(fetchStart());
    try {
        const { data } = await axiosWithToken.delete(`/users/${userId}/`);
        dispatch(deleteUser(userId));
        toastSuccessNotify(data.message || "User deleted successfully.");
    } catch (error) {
        dispatch(fetchFail());
        toastErrorNotify("User could not be deleted.");
    }
};


  return { getUsers, postUser, putUser, removeUser };
};

export default useUserCalls;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useUserCalls from "../service/useUserCalls";

const Students = () => {
  const { getUsers, removeUser } = useUserCalls();
  const { users, loading, error } = useSelector(state => state.user);
  const dispatch = useDispatch();


  useEffect(() => {
    getUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading users.</p>;

  const handleDelete = async (userId) => {

      try {
        await dispatch(removeUser(userId));
      } catch (e) {
        console.error(e);
      } 
    getUsers();
  };

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.username} - {user.email}
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Students;

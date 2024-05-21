import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useAssignmentCalls from "../service/useAssignmentCalls";

const Assignments = () => {
  const dispatch = useDispatch();
  const { getAssignments, postAssignment, removeAssignment } = useAssignmentCalls();
  const { assignments, loading, error, deletingId } = useSelector(state => state.assignment);
  const { user } = useSelector(state => state.auth);

  const [deleting, setDeleting] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    studentId: "",
    teacherId: user._id,
    taskContent: "",
  });

  useEffect(() => {
    getAssignments();
  }, []);

  const handleDelete = async (assignmentId) => {
    if (!deleting) {
      setDeleting(true);
      try {
        await dispatch(removeAssignment(assignmentId));
      } catch (e) {
        console.error(e);
      } finally {
        setDeleting(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(postAssignment(newAssignment));
      setNewAssignment({
        studentId: "",
        teacherId: user._id,
        taskContent: "",
      });
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading assignments.</p>;

  return (
    <div>
      <h1>Assignment List</h1>
      {user.isAdmin && (
        <form onSubmit={handleSubmit}>
          <label>
            Student ID:
            <input
              type="text"
              value={newAssignment.studentId}
              onChange={(e) => setNewAssignment({ ...newAssignment, studentId: e.target.value })}
              required
            />
          </label>
          <label>
            Task Content:
            <input
              type="text"
              value={newAssignment.taskContent}
              onChange={(e) => setNewAssignment({ ...newAssignment, taskContent: e.target.value })}
              required
            />
          </label>
          <button type="submit">Add Assignment</button>
        </form>
      )}
      <ul>
        {assignments?.map(assignment => (
          <li key={assignment._id}>
            {assignment.studentId.username} - {assignment.teacherId.username} - {assignment.taskContent}
            {user.isAdmin && (
              <button
                onClick={() => handleDelete(assignment._id)}
                disabled={deletingId === assignment._id}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Assignments;

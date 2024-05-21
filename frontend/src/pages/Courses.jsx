  import React, { useEffect, useState } from "react";
  import { useSelector, useDispatch } from "react-redux";
  import useCourseCalls from "../service/useCourseCalls";

  const Courses = () => {
    const dispatch = useDispatch();
    const { getCourses, removeCourse } = useCourseCalls();
    const { courses, loading, error } = useSelector(state => state.course);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
      getCourses();
    }, []);

    const handleDelete = async (courseId) => {
      if (!deleting) {
        setDeleting(true);
        try {
          await dispatch(removeCourse(courseId));
        } catch (e) {
          console.error(e);
        } finally {
          setDeleting(false);
        }
      }
      getCourses();
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading courses.</p>;

    return (
      <div>
        <h1>Course List</h1>
        <ul>
          {courses.map(course => (
            <li key={course._id}>
              {course.courseName} - {course.courseContent}
              <button
                onClick={() => handleDelete(course._id)}
                disabled={deleting}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  export default Courses;

import { useState, useEffect, useCallback } from "react";
import { getCourseById } from "../services/courseService.js";
import { getUsersByIds } from "../services/userService.js";

export function useCourseData(courseId) {
  const [course, setCourse] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourseData = useCallback(async () => {
    try {
      setLoading(true);
      const courseResponse = await getCourseById(courseId);
      setCourse(courseResponse.data);

      if (courseResponse.data.instructors?.length > 0) {
        const instructorsResponse = await getUsersByIds(
          courseResponse.data.instructors
        );
        setInstructors(instructorsResponse.data);
      } else {
        setInstructors([]);
      }
      setError(null);
    } catch (err) {
      setError("Falha ao carregar dados do curso.");
      console.error("Falha ao carregar dados do curso.", err);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchCourseData();
  }, [fetchCourseData]);

  return {
    course,
    instructors,
    loading,
    error,
    fetchCourseData,
    setCourse,
    setInstructors,
  };
}

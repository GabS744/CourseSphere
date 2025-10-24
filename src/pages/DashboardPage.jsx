import { useState, useEffect, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { getCourses } from "../services/courseService.js";
import CourseCard from "../components/3-organisms/CourseCard.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

function DashboardPage() {
  const { setRefetchCourses } = useOutletContext();
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await getCourses();
      const userCourses = response.data.filter(
        (course) =>
          course.creator_id == user.id || course.instructors.includes(user.id)
      );
      setCourses(userCourses);
    } catch (err) {
      setError("Falha ao carregar os cursos.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    if (setRefetchCourses) {
      setRefetchCourses(() => fetchCourses);
    }
  }, [setRefetchCourses, fetchCourses]);

  if (loading) {
    return <p>Carregando cursos...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Meus Cursos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <p>Você ainda não está participando de nenhum curso.</p>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;

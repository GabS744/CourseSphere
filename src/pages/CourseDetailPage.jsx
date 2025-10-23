import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCourseById } from "../services/courseService.js";

import TabNavigation from "../components/3-organisms/TabNavigation.jsx";
import InstructorsTab from "../components/4-templates/InstructorsTab.jsx";
import CourseDataTab from "../components/4-templates/CourseDataTab.jsx";
import LessonListItem from "../components/3-organisms/LessonListItem.jsx";
import LessonsTab from "../components/4-templates/LessonsTab.jsx";

function CourseDetailPage() {
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("dados");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await getCourseById(courseId);
        setCourse(response.data);
      } catch (err) {
        setError("Falha ao carregar os detalhes do curso.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) return <p>Carregando detalhes do curso...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">{course.name}</h1>
        <div className="flex space-x-2">
          <button className="px-5 py-2 text-white font-bold bg-[#34D399] rounded-lg shadow-md hover:bg-green-600">
            Editar Curso
          </button>
          <button className="px-5 py-2 text-white font-bold bg-red-500 rounded-lg shadow-md hover:bg-red-600">
            Excluir Curso
          </button>
        </div>
      </div>

      <div className="flex space-x-8">
        <div className="w-1/4">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="w-3/4">
          {activeTab === "dados" && <CourseDataTab course={course} />}
          {activeTab === "instrutores" && <InstructorsTab course={course} />}
          {activeTab === "aulas" && <LessonsTab course={course} />}
        </div>
      </div>
    </div>
  );
}

export default CourseDetailPage;

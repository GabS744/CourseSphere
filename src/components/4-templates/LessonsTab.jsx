import { useState, useEffect, useMemo, useCallback } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import {
  getLessonsByCourseId,
  deleteLesson,
} from "../../services/lessonService.js";
import LessonListItem from "../3-organisms/LessonListItem.jsx";
import CreateLessonModal from "../3-organisms/CreateLessonModal.jsx";
import EditLessonModal from "../3-organisms/EditLessonModal.jsx";
import ConfirmationModal from "../3-organisms/ConfirmationModal.jsx";
import Button from "../1-atoms/Button.jsx";

function LessonsTab({ course }) {
  const { user } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [lessonToDelete, setLessonToDelete] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const fetchLessons = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getLessonsByCourseId(course.id);
      setLessons(response.data);
    } catch (error) {
      console.error("Falha ao buscar aulas", error);
    } finally {
      setLoading(false);
    }
  }, [course.id]);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  const filteredLessons = useMemo(() => {
    setCurrentPage(1);
    return lessons.filter((lesson) => {
      const matchesSearch = lesson.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || lesson.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [lessons, searchTerm, statusFilter]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLessons = filteredLessons.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredLessons.length / itemsPerPage);

  const handleDeleteLesson = (lesson) => {
    setLessonToDelete(lesson);
  };

  const onConfirmDeleteLesson = async () => {
    if (!lessonToDelete) return;
    try {
      await deleteLesson(lessonToDelete.id);
      fetchLessons();
    } catch (error) {
      alert("Falha ao excluir a aula.");
    } finally {
      setLessonToDelete(null);
    }
  };

  if (loading) return <p>Carregando aulas...</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Procurando por alguma aula específica?"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Todos os Status</option>
          <option value="published">Publicado</option>
          <option value="draft">Rascunho</option>
          <option value="archived">Arquivado</option>
        </select>
      </div>

      <div className="space-y-4 min-h-[280px]">
        {currentLessons.length > 0 ? (
          currentLessons.map((lesson) => {
            const canEditOrDelete =
              user.id == course.creator_id || user.id == lesson.creator_id;
            return (
              <LessonListItem
                key={lesson.id}
                lesson={lesson}
                canEditOrDelete={canEditOrDelete}
                onEdit={() => setEditingLesson(lesson)}
                onDelete={() => handleDeleteLesson(lesson)}
              />
            );
          })
        ) : (
          <p className="text-center text-gray-500 py-8">
            Nenhuma aula encontrada.
          </p>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-1">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded-md text-sm font-bold ${
                currentPage === index + 1
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-5 py-2 text-white font-bold bg-green-500 rounded-lg shadow-md hover:bg-green-600"
        >
          Criar Nova Aula
        </Button>
      </div>

      {isCreateModalOpen && (
        <CreateLessonModal
          courseId={course.id}
          onClose={() => setIsCreateModalOpen(false)}
          onLessonCreated={fetchLessons}
        />
      )}
      {editingLesson && (
        <EditLessonModal
          lesson={editingLesson}
          onClose={() => setEditingLesson(null)}
          onLessonUpdated={fetchLessons}
        />
      )}
      {lessonToDelete && (
        <ConfirmationModal
          title="Confirmar Exclusão"
          message={`Tem certeza que deseja excluir a aula "${lessonToDelete.title}"?`}
          onConfirm={onConfirmDeleteLesson}
          onClose={() => setLessonToDelete(null)}
        />
      )}
    </div>
  );
}

export default LessonsTab;

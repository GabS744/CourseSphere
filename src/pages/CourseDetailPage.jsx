import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useCourseData } from "../hooks/useCourseData.js";
import { useCourseActions } from "../hooks/useCourseActions.js";
import { useInstructorManagement } from "../hooks/useInstructorManagement.js";
import TabNavigation from "../components/3-organisms/TabNavigation.jsx";
import CourseDataTab from "../components/4-templates/CourseDataTab.jsx";
import InstructorsTab from "../components/4-templates/InstructorsTab.jsx";
import LessonsTab from "../components/4-templates/LessonsTab.jsx";
import EditCourseModal from "../components/3-organisms/EditCourseModal.jsx";
import ConfirmationModal from "../components/3-organisms/ConfirmationModal.jsx";
import ManageInstructorsModal from "../components/3-organisms/ManageInstructorsModal.jsx";
import Button from "../components/1-atoms/Button.jsx";

function CourseDetailPage() {
  const { courseId } = useParams();
  const { user } = useAuth();

  const {
    course,
    instructors,
    loading,
    error,
    fetchCourseData,
    setCourse,
    setInstructors,
  } = useCourseData(courseId);
  const {
    isEditModalOpen,
    isDeleteModalOpen,
    openEditModal,
    closeEditModal,
    openDeleteModal,
    closeDeleteModal,
    confirmDeleteCourse,
  } = useCourseActions(course);
  const {
    isManageModalOpen,
    instructorToRemove,
    suggestions,
    suggestionsLoading,
    openManageModal,
    closeManageModal,
    addInstructor,
    removeInstructor,
    confirmRemoveInstructor,
    closeConfirmRemoveModal,
  } = useInstructorManagement(course, setCourse, setInstructors);

  const [activeTab, setActiveTab] = useState("dados");

  const isCreator = user && course && user.id == course.creator_id;

  if (loading) return <p className="p-8">Carregando...</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;
  if (!course) return <p className="p-8">Curso não encontrado.</p>;

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">{course.name}</h1>
          {isCreator && (
            <div className="flex space-x-4">
              <Button onClick={openEditModal} variant="primary">
                Editar Curso
              </Button>
              <Button onClick={openDeleteModal} variant="danger">
                Excluir Curso
              </Button>
            </div>
          )}
        </div>

        <div className="flex space-x-8">
          <div className="w-1/4">
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <div className="w-3/4">
            {activeTab === "dados" && <CourseDataTab course={course} />}
            {activeTab === "instrutores" && (
              <InstructorsTab
                course={course}
                instructors={instructors}
                isCreator={isCreator}
                onRemove={removeInstructor}
                onManage={openManageModal}
              />
            )}
            {activeTab === "aulas" && <LessonsTab course={course} />}
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <EditCourseModal
          course={course}
          onClose={closeEditModal}
          onUpdate={fetchCourseData}
        />
      )}
      {isDeleteModalOpen && (
        <ConfirmationModal
          title="Confirmar Exclusão de Curso"
          message={`Tem certeza que deseja excluir o curso "${course.name}"?`}
          onConfirm={confirmDeleteCourse}
          onClose={closeDeleteModal}
        />
      )}
      {isManageModalOpen && (
        <ManageInstructorsModal
          suggestions={suggestions}
          loading={suggestionsLoading}
          onClose={closeManageModal}
          onAddInstructor={addInstructor}
        />
      )}
      {instructorToRemove && (
        <ConfirmationModal
          title="Confirmar Remoção de Instrutor"
          message="Tem certeza que deseja remover este instrutor do curso?"
          onConfirm={confirmRemoveInstructor}
          onClose={closeConfirmRemoveModal}
        />
      )}
    </>
  );
}

export default CourseDetailPage;

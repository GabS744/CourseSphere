import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCourse } from "../services/courseService.js";
import { toast } from "react-toastify";

export function useCourseActions(course) {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteCourse = () => {
    setIsDeleteModalOpen(true);
  };

  const onConfirmDeleteCourse = async () => {
    if (!course) return;
    try {
      await deleteCourse(course.id);
      toast.success("Curso excluído com sucesso!");
      navigate("/");
    } catch (error) {
      toast.error("Falha ao excluir o curso.");
      console.error("Erro ao excluir curso:", error);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  return {
    isEditModalOpen,
    isDeleteModalOpen,
    openEditModal: () => setIsEditModalOpen(true),
    closeEditModal: () => setIsEditModalOpen(false),
    openDeleteModal: handleDeleteCourse,
    closeDeleteModal: () => setIsDeleteModalOpen(false),
    confirmDeleteCourse: onConfirmDeleteCourse,
  };
}

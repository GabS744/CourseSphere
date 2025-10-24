import { useState } from "react";
import { updateCourse } from "../services/courseService.js";
import { getSuggestedUsers, addUser } from "../services/userService.js";

export function useInstructorManagement(course, setCourse, setInstructors) {
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [instructorToRemove, setInstructorToRemove] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);

  const handleOpenManageModal = async () => {
    setIsManageModalOpen(true);
    setSuggestionsLoading(true);
    try {
      const response = await getSuggestedUsers(5);
      setSuggestions(response.data.results || []);
    } catch (error) {
      console.error("Erro ao buscar sugestões", error);
    } finally {
      setSuggestionsLoading(false);
    }
  };

  const handleAddInstructor = async (instructorToAdd) => {
    try {
      let newInstructorId;
      let newInstructorObject;
      const isInternalUser =
        instructorToAdd.id && typeof instructorToAdd.id !== "object";

      if (isInternalUser) {
        newInstructorId = instructorToAdd.id;
        newInstructorObject = instructorToAdd;
      } else {
        const newUser = {
          name: `${instructorToAdd.name.first} ${instructorToAdd.name.last}`,
          email: instructorToAdd.email,
          password: "default_password",
          picture: instructorToAdd.picture,
        };
        const savedUserResponse = await addUser(newUser);
        newInstructorObject = savedUserResponse.data;
        newInstructorId = newInstructorObject.id;
      }

      if (course.instructors.map(String).includes(String(newInstructorId))) {
        alert("Este instrutor já faz parte do curso.");
        return;
      }

      const updatedInstructorIds = [...course.instructors, newInstructorId];
      await updateCourse(course.id, { instructors: updatedInstructorIds });

      setCourse((prev) => ({ ...prev, instructors: updatedInstructorIds }));
      setInstructors((prev) => [...prev, newInstructorObject]);
      setIsManageModalOpen(false);
    } catch (error) {
      alert("Falha ao adicionar instrutor.");
    }
  };

  const handleRemoveInstructor = (instructorId) => {
    setInstructorToRemove(instructorId);
  };

  const onConfirmRemoveInstructor = async () => {
    const newInstructorsList = course.instructors.filter(
      (id) => id != instructorToRemove
    );
    try {
      await updateCourse(course.id, { instructors: newInstructorsList });

      setCourse((prev) => ({ ...prev, instructors: newInstructorsList }));
      setInstructors((prev) =>
        prev.filter((inst) => inst.id != instructorToRemove)
      );
    } catch (error) {
      alert("Falha ao remover o instrutor.");
    } finally {
      setInstructorToRemove(null);
    }
  };

  return {
    isManageModalOpen,
    instructorToRemove,
    suggestions,
    suggestionsLoading,
    openManageModal: handleOpenManageModal,
    closeManageModal: () => setIsManageModalOpen(false),
    addInstructor: handleAddInstructor,
    removeInstructor: handleRemoveInstructor,
    confirmRemoveInstructor: onConfirmRemoveInstructor,
    closeConfirmRemoveModal: () => setInstructorToRemove(null),
  };
}

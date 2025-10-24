import React, { useState, useEffect } from "react";
import { updateCourse } from "../../services/courseService.js";
import Button from "../1-atoms/Button.jsx";
import Label from "../1-atoms/Label.jsx";
import Textarea from "../1-atoms/Textarea.jsx";

function EditCourseModal({ course, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    if (course) {
      setFormData({
        name: course.name,
        description: course.description,
        start_date: course.start_date,
        end_date: course.end_date,
      });
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedCourseData = {
      ...course,
      ...formData,
    };
    try {
      await updateCourse(course.id, updatedCourseData);
      alert("Curso atualizado com sucesso!");
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar curso:", error);
      alert("Falha ao atualizar o curso.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Editar Curso</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-3xl font-bold"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label>Nome do Curso</Label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <Label>Descrição</Label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <Label>Data de Início</Label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <Label>Data de Fim</Label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button>Salvar Alterações</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default EditCourseModal;

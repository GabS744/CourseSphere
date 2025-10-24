import React, { useState, useEffect } from "react";
import { updateLesson } from "../../services/lessonService.js";
import Button from "../1-atoms/Button.jsx";
import Label from "../1-atoms/Label.jsx";

function EditLessonModal({ lesson, onClose, onLessonUpdated }) {
  const [formData, setFormData] = useState({
    title: "",
    video_url: "",
    status: "draft",
    publish_date: "",
  });

  useEffect(() => {
    if (lesson) {
      setFormData({
        title: lesson.title,
        video_url: lesson.video_url,
        status: lesson.status,
        publish_date: lesson.publish_date,
      });
    }
  }, [lesson]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (new Date(formData.publish_date) <= new Date()) {
      alert("A data de publicação deve ser uma data futura.");
      return;
    }
    try {
      await updateLesson(lesson.id, formData);
      alert("Aula atualizada com sucesso!");
      onLessonUpdated();
      onClose();
    } catch (error) {
      alert("Falha ao atualizar a aula.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Editar Aula</h2>
          <button
            onClick={onClose}
            className="text-gray-500 text-3xl font-bold"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Título da Aula</Label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
              minLength="3"
            />
          </div>
          <div>
            <Label>URL do Vídeo</Label>
            <input
              type="url"
              name="video_url"
              value={formData.video_url}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Status</Label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg bg-white"
              >
                <option value="draft">Rascunho</option>
                <option value="published">Publicado</option>
                <option value="archived">Arquivado</option>
              </select>
            </div>
            <div>
              <Label>Data de Publicação</Label>
              <input
                type="date"
                name="publish_date"
                value={formData.publish_date}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <Button>Salvar Alterações</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default EditLessonModal;

import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { createLesson } from "../../services/lessonService.js";
import Button from "../1-atoms/Button.jsx";
import Label from "../1-atoms/Label.jsx";

function CreateLessonModal({ courseId, onClose, onLessonCreated }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    video_url: "",
    status: "draft",
    publish_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.title.length < 3) {
      console.error("Validation Error: Title must be at least 3 characters.");
      return;
    }
    try {
      new URL(formData.video_url);
    } catch (_) {
      console.error("Validation Error: Invalid video URL.");
      return;
    }
    if (new Date(formData.publish_date) <= new Date()) {
      console.error("Validation Error: Publish date must be in the future.");
      return;
    }

    const newLesson = {
      ...formData,
      course_id: courseId,
      creator_id: user.id,
    };

    try {
      await createLesson(newLesson);
      onLessonCreated();
      onClose();
    } catch (error) {
      console.error("Erro ao criar aula:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Criar Nova Aula</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-3xl font-bold"
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
              placeholder="https://..."
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
                required
              >
                <option value="draft">Rascunho (draft)</option>
                <option value="published">Publicado (published)</option>
                <option value="archived">Arquivado (archived)</option>
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
            <Button type="submit">Salvar Aula</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateLessonModal;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { createCourse } from "../../services/courseService.js";
import { toast } from "react-toastify";
import Button from "../1-atoms/Button.jsx";
import Label from "../1-atoms/Label.jsx";
import Textarea from "../1-atoms/Textarea.jsx";

function CreateCourseModal({ onClose, onCourseCreated }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(formData.end_date) <= new Date(formData.start_date)) {
      toast.error("A data final deve ser posterior à data de início.");
      return;
    }

    const newCourse = {
      ...formData,
      creator_id: user.id,
      instructors: [user.id],
    };

    try {
      await createCourse(newCourse);
      toast.success("Curso criado com sucesso!");
      if (onCourseCreated) {
        onCourseCreated();
      }
      onClose(true);
      navigate("/");
    } catch (error) {
      console.error("Erro ao criar curso:", error);
      toast.error("Falha ao criar o curso.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Criar Novo Curso</h2>
          <button
            onClick={() => onClose(false)}
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
          <div className="flex justify-end pt-4">
            <Button type="submit">Salvar Curso</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCourseModal;

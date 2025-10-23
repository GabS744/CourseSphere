// src/components/4-templates/InstructorsTab.jsx
import React, { useState, useEffect } from "react";
import { getUsersByIds } from "../../services/userService.js";
import InstructorCard from "../3-organisms/InstructorCard.jsx";

function InstructorsTab({ course }) {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Se o curso não tiver um array de instrutores ou se ele estiver vazio, não faz nada.
    if (!course.instructors || course.instructors.length === 0) {
      setLoading(false);
      return;
    }

    const fetchInstructors = async () => {
      try {
        // Chama a função do serviço com o array de IDs de instrutores do curso
        const response = await getUsersByIds(course.instructors);
        setInstructors(response.data);
      } catch (error) {
        console.error("Falha ao buscar instrutores", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, [course]); // Roda sempre que o objeto 'course' mudar

  if (loading) return <p>Carregando instrutores...</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">
          Instrutores do Curso
        </h3>
        <button className="px-5 py-2 text-white font-bold bg-[#34D399] rounded-lg shadow-md hover:bg-green-600">
          Gerenciar Instrutores
        </button>
      </div>

      {instructors.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {instructors.map((instructor) => (
            <InstructorCard key={instructor.id} instructor={instructor} />
          ))}
        </div>
      ) : (
        <p>Ainda não há instrutores colaboradores neste curso.</p>
      )}
    </div>
  );
}
export default InstructorsTab;

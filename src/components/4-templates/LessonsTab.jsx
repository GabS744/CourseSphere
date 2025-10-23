// src/components/4-templates/LessonsTab.jsx
import React, { useState, useEffect, useMemo } from "react";
import { getLessonsByCourseId } from "../../services/lessonService.js";
import LessonListItem from "../3-organisms/LessonListItem.jsx";


function LessonsTab({ course }) {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await getLessonsByCourseId(course.id);
        setLessons(response.data);
      } catch (error) {
        console.error("Falha ao buscar aulas", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, [course]);

  // Hook useMemo para otimizar a filtragem.
  // O código aqui dentro só roda novamente se 'lessons', 'searchTerm' ou 'statusFilter' mudarem.
  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      const matchesSearch = lesson.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || lesson.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [lessons, searchTerm, statusFilter]);

  if (loading) return <p>Carregando aulas...</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
      {/* Cabeçalho de Controle */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Procurando por alguma aula específica?"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Todos os Status</option>
          <option value="published">Publicado</option>
          <option value="draft">Rascunho</option>
          <option value="archived">Arquivado</option>
        </select>
      </div>

      {/* Lista de Aulas */}
      <div className="space-y-4">
        {filteredLessons.length > 0 ? (
          filteredLessons.map((lesson) => (
            <LessonListItem key={lesson.id} lesson={lesson} />
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">
            Nenhuma aula encontrada.
          </p>
        )}
      </div>

      {/* Paginação e Botão de Criar */}
      <div className="flex justify-between items-center">
        <div>
          {/* Placeholder para Paginação */}
          <span className="px-3 py-1 bg-green-500 text-white rounded">1</span>
        </div>
        <button className="px-5 py-2 text-white font-bold bg-green-500 rounded-lg shadow-md hover:bg-green-600">
          Criar Nova Aula
        </button>
      </div>
    </div>
  );
}
export default LessonsTab;

// src/components/3-organisms/LessonListItem.jsx
import React from "react";

// Função para definir a cor da tag de status
const getStatusClass = (status) => {
  switch (status) {
    case "published":
      return "bg-green-100 text-green-800";
    case "draft":
      return "bg-blue-100 text-blue-800";
    case "archived":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

function LessonListItem({ lesson }) {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow border hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <div className="w-24 h-14 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
          VÍDEO
        </div>
        <div>
          <p className="font-bold text-gray-800">{lesson.title}</p>
        </div>
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(
            lesson.status
          )}`}
        >
          {lesson.status}
        </span>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-400 hover:text-blue-500">
          {/* Ícone de Editar (lápis) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z"
            />
          </svg>
        </button>
        <button className="text-gray-400 hover:text-red-500">
          {/* Ícone de Excluir (lixeira) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
export default LessonListItem;

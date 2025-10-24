import React from "react";

function InstructorCard({ instructor, isCreator, onRemove }) {
  const displayName =
    typeof instructor.name === "string"
      ? instructor.name
      : `${instructor.name.first} ${instructor.name.last}`;

  const avatarUrl =
    instructor.picture?.large ||
    `https://ui-avatars.com/api/?name=${displayName.replace(
      " ",
      "+"
    )}&background=EBF4FF&color=7F9CF5`;

  return (
    <div className="bg-white p-4 rounded-lg shadow text-center relative border hover:shadow-lg transition-shadow">
      {isCreator && (
        <button
          onClick={onRemove}
          className="absolute top-1 right-2 text-gray-400 hover:text-red-500 text-xl font-bold"
          aria-label="Remover instrutor"
        >
          &times;
        </button>
      )}
      <img
        src={avatarUrl}
        alt={`Avatar de ${displayName}`}
        className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-gray-200"
      />
      <p className="font-bold text-gray-800 truncate">{displayName}</p>
      <p className="text-sm text-gray-500 truncate">{instructor.email}</p>
    </div>
  );
}

export default InstructorCard;

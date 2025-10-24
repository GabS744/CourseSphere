import React from "react";
import InstructorCard from "../3-organisms/InstructorCard.jsx";
import Button from "../1-atoms/Button.jsx"; // 1. Importe o nosso átomo Button

function InstructorsTab({
  course,
  instructors,
  isCreator,
  onRemove,
  onManage,
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">
          Instrutores do Curso
        </h3>
        {isCreator && (
          // 2. Substitua o <button> pelo nosso componente <Button />
          <Button onClick={onManage} variant="primary">
            Gerenciar Instrutores
          </Button>
        )}
      </div>
      {instructors.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {instructors.map((instructor) => (
            <InstructorCard
              key={instructor.id}
              instructor={instructor}
              isCreator={isCreator && instructor.id !== course.creator_id}
              onRemove={() => onRemove(instructor.id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">
          Nenhum instrutor colaborador neste curso.
        </p>
      )}
    </div>
  );
}

export default InstructorsTab;

import { formatDateToBR } from "../../utils/dateFormatter.js";

function CourseDataCard({ course }) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="border rounded-lg p-4 h-48 flex items-center justify-center mb-6">
        <p className="text-gray-500">{course.description}</p>
      </div>
      <div className="text-md text-gray-600 text-center">
        <strong>Período:</strong> {formatDateToBR(course.start_date)} a{" "}
        {formatDateToBR(course.end_date)}
      </div>
    </div>
  );
}

export default CourseDataCard;

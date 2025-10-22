import { Link } from "react-router-dom";
import { formatDateToBR } from "../../utils/dateFormatter";

const GraduationCapIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12 mx-auto"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 14l9-5-9-5-9 5 9 5z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v6m-6-3h12" />
  </svg>
);

function CourseCard({ course }) {
  return (
    <Link
      to={`/cursos/${course.id}`}
      className="block px-8 bg-white rounded-[20px] shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-2">{course.name}</h3>
      <div className="my-4 text-gray-400">
        <GraduationCapIcon />
      </div>
      <p className="text-gray-600 text-sm mb-4 h-10 overflow-hidden">
        {course.description}
      </p>
      <div className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
        {formatDateToBR(course.start_date)} - {formatDateToBR(course.end_date)}
      </div>
    </Link>
  );
}
export default CourseCard;

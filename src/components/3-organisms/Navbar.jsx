import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-[#434343]">
          CourseSphere
        </Link>

        <div>
          {isAuthenticated ? (
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-600 hover:text-[#34D399] font-semibold"
              >
                Meus Cursos
              </Link>
              <Link
                to="/cursos/novo"
                className="px-4 py-2 text-white bg-[#34D399] rounded-lg hover:bg-green-600 font-bold"
              >
                Criar novo Curso
              </Link>
              <div className="flex items-center">
                <span className="text-gray-600">Olá, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="ml-4 text-sm text-red-600 hover:text-gray-800 underline"
                >
                  Sair da conta
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="hover:text-green-500 font-bold">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

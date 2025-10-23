import { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import CourseDetailPage from "./pages/CourseDetailPage.jsx";

import Navbar from "./components/3-organisms/Navbar.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import CreateCourseModal from "./components/3-organisms/CreateCourseModal.jsx";

const Layout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = (courseWasCreated) => {
    setIsModalOpen(false);
    if (courseWasCreated) {
      window.location.reload();
    }
  };

  return (
    <>
      <Navbar onOpenCreateModal={handleOpenModal} />
      <main className="container mx-auto px-6 py-8">
        <Outlet />
      </main>

      {isModalOpen && <CreateCourseModal onClose={handleCloseModal} />}
    </>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/" element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route index element={<DashboardPage />} />
          <Route path="cursos/:courseId" element={<CourseDetailPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

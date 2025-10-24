import { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import CourseDetailPage from "./pages/CourseDetailPage.jsx";
import Navbar from "./components/3-organisms/Navbar.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import CreateCourseModal from "./components/3-organisms/CreateCourseModal.jsx";

const Layout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refetchCourses, setRefetchCourses] = useState(null);

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = (courseWasCreated) => {
    setIsModalOpen(false);
    if (courseWasCreated && refetchCourses) {
      refetchCourses();
    }
  };

  return (
    <>
      <Navbar onOpenCreateModal={handleOpenModal} />
      <main className="container mx-auto px-6 py-8">
        <Outlet context={{ setRefetchCourses }} />
      </main>
      {isModalOpen && (
        <CreateCourseModal
          onClose={handleCloseModal}
          onCourseCreated={refetchCourses}
        />
      )}
    </>
  );
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route index element={<DashboardPage />} />
            <Route path="cursos/:courseId" element={<CourseDetailPage />} />
          </Route>
        </Route>
      </Routes>

     
      <ToastContainer
        className="z-999" 
        toastClassName="z-[9999]" 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;

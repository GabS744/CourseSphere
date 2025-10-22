import { Routes, Route, Outlet } from "react-router-dom";

import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";

import Navbar from "./components/3-organisms/Navbar.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-6 py-8">
        <Outlet />
      </main>
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
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

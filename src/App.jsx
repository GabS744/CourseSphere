import { Routes, Route, Outlet } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";

import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}></Route>
    </Routes>
  );
}

export default App;

import { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (email, password) => {
    try {
      const response = await axios.get("http://localhost:3001/users");
      const foundUser = response.data.find(
        (user) => user.email === email && user.password === password
      );

      if (foundUser) {

        localStorage.setItem("user", JSON.stringify(foundUser));
        setUser(foundUser);
        return foundUser;
      } else {
        toast.error("E-mail ou senha incorretos.");
        return null;
      }
    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
      toast.error("Ocorreu um erro no servidor. Tente novamente mais tarde.");
      return null;
    }
  };

  const logout = () => {

    localStorage.removeItem("user");
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

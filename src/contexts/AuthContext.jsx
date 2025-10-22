import React, { createContext, useState, useContext } from "react";

import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.get("http://localhost:3001/users");
      const foundUser = response.data.find(
        (user) => user.email === email && user.password === password
      );

      if (foundUser) {
        setUser(foundUser);
        return foundUser;
      } else {
        alert("E-mail ou senha incorretos.");
        return null;
      }
    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
      alert("Ocorreu um erro no servidor. Tente novamente mais tarde.");
      return null;
    }
  };

  const logout = () => {
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

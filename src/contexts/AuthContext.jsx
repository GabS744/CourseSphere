// Importa o React e os hooks
import React, { createContext, useState, useContext } from "react";

//Importa o axios para chamadas API
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
        return foundUser; // <-- MUDANÇA AQUI: Retorna o usuário em vez de true
      } else {
        alert("E-mail ou senha incorretos.");
        return null; // <-- MUDANÇA AQUI: Retorna null em vez de false
      }
    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
      alert("Ocorreu um erro no servidor. Tente novamente mais tarde.");
      return null; // <-- MUDANÇA AQUI: Retorna null em vez de false
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

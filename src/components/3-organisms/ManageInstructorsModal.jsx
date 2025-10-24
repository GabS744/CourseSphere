import React, { useState, useEffect } from "react";
import {
  getSuggestedUsers,
  findUserByEmail,
} from "../../services/userService.js";

function ManageInstructorsModal({ course, onClose, onAddInstructor }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await getSuggestedUsers(5);
        setSuggestions(response.data.results);
      } catch (error) {
        console.error("Erro ao buscar sugestões", error);
      } finally {
        setLoadingSuggestions(false);
      }
    };
    fetchSuggestions();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const response = await findUserByEmail(searchTerm);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Erro ao buscar por e-mail", error);
    } finally {
      setIsSearching(false);
    }
  };

  const listToShow = searchTerm.trim() ? searchResults : suggestions;
  const isLoading = searchTerm.trim() ? isSearching : loadingSuggestions;

  const renderUserList = (users) => {
    return users.map((user, index) => {
      // --- A CORREÇÃO ESTÁ AQUI ---
      // Verificamos se 'user.id' existe E não é um objeto.
      const isInternalUser = user.id && typeof user.id !== "object";

      // Esta lógica agora funciona corretamente para ambos os tipos de usuário
      const displayName = isInternalUser
        ? user.name
        : `${user.name.first} ${user.name.last}`;
      const avatarUrl = isInternalUser
        ? user.picture?.thumbnail ||
          `https://ui-avatars.com/api/?name=${displayName.replace(" ", "+")}`
        : user.picture.thumbnail;

      // Usamos uma chave única e garantida para cada tipo de usuário
      const uniqueKey = isInternalUser ? user.id : user.login?.uuid || index;

      return (
        <li
          key={uniqueKey}
          className="flex justify-between items-center p-2 border rounded-lg hover:bg-gray-50"
        >
          <div className="flex items-center space-x-3">
            <img
              src={avatarUrl}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">{displayName}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => onAddInstructor(user)}
            className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
          >
            Adicionar
          </button>
        </li>
      );
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Gerenciar Instrutores</h2>
          <button onClick={onClose} className="text-gray-500 text-2xl">
            &times;
          </button>
        </div>

        <form onSubmit={handleSearch} className="flex space-x-2 mb-4">
          <input
            type="email"
            placeholder="Buscar instrutor por e-mail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Buscar
          </button>
        </form>

        <div className="flex-grow overflow-y-auto">
          <h3 className="font-bold mb-2 text-gray-600">
            {searchTerm.trim()
              ? "Resultados da Busca"
              : "Sugestões da Comunidade"}
          </h3>
          {isLoading ? (
            <p>Carregando...</p>
          ) : (
            <ul className="space-y-3">
              {listToShow.length > 0 ? (
                renderUserList(listToShow)
              ) : (
                <p className="text-center text-gray-500">
                  Nenhum usuário encontrado.
                </p>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageInstructorsModal;

import axios from "axios";

const API_URL = "http://localhost:3001";

export const getUsersByIds = (idArray) => {
  const queryString = idArray.map((id) => `id=${id}`).join("&");
  return axios.get(`${API_URL}/users?${queryString}`);
};

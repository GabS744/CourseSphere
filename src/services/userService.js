import axios from "axios";

const API_URL = "http://localhost:3001";

export const getUsersByIds = (idArray) => {
  if (!idArray || idArray.length === 0) {
    return Promise.resolve({ data: [] });
  }
  const queryString = idArray.map((id) => `id=${id}`).join("&");
  return axios.get(`${API_URL}/users?${queryString}`);
};

export const getSuggestedUsers = (count = 5) => {
  return axios.get(`https://randomuser.me/api/?results=${count}&nat=br`);
};

export const addUser = (userData) => {
  return axios.post(`${API_URL}/users`, userData);
};

export const findUserByEmail = (email) => {
  return axios.get(`${API_URL}/users?email=${email}`);
};

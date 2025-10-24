import axios from "axios";

const API_URL = "http://localhost:3001";

export const getCourses = () => {
  return axios.get(`${API_URL}/courses`);
};

export const createCourse = (courseData) => {
  return axios.post(`${API_URL}/courses`, courseData);
};

export const getCourseById = (id) => {
  return axios.get(`${API_URL}/courses/${id}`);
};

export const updateCourse = (id, partialData) => {
  return axios.patch(`${API_URL}/courses/${id}`, partialData);
};

export const deleteCourse = (id) => {
  return axios.delete(`${API_URL}/courses/${id}`);
};

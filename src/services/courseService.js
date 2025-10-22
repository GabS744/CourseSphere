import axios from "axios";

const API_URL = "http://localhost:3001";

export const getCourses = async () => {
  return axios.get(`${API_URL}/courses`);
};

export const createCourse = (courseData) => {
  return axios.post(`${API_URL}/courses`, courseData);
};

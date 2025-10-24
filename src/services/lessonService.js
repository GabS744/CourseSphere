import axios from "axios";

const API_URL = "http://localhost:3001";

export const getLessonsByCourseId = (courseId) => {
  return axios.get(`${API_URL}/lessons?course_id=${courseId}`);
};

export const createLesson = (lessonData) => {
  return axios.post(`${API_URL}/lessons`, lessonData);
};

export const updateLesson = (lessonId, lessonData) => {
  return axios.patch(`${API_URL}/lessons/${lessonId}`, lessonData);
};

export const deleteLesson = (lessonId) => {
  return axios.delete(`${API_URL}/lessons/${lessonId}`);
};

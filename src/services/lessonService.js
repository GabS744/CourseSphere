import axios from "axios";

const API_URL = "http://localhost:3001";

export const getLessonsByCourseId = (courseId) => {
  return axios.get(`${API_URL}/lessons?course_id=${courseId}`);
};

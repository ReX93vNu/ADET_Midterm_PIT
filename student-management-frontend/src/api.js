import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/students'
});

export const fetchStudents = () => API.get('/');
export const createStudent = (data) => API.post('/', data);
export const updateStudent = (id, data) => API.put(`/${id}/`, data);
export const deleteStudent = (id) => API.delete(`/${id}/`);
export const searchStudents = (query) => API.get(`/search/?keyword=${query}`);
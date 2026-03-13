import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export const fetchRecords = () => axios.get(`${API_URL}/records/`);
export const fetchStudents = () => axios.get(`${API_URL}/students/`);
export const fetchCourses = () => axios.get(`${API_URL}/courses/`);
export const createRecord = (data) => axios.post(`${API_URL}/records/`, data);
export const deleteRecord = (id) => axios.delete(`${API_URL}/records/${id}/`);
export const updateRecord = (id, data) => axios.put(`${API_URL}/records/${id}/`, data);
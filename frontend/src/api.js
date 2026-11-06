import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const API = axios.create({
  baseURL: BASE_URL
});


export const getPersonas = () => API.get('/personas');
export const getPersonaById = (id) => API.get(`/personas/${id}`);
export const createPersona = (data) => API.post('/personas', data);
export const updatePersona = (id, data) => API.put(`/personas/${id}`, data);
export const deletePersona = (id) => API.delete(`/personas/${id}`);

export const getDomicilioById = (id) => API.get(`/domicilios/${id}`);
export const createDomicilio = (data) => API.post('/domicilios', data);
export const updateDomicilio = (id, data) => API.put(`/domicilios/${id}`, data);
export const deleteDomicilio = (id) => API.delete(`/domicilios/${id}`);

export const getDomiciliosByPersona = (idPersona) =>
  API.get(`/domicilios/asociados/${idPersona}`);
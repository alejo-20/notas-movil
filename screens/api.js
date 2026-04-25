import axios from 'axios';

const BASE_URL = 'https://notas-backend-production-9cb5.up.railway.app';

export const consultarEstudiante = (cedula) =>
  axios.get(`${BASE_URL}/estudiantes/${cedula}`);

export const registrarEstudiante = (datos) =>
  axios.post(`${BASE_URL}/estudiantes`, datos);

export const registrarNotas = (datos) =>
  axios.post(`${BASE_URL}/notas`, datos);
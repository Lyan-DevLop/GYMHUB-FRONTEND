import axios from 'axios';

const api = axios.create({
  baseURL: 'http://3.136.34.65:8000', // Poner la IP de AWS donde se está corriendo el backend

  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

export default api;

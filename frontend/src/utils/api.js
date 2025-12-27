import axios from 'axios';

const API_BASE_URL = 'http://localhost:8082';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const issueCertificate = async (formData) => {
  const response = await api.post('/certificates/issue', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const verifyCertificate = async (certId) => {
  const response = await api.get(`/certificates/verify/${certId}`);
  return response.data;
};

export default api;

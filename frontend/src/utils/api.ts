import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api/auth',
});

export const login = async (data: { email: string; password: string }) => {
  const response = await api.post('/login', data);
  return response.data;
};
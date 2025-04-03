
// src/services/authService.js
import api from './api';

export const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: 'Server error' };
  }
};

export const login = async (userData) => {
  try {
    const response = await api.post('/login', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: 'Server error' };
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://fk6v9mfd-5000.asse.devtunnels.ms', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (id) => {
  try {
    const response = await apiClient.get(`/login/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const uploadCode = async (id, code) => {
  try {
    const response = await apiClient.post('/upload', {
      id,
      code,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};


export const submitNumber = async (number) => {
  try {
    const response = await apiClient.post(`/submit/${number}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

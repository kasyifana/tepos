import axios from 'axios';

const API_BASE = '/api';

export const fetchData = async (startDate = '', endDate = '') => {
  try {
    const params = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    
    const response = await axios.get(`${API_BASE}/data`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('csvFile', file);
    
    const response = await axios.post(`${API_BASE}/upload-csv`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const resetData = async () => {
  try {
    const response = await axios.post(`${API_BASE}/reset-data`);
    return response.data;
  } catch (error) {
    console.error('Error resetting data:', error);
    throw error;
  }
};

export const downloadTemplate = (format = 'csv') => {
  window.open(`${API_BASE}/download-template?format=${format}`, '_blank');
};

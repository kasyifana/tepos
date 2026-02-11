#!/bin/bash
set -e

echo "Creating React files..."

# App.jsx
cat > src/App.jsx << 'APPEOF'
import { useState, useEffect } from 'react';
import Header from './components/Header';
import MetricsCard from './components/MetricsCard';
import KPICard from './components/KPICard';
import Timeline from './components/Timeline';
import UploadModal from './components/UploadModal';
import { fetchData } from './services/api';
import './styles/App.css';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const loadData = async () => {
    try {
      setLoading(true);
      const result = await fetchData(dateRange.start, dateRange.end);
      setData(result);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [dateRange]);

  const handleDataUpdate = () => {
    loadData();
    setShowModal(false);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      <Header 
        onDateChange={setDateRange}
        onImportClick={() => setShowModal(true)}
      />
      
      <div className="main-grid">
        <MetricsCard data={data} />
        <KPICard data={data} />
      </div>

      <Timeline data={data} />

      {showModal && (
        <UploadModal 
          onClose={() => setShowModal(false)}
          onSuccess={handleDataUpdate}
        />
      )}
    </div>
  );
}

export default App;
APPEOF

# API Service
cat > src/services/api.js << 'APIEOF'
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
APIEOF

echo "✅ Core files created (App.jsx, api.js)"
echo "Now installing dependencies..."


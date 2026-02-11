import { useState, useEffect } from 'react';
import Header from './components/Header';
import MetricsCard from './components/MetricsCard';
import KPICard from './components/KPICard';
import Timeline from './components/Timeline';
import UploadModal from './components/UploadModal';
import { loadData as loadStoredData, saveData, resetData as resetStoredData } from './data/oeeData';
import { parseCSV, downloadTemplate } from './utils/fileUtils';
import './styles/App.css';

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Load data from localStorage on mount
  useEffect(() => {
    const storedData = loadStoredData();
    setData(storedData);
    setFilteredData(storedData);
    setLoading(false);
  }, []);

  // Filter data by date range
  useEffect(() => {
    if (!dateRange.start && !dateRange.end) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter(row => {
      const rowDate = row['Tanggal'];
      if (!rowDate) return true;

      if (dateRange.start && rowDate < dateRange.start) return false;
      if (dateRange.end && rowDate > dateRange.end) return false;
      return true;
    });

    setFilteredData(filtered);
  }, [data, dateRange]);

  const handleFileUpload = async (file) => {
    try {
      const text = await file.text();
      const parsedData = parseCSV(text);
      
      if (parsedData.length === 0) {
        throw new Error('No data found in CSV file');
      }

      setData(parsedData);
      saveData(parsedData);
      setShowModal(false);
      return { success: true, message: `Loaded ${parsedData.length} records` };
    } catch (error) {
      console.error('Error uploading file:', error);
      return { success: false, message: error.message };
    }
  };

  const handleReset = () => {
    const defaultData = resetStoredData();
    setData(defaultData);
    setShowModal(false);
  };

  const handleDownloadTemplate = () => {
    downloadTemplate();
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
        <MetricsCard data={filteredData} />
        <KPICard data={filteredData} />
      </div>

      <Timeline data={filteredData} />

      {showModal && (
        <UploadModal 
          onClose={() => setShowModal(false)}
          onUpload={handleFileUpload}
          onReset={handleReset}
          onDownloadTemplate={handleDownloadTemplate}
        />
      )}
    </div>
  );
}

export default App;

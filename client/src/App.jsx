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

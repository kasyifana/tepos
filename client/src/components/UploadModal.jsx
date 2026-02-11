import { useState, useRef } from 'react';
import { uploadFile, resetData, downloadTemplate } from '../services/api';
import './UploadModal.css';

function UploadModal({ onClose, onSuccess }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStatus({ type: 'info', message: `File selected: ${selectedFile.name}` });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setStatus({ type: 'info', message: `File selected: ${droppedFile.name}` });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus({ type: 'error', message: 'Please select a file first!' });
      return;
    }

    try {
      setStatus({ type: 'info', message: 'Uploading...' });
      await uploadFile(file);
      setStatus({ type: 'success', message: 'File uploaded successfully!' });
      setTimeout(() => onSuccess(), 1000);
    } catch (error) {
      setStatus({ type: 'error', message: 'Upload failed: ' + error.message });
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Reset to default data? This will remove all uploaded data.')) return;

    try {
      setStatus({ type: 'info', message: 'Resetting...' });
      await resetData();
      setStatus({ type: 'success', message: 'Data reset successfully!' });
      setTimeout(() => onSuccess(), 1000);
    } catch (error) {
      setStatus({ type: 'error', message: 'Reset failed: ' + error.message });
    }
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Import Data (CSV / Excel)</h2>
        <p>Upload file CSV atau Excel (.xlsx, .xls) dengan format yang sesuai untuk mengupdate data OEE.</p>
        
        <div 
          className={`upload-area ${isDragging ? 'dragover' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="upload-icon">📄</div>
          <p>Drag & drop file CSV/Excel atau klik untuk browse</p>
          <p style={{ fontSize: '12px', color: 'var(--text-gray)', marginTop: '8px' }}>
            Supported formats: .csv, .xlsx, .xls
          </p>
          <input 
            ref={fileInputRef}
            type="file" 
            accept=".csv,.xlsx,.xls" 
            style={{ display: 'none' }}
            onChange={handleFileSelect}
          />
          <button className="upload-button" onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}>
            Pilih File
          </button>
        </div>
        
        {status.message && (
          <div className={`upload-status ${status.type}`}>
            {status.message}
          </div>
        )}
        
        <div className="modal-actions">
          <button className="btn-secondary" onClick={handleReset}>Reset ke Data Default</button>
          <button className="btn-secondary" onClick={() => downloadTemplate('xlsx')}>📊 Download Excel Template</button>
          <button className="btn-primary" onClick={handleUpload} disabled={!file}>Upload File</button>
        </div>
      </div>
    </div>
  );
}

export default UploadModal;
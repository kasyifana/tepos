const fs = require('fs');

const modal = {
  'src/components/UploadModal.jsx': `import { useState, useRef } from 'react';
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
      setStatus({ type: 'info', message: \`File selected: \${selectedFile.name}\` });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setStatus({ type: 'info', message: \`File selected: \${droppedFile.name}\` });
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
          className={\`upload-area \${isDragging ? 'dragover' : ''}\`}
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
          <div className={\`upload-status \${status.type}\`}>
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

export default UploadModal;`,

  'src/components/UploadModal.css': `.modal {
  display: block;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background-color: var(--white);
  margin: 5% auto;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: slideDown 0.3s;
}

@keyframes slideDown {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.close {
  color: var(--text-gray);
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  line-height: 20px;
}

.close:hover {
  color: var(--text-dark);
}

.modal-content h2 {
  margin-top: 0;
  color: var(--text-dark);
  font-size: 24px;
}

.modal-content p {
  color: var(--text-gray);
  margin-bottom: 20px;
}

.upload-area {
  border: 2px dashed var(--border-light);
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  background: var(--bg-gray);
  transition: all 0.3s;
  cursor: pointer;
}

.upload-area:hover {
  border-color: var(--primary-blue);
  background: #f0f7ff;
}

.upload-area.dragover {
  border-color: var(--primary-blue);
  background: #e6f2ff;
}

.upload-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.upload-button {
  background: var(--primary-blue);
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  margin-top: 16px;
  transition: background 0.2s;
}

.upload-button:hover {
  background: #0052cc;
}

.upload-status {
  margin-top: 16px;
  padding: 12px;
  border-radius: 6px;
  font-size: 14px;
}

.upload-status.success {
  background: #d1fae5;
  color: var(--success);
  border: 1px solid var(--success);
}

.upload-status.error {
  background: #fee2e2;
  color: var(--danger);
  border: 1px solid var(--danger);
}

.upload-status.info {
  background: #dbeafe;
  color: var(--info);
  border: 1px solid var(--info);
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
  flex-wrap: wrap;
}

.btn-primary {
  background: var(--primary-blue);
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s;
}

.btn-primary:hover:not(:disabled) {
  background: #0052cc;
}

.btn-primary:disabled {
  background: var(--border-light);
  cursor: not-allowed;
  color: var(--text-gray);
}

.btn-secondary {
  background: var(--white);
  color: var(--text-dark);
  border: 1px solid var(--border-light);
  padding: 10px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-secondary:hover {
  border-color: var(--primary-blue);
  color: var(--primary-blue);
}`
};

Object.entries(modal).forEach(([file, content]) => {
  fs.writeFileSync(file, content);
  console.log('✅ Created:', file);
});

console.log('\n🎉 UploadModal component created!');
console.log('\n✨ All React components are ready!');

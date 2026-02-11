import { useState } from 'react';
import './Header.css';

function Header({ onDateChange, onImportClick }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartChange = (e) => {
    const newStart = e.target.value;
    setStartDate(newStart);
    onDateChange({ start: newStart, end: endDate });
  };

  const handleEndChange = (e) => {
    const newEnd = e.target.value;
    setEndDate(newEnd);
    onDateChange({ start: startDate, end: newEnd });
  };

  return (
    <div className='header'>
      <h1>OEE</h1>
      <div className='header-controls'>
        <div className='date-inputs'>
          <input type='date' value={startDate} onChange={handleStartChange} />
          <input type='date' value={endDate} onChange={handleEndChange} />
        </div>
        <button className='tab-button active'>OEE overview</button>
        <button className='tab-button'>Error analysis</button>
        <button className='tab-button'>Analysis of sub assets</button>
        <button className='tab-button' onClick={onImportClick}>📁 Import Data</button>
        <button className='tab-button' onClick={() => downloadTemplate('csv')}>📥 Template</button>
      </div>
    </div>
  );
}

export default Header;
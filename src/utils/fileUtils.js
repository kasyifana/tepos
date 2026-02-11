import * as XLSX from 'xlsx';

// Parse CSV file client-side with proper handling of quoted values
export const parseCSV = (text) => {
  const lines = text.split('\n').filter(line => line.trim());
  if (lines.length < 2) return [];

  // Parse CSV line properly handling quotes
  const parseLine = (line) => {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  };

  const headers = parseLine(lines[0]);
  const data = [];

  console.log('CSV Headers:', headers); // Debug

  for (let i = 1; i < lines.length; i++) {
    const values = parseLine(lines[i]);
    const row = {};
    
    headers.forEach((header, index) => {
      const value = values[index];
      // Convert numbers, keep strings as is
      if (value && value !== '' && !isNaN(value)) {
        row[header] = parseFloat(value);
      } else {
        row[header] = value || '';
      }
    });
    
    if (Object.keys(row).length > 0) {
      data.push(row);
    }
  }

  console.log('Parsed CSV data:', data); // Debug
  return data;
};

// Parse Excel file client-side using xlsx library
export const parseExcel = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert to JSON with header row
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
          raw: false,  // Keep as strings first
          defval: ''   // Default value for empty cells
        });
        
        // Convert numeric strings to numbers
        const processedData = jsonData.map(row => {
          const processedRow = {};
          Object.keys(row).forEach(key => {
            const value = row[key];
            // Try to convert to number if possible
            if (value && !isNaN(value) && value.trim() !== '') {
              processedRow[key] = parseFloat(value);
            } else {
              processedRow[key] = value;
            }
          });
          return processedRow;
        });
        
        console.log('Parsed Excel data:', processedData); // Debug
        resolve(processedData);
      } catch (error) {
        reject(new Error('Failed to parse Excel file: ' + error.message));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read Excel file'));
    };
    
    reader.readAsArrayBuffer(file);
  });
};

// Download data as CSV with proper escaping
export const downloadCSV = (data) => {
  if (!data || data.length === 0) return;

  // Get headers from first row
  const headers = Object.keys(data[0]);
  
  // Escape CSV value (add quotes if contains comma, quote, or newline)
  const escapeCSV = (value) => {
    if (value === undefined || value === null) return '';
    const str = String(value);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };
  
  // Create CSV content with proper escaping
  let csv = headers.map(escapeCSV).join(',') + '\n';
  data.forEach(row => {
    const values = headers.map(header => escapeCSV(row[header]));
    csv += values.join(',') + '\n';
  });

  // Download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `oee-data-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

// Download template CSV
export const downloadTemplate = () => {
  const template = [
    {
      'Tanggal': '2024-01-01',
      'Es Keluar (Bal)': 2400,
      'Defect Bak 1 (Bal)': 50,
      'Defect Bak 2 (Bal)': 30,
      'Defect Bak 3 (Bal)': 20,
      'Waktu Operasi (Jam)': 20,
      'Downtime (Jam)': 4,
      'Kapasitas Mesin (Bal/Jam)': 120,
      'Waktu Persiapan (Jam)': 2,
      'Waktu Istirahat (Jam)': 1,
      'Waktu Maintenance (Jam)': 1
    }
  ];
  
  downloadCSV(template);
};

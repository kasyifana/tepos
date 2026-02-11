// Parse CSV file client-side
export const parseCSV = (text) => {
  const lines = text.split('\n').filter(line => line.trim());
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const row = {};
    
    headers.forEach((header, index) => {
      const value = values[index];
      // Convert numbers
      if (value && !isNaN(value)) {
        row[header] = parseFloat(value);
      } else {
        row[header] = value;
      }
    });
    
    if (Object.keys(row).length > 0) {
      data.push(row);
    }
  }

  return data;
};

// Parse Excel file client-side (simplified - requires xlsx library)
export const parseExcel = async (file) => {
  // For now, we'll prompt user to convert Excel to CSV
  // In production, you'd use a library like xlsx
  throw new Error('Excel support coming soon. Please convert to CSV first.');
};

// Download data as CSV
export const downloadCSV = (data) => {
  if (!data || data.length === 0) return;

  // Get headers from first row
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  let csv = headers.join(',') + '\n';
  data.forEach(row => {
    const values = headers.map(header => {
      const value = row[header];
      return value !== undefined ? value : '';
    });
    csv += values.join(',') + '\n';
  });

  // Download
  const blob = new Blob([csv], { type: 'text/csv' });
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

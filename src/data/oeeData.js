// Data OEE - format Indonesian column names
export const defaultData = [
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
  },
  {
    'Tanggal': '2024-01-02',
    'Es Keluar (Bal)': 2300,
    'Defect Bak 1 (Bal)': 45,
    'Defect Bak 2 (Bal)': 25,
    'Defect Bak 3 (Bal)': 15,
    'Waktu Operasi (Jam)': 21,
    'Downtime (Jam)': 3,
    'Kapasitas Mesin (Bal/Jam)': 120,
    'Waktu Persiapan (Jam)': 1.5,
    'Waktu Istirahat (Jam)': 1,
    'Waktu Maintenance (Jam)': 0.5
  },
  {
    'Tanggal': '2024-01-03',
    'Es Keluar (Bal)': 2500,
    'Defect Bak 1 (Bal)': 40,
    'Defect Bak 2 (Bal)': 20,
    'Defect Bak 3 (Bal)': 10,
    'Waktu Operasi (Jam)': 22,
    'Downtime (Jam)': 2,
    'Kapasitas Mesin (Bal/Jam)': 120,
    'Waktu Persiapan (Jam)': 1,
    'Waktu Istirahat (Jam)': 1,
    'Waktu Maintenance (Jam)': 0
  }
];

// Storage key untuk localStorage
export const STORAGE_KEY = 'oee_dashboard_data';

// Load data dari localStorage atau gunakan default
export const loadData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultData;
  } catch (error) {
    console.error('Error loading data:', error);
    return defaultData;
  }
};

// Save data ke localStorage
export const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving data:', error);
    return false;
  }
};

// Reset ke default data
export const resetData = () => {
  saveData(defaultData);
  return defaultData;
};

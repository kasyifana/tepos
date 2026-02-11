// Data OEE - format dari script.js (lebih lengkap)
export const defaultData = [
  {
    date: "2024-05-01",
    esKeluar: 2114,
    bak1: 2,
    bak2: 2,
    totalRusak: 4,
    realisasiOrder: 2110,
    normal: 32,
    puncak: 8,
    totalBeban: 40,
    mesin: 3,
    prodJam: 53,
    kapasitas: 4803,
    tidakTerjual: 2689,
    persenPenjualan: 44,
    order: 2110,
    selisihOrder: 0,
    tenagaKerja: 28,
    outputTK: 75.4,
  },
  {
    date: "2024-05-02",
    esKeluar: 4201,
    bak1: 3,
    bak2: 3,
    totalRusak: 6,
    realisasiOrder: 4192,
    normal: 48,
    puncak: 0,
    totalBeban: 48,
    mesin: 3,
    prodJam: 87,
    kapasitas: 4803,
    tidakTerjual: 602,
    persenPenjualan: 87,
    order: 4192,
    selisihOrder: 0,
    tenagaKerja: 28,
    outputTK: 149.7,
  },
  {
    date: "2024-05-03",
    esKeluar: 3667,
    bak1: 4,
    bak2: 32,
    totalRusak: 35,
    realisasiOrder: 3740,
    normal: 45,
    puncak: 12,
    totalBeban: 57,
    mesin: 3,
    prodJam: 66,
    kapasitas: 4803,
    tidakTerjual: 1136,
    persenPenjualan: 78,
    order: 3632,
    selisihOrder: -108,
    tenagaKerja: 29,
    outputTK: 129.0,
  },
  {
    date: "2024-05-04",
    esKeluar: 3915,
    bak1: 6,
    bak2: 6,
    totalRusak: 12,
    realisasiOrder: 3903,
    normal: 50,
    puncak: 15,
    totalBeban: 65,
    mesin: 3,
    prodJam: 60,
    kapasitas: 4803,
    tidakTerjual: 888,
    persenPenjualan: 81,
    order: 3903,
    selisihOrder: 0,
    tenagaKerja: 28,
    outputTK: 139.4,
  },
  {
    date: "2024-05-05",
    esKeluar: 4036,
    bak1: 0,
    bak2: 5,
    totalRusak: 5,
    realisasiOrder: 4274,
    normal: 52,
    puncak: 15,
    totalBeban: 67,
    mesin: 3,
    prodJam: 64,
    kapasitas: 4803,
    tidakTerjual: 767,
    persenPenjualan: 89,
    order: 4031,
    selisihOrder: -243,
    tenagaKerja: 26,
    outputTK: 155.2,
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

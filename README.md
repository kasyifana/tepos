# OEE Dashboard - Ice Plant Monitoring

Dashboard monitoring untuk Overall Equipment Effectiveness (OEE) pada pabrik es.

## Fitur

- 📊 **Real-time OEE Metrics**: Monitor Availability, Performance, dan Quality
- 📈 **Trend Analysis**: Visualisasi tren performa dengan grafik
- 🔍 **KPI Monitoring**: Pantau berbagai Key Performance Indicators
- 📅 **Date Filtering**: Filter data berdasarkan range tanggal
- 📁 **CSV & Excel Import**: Import data dari file CSV atau Excel (.xlsx, .xls)
- 📥 **Template Download**: Download template CSV atau Excel untuk format yang benar
- 🔄 **Reset Data**: Reset ke data default dengan satu klik
- 🎨 **Modern UI**: Interface yang clean dengan design system yang konsisten
- 💾 **localStorage**: Data tersimpan di browser (pure static site)

## Teknologi

- **Frontend**: React 18 + Vite 4
- **State Management**: React Hooks (useState, useEffect)
- **Charts**: Chart.js 4.4.0
- **File Processing**: xlsx 0.18.5
- **Styling**: Custom CSS dengan CSS Variables
- **Deployment**: Vercel (Static Site)

## Instalasi & Menjalankan

1. Clone repository ini
2. Install dependencies:
```bash
npm install
```

3. Jalankan development server:
```bash
npm run dev
```

4. Buka browser dan akses:
```
http://localhost:5173
```

5. Atau build untuk production:
```bash
npm run build
npm run preview
```

## Struktur Folder

```
tepos/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── MetricsCard.jsx
│   │   ├── KPICard.jsx
│   │   ├── Timeline.jsx
│   │   └── UploadModal.jsx
│   ├── data/
│   │   └── oeeData.js
│   ├── utils/
│   │   └── fileUtils.js
│   ├── styles/
│   │   ├── App.css
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Data Format

### Format CSV/Excel (2 pilihan)

**PILIHAN 1 - Format Lengkap (dari script.js):**
```csv
date,esKeluar,bak1,bak2,totalRusak,realisasiOrder,normal,puncak,totalBeban,mesin,prodJam,kapasitas,tidakTerjual,persenPenjualan,order,selisihOrder,tenagaKerja,outputTK
```

**PILIHAN 2 - Format Sederhana (Indonesian):**
```csv
Tanggal,Es Keluar (Bal),Defect Bak 1 (Bal),Defect Bak 2 (Bal),Defect Bak 3 (Bal),Waktu Operasi (Jam),Downtime (Jam),Kapasitas Mesin (Bal/Jam),Waktu Persiapan (Jam),Waktu Istirahat (Jam),Waktu Maintenance (Jam)
```

File `oee-sample-data-scriptjs.csv` menggunakan Format 1 (lengkap).
File `oee-sample-data.csv` menggunakan Format 2 (sederhana).

### Cara Import

1. Klik tombol **"📁 Import Data"** di header dashboard
2. Drag & drop file CSV/Excel atau klik "Pilih File" untuk browse
3. File yang didukung: `.csv`, `.xlsx`, `.xls`
4. Klik tombol **"Upload File"** untuk memproses
5. Data akan otomatis di-update dan dashboard akan refresh

### Download Template

Klik tombol **"📥 Download Template"** untuk mendapatkan file CSV dengan format yang benar.

## Metrics yang Ditampilkan

### OEE Metrics (dari script.js formula)
- **OEE (Overall Equipment Effectiveness)**: Availability × Performance × Quality
- **Availability**: Total Beban / (Avg Mesin × 24 × Jumlah Hari)
- **Performance**: Total Produksi / (Total Jam × Avg Prod/Jam)
- **Quality**: (Total Produksi - Total Rusak) / Total Produksi

### KPIs (Key Performance Indicators)
- **Total Production**: Total Es Keluar (Bal)
- **Total Defects**: Defect Bak 1 + Bak 2 + Bak 3
- **Avg Productivity**: Rata-rata bal/jam
- **Defect Rate**: % defect dari produksi
- **Total Downtime**: Total jam downtime
- **Good Production**: % produk tanpa defect
- **Setup Time**: Waktu persiapan (jam)
- **Utilization Rate**: % waktu operasi

## Custom Styling

Aplikasi ini menggunakan CSS Variables untuk memudahkan kustomisasi warna:

```css
:root {
  --primary-blue: #0066ff;
  --bg-gray: #f5f7fa;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
}
```

## Deployment

Project ini di-deploy di Vercel sebagai static site:

1. Push ke GitHub repository
2. Connect ke Vercel
3. Framework akan auto-detect sebagai Vite
4. Setiap push ke `main` branch akan auto-deploy

## License

ISC

## Author

Dibuat untuk keperluan monitoring pabrik es

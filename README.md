# OEE Dashboard - Ice Plant Monitoring

Dashboard monitoring untuk Overall Equipment Effectiveness (OEE) pada pabrik es.

## Fitur

- 📊 **Real-time OEE Metrics**: Monitor Availability, Performance, dan Quality
- 📈 **Trend Analysis**: Visualisasi tren performa dengan grafik
- 🔍 **KPI Monitoring**: Pantau berbagai Key Performance Indicators
- 📅 **Date Filtering**: Filter data berdasarkan range tanggal
- 📁 **CSV & Excel Import**: Import data dari file CSV atau Excel (.xlsx, .xls) - FITUR BARU!
- 📥 **Template Download**: Download template CSV atau Excel untuk format yang benar
- 🔄 **Reset Data**: Reset ke data default dengan satu klik
- 🎨 **Modern UI**: Interface yang clean dengan design system yang konsisten

## Teknologi

- **Backend**: Node.js + Express.js
- **Frontend**: EJS Template Engine
- **File Upload**: Multer
- **CSV Parsing**: csv-parser
- **Excel Processing**: xlsx
- **Charts**: Chart.js
- **Styling**: Custom CSS dengan CSS Variables

## Instalasi

1. Clone repository ini
2. Install dependencies:
```bash
npm install
```

3. Jalankan aplikasi:
```bash
npm start
```

Atau untuk development dengan auto-reload:
```bash
npm run dev
```

4. Buka browser dan akses:
```
http://localhost:3000
```

## Struktur Folder

```
tepos/
├── data/
│   └── oee-data.js          # Data OEE
├── public/
│   ├── css/
│   │   └── style.css        # Stylesheet
│   └── js/
│       └── dashboard.js     # Client-side JavaScript
├── views/
│   └── index.ejs            # Template halaman utama
├── server.js                # Server Express
├── package.json
└── README.md
```

## API Endpoints

- `GET /` - Halaman dashboard utama
- `GET /api/data` - Mendapatkan data OEE (support filtering dengan query params `startDate` dan `endDate`)
- `POST /api/upload-csv` - Upload file CSV atau Excel untuk update data
- `GET /api/download-template` - Download template (query param `format=csv` atau `format=xlsx`)
- `POST /api/reset-data` - Reset data ke default

## Import Data (CSV & Excel)

### Format File

Aplikasi mendukung **3 format file**:
1. ✅ **CSV** (.csv)
2. ✅ **Excel 2007+** (.xlsx) 
3. ✅ **Excel 97-2003** (.xls)

### Kolom yang Diperlukan

File harus memiliki kolom-kolom berikut:

```csv
date,esKeluar,bak1,bak2,totalRusak,realisasiOrder,normal,puncak,totalBeban,mesin,prodJam,kapasitas,tidakTerjual,persenPenjualan,order,selisihOrder,tenagaKerja,outputTK
```

Atau di Excel dengan nama kolom yang sama di baris pertama (header).

### Cara Import

1. Klik tombol **"📁 Import Data"** di header dashboard
2. Drag & drop file CSV/Excel atau klik "Pilih File" untuk browse
3. File yang didukung: `.csv`, `.xlsx`, `.xls`
4. Klik tombol **"Upload File"** untuk memproses
5. Data akan otomatis di-update dan dashboard akan refresh

### Download Template

- **CSV Template**: Klik tombol **"📥 Template"** di header
- **Excel Template**: Klik tombol **"📊 Download Excel Template"** di modal import

Template sudah berisi contoh data yang benar dan siap digunakan.

### Reset Data

Jika ingin kembali ke data default, klik tombol **"Reset ke Data Default"** di modal import.

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

## Metrics yang Ditampilkan

### OEE Metrics
- **OEE (Overall Equipment Effectiveness)**: Availability × Performance × Quality
- **Availability**: Persentase waktu mesin beroperasi
- **Performance**: Persentase kecepatan produksi terhadap target
- **Quality**: Persentase produk tanpa cacat

### KPIs
- Total Production
- Total Defects
- Average Productivity
- Workforce Efficiency
- Unsold Ice
- Sales Rate
- Order Fulfillment
- Peak Load Hours

## Timeline Visualization

Dashboard menampilkan timeline status mesin dengan kategori:
- Running (Normal Load) - Hijau
- Peak Power Load - Kuning
- Tank 1 Defects - Orange
- Tank 2 Defects - Merah
- Machine Idle - Biru

## License

ISC

## Author

Dibuat untuk keperluan monitoring pabrik es

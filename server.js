const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const csv = require('csv-parser');
const XLSX = require('xlsx');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS untuk development (React dev server)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Set EJS sebagai template engine (untuk backward compatibility)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use(express.static(path.join(__dirname, 'client/dist')));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup multer untuk upload CSV dan Excel
// Untuk Vercel: gunakan /tmp directory karena serverless
const upload = multer({ 
  dest: '/tmp/uploads/',
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const allowedExtensions = ['.csv', '.xls', '.xlsx'];
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (allowedTypes.includes(file.mimetype) || allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV and Excel files are allowed!'));
    }
  }
});

// Variable untuk menyimpan data (akan di-override saat upload CSV)
let currentData = require('./data/oee-data');

// Routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'OEE Dashboard - Ice Plant Monitoring'
  });
});

// API endpoint untuk data
app.get('/api/data', (req, res) => {
  const { startDate, endDate } = req.query;
  
  // Filter data berdasarkan tanggal jika ada
  let filteredData = currentData;
  
  if (startDate && endDate) {
    filteredData = currentData.filter(item => {
      const itemDate = item['Tanggal'] || item.date || '';
      return itemDate >= startDate && itemDate <= endDate;
    });
  }
  
  res.json(filteredData);
});

// API endpoint untuk upload CSV/Excel
app.post('/api/upload-csv', upload.single('csvFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const results = [];
  const filePath = req.file.path;
  const fileExt = path.extname(req.file.originalname).toLowerCase();

  // Function to convert row to our data format
  const convertRowToFormat = (data) => {
    return {
      'Tanggal': data['Tanggal'] || data.Tanggal || data.date || data.Date || '',
      'Es Keluar (Bal)': Number(data['Es Keluar (Bal)'] || data.esKeluar || data['Es Keluar'] || 0),
      'Defect Bak 1 (Bal)': Number(data['Defect Bak 1 (Bal)'] || data.bak1 || data.Bak1 || data['Bak 1'] || 0),
      'Defect Bak 2 (Bal)': Number(data['Defect Bak 2 (Bal)'] || data.bak2 || data.Bak2 || data['Bak 2'] || 0),
      'Es Tidak Terjual (Bal)': Number(data['Es Tidak Terjual (Bal)'] || data.tidakTerjual || data['Tidak Terjual'] || 0),
      'Permintaan Es (Bal)': Number(data['Permintaan Es (Bal)'] || data.order || data.Order || 0),
      'Waktu Operasi (Jam)': Number(data['Waktu Operasi (Jam)'] || data.totalBeban || data['Total Beban'] || 0),
      'Waktu Aktual Produksi (Jam)': Number(data['Waktu Aktual Produksi (Jam)'] || data.normal || data.Normal || 0),
      'Jam Beban Puncak (Jam)': Number(data['Jam Beban Puncak (Jam)'] || data.puncak || data.Puncak || 0),
      'Produksi Ideal (Bal)': Number(data['Produksi Ideal (Bal)'] || data.kapasitas || data.Kapasitas || 0),
      'Jumlah Mesin': Number(data['Jumlah Mesin'] || data.mesin || data.Mesin || 0),
      'Produktivitas (Bal/Jam)': Number(data['Produktivitas (Bal/Jam)'] || data.prodJam || data['Prod Jam'] || 0),
      'Jumlah Pekerja': Number(data['Jumlah Pekerja'] || data.tenagaKerja || data['Tenaga Kerja'] || 0),
      'Output per Pekerja (Bal)': Number(data['Output per Pekerja (Bal)'] || data.outputTK || data['Output TK'] || 0),
      'Realisasi Order (Bal)': Number(data['Realisasi Order (Bal)'] || data.realisasiOrder || data['Realisasi Order'] || 0),
      'Selisih Order (Bal)': Number(data['Selisih Order (Bal)'] || data.selisihOrder || data['Selisih Order'] || 0),
      'Persentase Penjualan (%)': Number(data['Persentase Penjualan (%)'] || data.persenPenjualan || data['Persen Penjualan'] || 0),
      'Total Defect (Bal)': Number(data['Total Defect (Bal)'] || data.totalRusak || data['Total Rusak'] || 0),
    };
  };

  // Function to save data
  const saveData = (data) => {
    // Update current data in memory
    currentData = data;
    
    // Try to save to file (will work locally, may not work on Vercel)
    try {
      const dataFilePath = path.join(__dirname, 'data', 'oee-data.js');
      const dataContent = `// Data OEE - Auto-generated from file upload\n// Last updated: ${new Date().toISOString()}\n\nconst rawDataOriginal = ${JSON.stringify(data, null, 2)};\n\nmodule.exports = rawDataOriginal;\n`;
      fs.writeFileSync(dataFilePath, dataContent);
    } catch (error) {
      console.warn('Cannot write to file system (normal on serverless):', error.message);
    }
    
    res.json({ 
      success: true, 
      message: `Successfully imported ${data.length} records`,
      recordCount: data.length,
      dateRange: {
        start: data[0]?.['Tanggal'] || data[0]?.date,
        end: data[data.length - 1]?.['Tanggal'] || data[data.length - 1]?.date
      }
    });
  };

  try {
    // Handle Excel files (.xlsx, .xls)
    if (fileExt === '.xlsx' || fileExt === '.xls') {
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0]; // Read first sheet
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      // Convert each row
      jsonData.forEach((row) => {
        results.push(convertRowToFormat(row));
      });
      
      // Cleanup uploaded file
      fs.unlinkSync(filePath);
      
      saveData(results);
    } 
    // Handle CSV files
    else if (fileExt === '.csv') {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
          results.push(convertRowToFormat(data));
        })
        .on('end', () => {
          // Cleanup uploaded file
          fs.unlinkSync(filePath);
          saveData(results);
        })
        .on('error', (error) => {
          // Cleanup on error
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
          res.status(500).json({ error: 'Error parsing CSV: ' + error.message });
        });
    } else {
      // Cleanup and return error
      fs.unlinkSync(filePath);
      res.status(400).json({ error: 'Unsupported file format' });
    }
  } catch (error) {
    // Cleanup on error
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    res.status(500).json({ error: 'Error processing file: ' + error.message });
  }
});

// API endpoint untuk download template CSV
app.get('/api/download-template', (req, res) => {
  const format = req.query.format || 'csv'; // csv or xlsx
  
  const data = [
    {
      date: '2024-05-01',
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
      outputTK: 75.4
    },
    {
      date: '2024-05-02',
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
      outputTK: 149.7
    }
  ];

  if (format === 'xlsx') {
    // Create Excel file
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'OEE Data');
    
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=oee-template.xlsx');
    res.send(buffer);
  } else {
    // CSV format
    const csvHeader = 'date,esKeluar,bak1,bak2,totalRusak,realisasiOrder,normal,puncak,totalBeban,mesin,prodJam,kapasitas,tidakTerjual,persenPenjualan,order,selisihOrder,tenagaKerja,outputTK\n';
    const csvExample = '2024-05-01,2114,2,2,4,2110,32,8,40,3,53,4803,2689,44,2110,0,28,75.4\n';
    const csvExample2 = '2024-05-02,4201,3,3,6,4192,48,0,48,3,87,4803,602,87,4192,0,28,149.7\n';
    
    const csvContent = csvHeader + csvExample + csvExample2;
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=oee-template.csv');
    res.send(csvContent);
  }
});

// API untuk reset ke data default
app.post('/api/reset-data', (req, res) => {
  // Reload original data
  delete require.cache[require.resolve('./data/oee-data')];
  currentData = require('./data/oee-data');
  
  res.json({ 
    success: true, 
    message: 'Data reset to default',
    recordCount: currentData.length 
  });
});

// Ensure uploads directory exists (for local development)
const uploadsDir = process.env.VERCEL ? '/tmp/uploads' : 'uploads';
if (!fs.existsSync(uploadsDir)) {
  try {
    fs.mkdirSync(uploadsDir, { recursive: true });
  } catch (error) {
    console.warn('Cannot create uploads directory:', error.message);
  }
}

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// SPA fallback - semua route non-API serve index.html React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 OEE Dashboard - Ice Plant Monitoring`);
  console.log(`📁 CSV & Excel Import feature enabled`);
  console.log(`🌍 Environment: ${process.env.VERCEL ? 'Vercel (Serverless)' : 'Local'}`);
});

// Export untuk Vercel serverless
module.exports = app;

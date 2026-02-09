const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const csv = require('csv-parser');
const XLSX = require('xlsx');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS sebagai template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (JavaScript only, CSS is inline in EJS)
app.use('/js', express.static(path.join(__dirname, 'public/js')));

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
      return item.date >= startDate && item.date <= endDate;
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
      date: data.date || data.Date || data.DATE,
      esKeluar: Number(data.esKeluar || data['Es Keluar'] || 0),
      bak1: Number(data.bak1 || data.Bak1 || data['Bak 1'] || 0),
      bak2: Number(data.bak2 || data.Bak2 || data['Bak 2'] || 0),
      totalRusak: Number(data.totalRusak || data['Total Rusak'] || 0),
      realisasiOrder: Number(data.realisasiOrder || data['Realisasi Order'] || 0),
      normal: Number(data.normal || data.Normal || 0),
      puncak: Number(data.puncak || data.Puncak || 0),
      totalBeban: Number(data.totalBeban || data['Total Beban'] || 0),
      mesin: Number(data.mesin || data.Mesin || 0),
      prodJam: Number(data.prodJam || data['Prod Jam'] || 0),
      kapasitas: Number(data.kapasitas || data.Kapasitas || 0),
      tidakTerjual: Number(data.tidakTerjual || data['Tidak Terjual'] || 0),
      persenPenjualan: Number(data.persenPenjualan || data['Persen Penjualan'] || 0),
      order: Number(data.order || data.Order || 0),
      selisihOrder: Number(data.selisihOrder || data['Selisih Order'] || 0),
      tenagaKerja: Number(data.tenagaKerja || data['Tenaga Kerja'] || 0),
      outputTK: Number(data.outputTK || data['Output TK'] || 0),
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
        start: data[0]?.date,
        end: data[data.length - 1]?.date
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

app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 OEE Dashboard - Ice Plant Monitoring`);
  console.log(`📁 CSV & Excel Import feature enabled`);
  console.log(`🌍 Environment: ${process.env.VERCEL ? 'Vercel (Serverless)' : 'Local'}`);
});

// Export untuk Vercel serverless
module.exports = app;

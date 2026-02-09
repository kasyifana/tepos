# Deployment ke Vercel

## ⚠️ Catatan Penting untuk Vercel

Aplikasi ini sudah di-optimize untuk deployment di Vercel dengan beberapa keterbatasan:

### 🚀 Cara Deploy ke Vercel

1. **Install Vercel CLI** (opsional):
```bash
npm install -g vercel
```

2. **Deploy via Vercel CLI**:
```bash
vercel
```

Atau **Deploy via Vercel Dashboard**:
- Push ke GitHub
- Import project di [vercel.com](https://vercel.com)
- Deploy otomatis!

### ⚙️ Environment Variables (Opsional)

Tidak ada environment variables yang wajib, tapi bisa ditambahkan di Vercel Dashboard jika perlu:
```
PORT=3000  (otomatis di-set oleh Vercel)
NODE_ENV=production
```

### ⚠️ Keterbatasan di Vercel (Serverless)

#### 1. **CSV/Excel Upload Tidak Persisten**
- ✅ Upload file **BERFUNGSI**
- ❌ Data **TIDAK TERSIMPAN** setelah serverless function restart
- 💡 **Solusi**: Data hanya tersimpan di memory selama session aktif
- 🔄 Jika perlu persistent storage, gunakan:
  - Database (PostgreSQL, MongoDB, etc.)
  - Vercel KV Storage
  - External API

#### 2. **File System Read-Only**
- ✅ Bisa **READ** files dari project
- ❌ Tidak bisa **WRITE** files permanent
- 💡 Uploaded data tersimpan di `/tmp` (temporary, hilang setelah restart)

#### 3. **Cold Starts**
- Request pertama mungkin lambat (1-3 detik)
- Request berikutnya lebih cepat

### ✅ Yang Berfungsi Normal di Vercel

- ✅ Dashboard view & charts
- ✅ Date filtering
- ✅ Download template CSV/Excel
- ✅ Upload & view data (temporary session)
- ✅ All visualizations
- ✅ Responsive design

### 📝 Rekomendasi untuk Production

Jika Anda perlu **persistent data upload**, pertimbangkan salah satu:

#### Option 1: Vercel + Database
```bash
npm install @vercel/postgres
# atau
npm install mongodb
```

#### Option 2: Traditional Hosting
Deploy ke platform yang support persistent storage:
- Railway
- Render
- Heroku
- Digital Ocean
- AWS EC2

#### Option 3: Vercel KV (Key-Value Storage)
```bash
npm install @vercel/kv
```

### 🔧 Files Penting untuk Vercel

- `vercel.json` - Konfigurasi deployment
- `.vercelignore` - Files yang diabaikan saat deploy
- `package.json` - Dependencies & build scripts

### 📊 Testing Locally

Test seperti di Vercel:
```bash
npm start
```

### 🌐 URL Deployment

Setelah deploy, Anda akan mendapat URL seperti:
```
https://your-project.vercel.app
```

### 🐛 Troubleshooting

**Error 500 Internal Server Error:**
- ✅ Sudah diperbaiki dengan `/tmp` directory
- ✅ Error handling untuk read-only filesystem
- ✅ Module.exports untuk serverless compatibility

**Data hilang setelah refresh:**
- Normal untuk serverless environment
- Gunakan database untuk persistent storage

**Upload tidak berfungsi:**
- Check ukuran file (max 4.5MB di Vercel free tier)
- Check format file (.csv, .xlsx, .xls)

---

**Dibuat dengan ❤️ untuk Vercel Deployment**

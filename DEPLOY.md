# Quick Deployment Guide - Vercel

## 🚀 Deploy dalam 3 Langkah

### Option 1: Via Vercel CLI (Tercepat)

```bash
# 1. Install Vercel CLI (jika belum)
npm install -g vercel

# 2. Login ke Vercel
vercel login

# 3. Deploy!
vercel
```

### Option 2: Via GitHub + Vercel Dashboard

```bash
# 1. Push ke GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repo.git
git push -u origin main

# 2. Buka https://vercel.com
# 3. Klik "Import Project"
# 4. Select GitHub repo
# 5. Klik "Deploy"
```

## ⚠️ Penting!

### ✅ Yang Sudah Di-fix untuk Vercel:
- Upload directory ke `/tmp` (serverless compatible)
- Error handling untuk read-only filesystem
- Module export untuk serverless
- Node version specified (18.x)

### ❌ Keterbatasan Vercel:
- **Upload data TIDAK PERSISTEN** (hilang setelah restart)
- Hanya tersimpan di memory selama session
- **Solusi**: Untuk production, gunakan database

### 📋 Checklist Pre-Deploy:

- [ ] File `vercel.json` sudah ada
- [ ] File `.vercelignore` sudah ada  
- [ ] Package.json sudah update dengan engines
- [ ] Server.js sudah export module
- [ ] Tested locally dengan `npm start`

## 🔧 Environment Variables (Optional)

Tidak ada yang wajib, tapi bisa set di Vercel Dashboard jika perlu:

```env
NODE_ENV=production
```

## 📊 Setelah Deploy

URL Anda akan seperti:
```
https://tepos-username.vercel.app
```

Auto-deploy setiap push ke GitHub! 🎉

## 🐛 Troubleshooting

**Error 500:**
- Cek logs di Vercel Dashboard
- Biasanya karena missing dependencies

**Upload tidak berfungsi:**
- Normal! Data tidak persisten di serverless
- Gunakan database untuk persistent storage

**Build gagal:**
- Cek `package.json` dependencies
- Pastikan semua dependencies di `dependencies` bukan `devDependencies`

---

**Need Help?** Check `DEPLOYMENT.md` untuk detail lengkap.

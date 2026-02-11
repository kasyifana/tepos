# 🚀 Deploy ke Vercel - Step by Step

## Langkah 1: Persiapan File

✅ Sudah selesai:
- React build: `client/dist/` ✓
- vercel.json configured ✓
- server.js ready ✓

## Langkah 2: Install Vercel CLI

```bash
npm install -g vercel
```

## Langkah 3: Login ke Vercel

```bash
vercel login
```

Pilih method login (GitHub, GitLab, Email, etc.)

## Langkah 4: Deploy!

```bash
# Di folder root project
cd "/Users/user/Campuss/Semester 5/tepos"
vercel
```

### Pertanyaan yang akan muncul:

1. **"Set up and deploy?"** → Press `Y` (Yes)

2. **"Which scope?"** → Pilih account kamu

3. **"Link to existing project?"** → Press `N` (No) - karena project baru

4. **"What's your project's name?"** → Ketik nama, misal: `oee-dashboard` atau tekan Enter (pakai nama folder)

5. **"In which directory is your code located?"** → Press Enter (pakai `.`)

6. **"Want to override the settings?"** → Press `N` (No)

Tunggu proses deploy... ⏳

## Langkah 5: Deployment Selesai!

Vercel akan kasih:
```
✅ Deployed to production!
🔗 https://oee-dashboard-xxxxx.vercel.app
```

## Langkah 6: Test Deployment

Buka URL yang dikasih Vercel, test:
1. Dashboard muncul? ✓
2. Upload CSV/Excel works? ✓
3. Metrics calculate? ✓

---

## 🔄 Deploy Ulang (Kalau Ada Update)

### Method 1: Auto Deploy (GitHub)
```bash
git add .
git commit -m "Update features"
git push
```
Vercel auto-deploy setiap push!

### Method 2: Manual Deploy
```bash
vercel --prod
```

---

## ⚠️ Troubleshooting

### Error: "Command not found: vercel"
```bash
npm install -g vercel
```

### Build gagal di Vercel
Check Vercel logs di dashboard:
- https://vercel.com/dashboard
- Klik project → Deployments → Lihat error

Common issues:
- Missing dependencies → Add to package.json
- Build command salah → Check vercel.json

### Data upload tidak persisten
✅ Expected behavior (serverless limitation)
💡 Solution: Gunakan database (Vercel Postgres, MongoDB)

---

## 📱 Vercel Dashboard

Akses: https://vercel.com/dashboard

Features:
- ✅ Deployment history
- ✅ Logs & analytics
- ✅ Environment variables
- ✅ Custom domain
- ✅ Auto previews

---

## 🎯 Next Steps After Deploy

1. **Custom Domain** (Optional)
   - Vercel dashboard → Settings → Domains
   - Add your domain

2. **Environment Variables** (Optional)
   - Settings → Environment Variables
   - Add `NODE_ENV=production`

3. **Analytics** (Free)
   - Auto-enabled di Vercel

4. **Database** (For persistent uploads)
   - Vercel Postgres
   - MongoDB Atlas
   - Supabase

---

## 🔗 Quick Commands

```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel

# Check deployment status
vercel ls

# View logs
vercel logs

# Remove deployment
vercel rm [deployment-url]
```

---

**Ready?** Run `vercel` dan ikuti step di atas! 🚀

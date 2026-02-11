# Vercel Deployment Guide - React + Node.js

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│         Vercel Platform             │
│                                     │
│  ┌──────────────┐  ┌─────────────┐ │
│  │   Frontend   │  │   Backend   │ │
│  │ React (SPA)  │  │  Node.js    │ │
│  │   /client    │  │  server.js  │ │
│  └──────────────┘  └─────────────┘ │
│         │                  │        │
│         │                  │        │
│    Static Files       API Routes   │
│     (dist/)            (/api/*)    │
└─────────────────────────────────────┘
```

## 📋 Pre-Deployment Checklist

- [x] React build works locally
- [x] Backend API works with React
- [x] vercel.json configured
- [x] CORS enabled in server.js
- [x] Node 24.x in package.json
- [x] Build scripts ready

## 🚀 Deployment Steps

### Option 1: Via Vercel CLI (Recommended)

```bash
# 1. Install Vercel CLI (if not installed)
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy!
vercel
```

### Option 2: Via GitHub + Vercel Dashboard

```bash
# 1. Commit all changes
git add .
git commit -m "Add React frontend with Node.js API"
git push origin main

# 2. Go to https://vercel.com
# 3. Import your GitHub repository
# 4. Vercel will auto-deploy
```

## ⚙️ Vercel Configuration

### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    },
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/server.js" },
    { "src": "/(.*)", "dest": "/client/dist/$1" }
  ]
}
```

### How it works:
1. **Static Build**: Builds React app (`client/dist/`)
2. **Serverless API**: Deploys `server.js` as serverless function
3. **Routing**: 
   - `/api/*` → Backend (server.js)
   - Everything else → React (client/dist/)

## 🔧 Environment Variables (Optional)

Set in Vercel Dashboard if needed:
```
NODE_ENV=production
```

## 📊 Build Process

Vercel will automatically:

1. **Build Frontend**:
   ```bash
   cd client
   npm install
   npm run build
   # Output: client/dist/
   ```

2. **Deploy Backend**:
   ```bash
   npm install
   # server.js deployed as serverless function
   ```

## ✅ Testing Deployment

After deployment, test:

1. **Frontend**: https://your-app.vercel.app
   - Should show React dashboard
   - Check browser console for errors

2. **API**: https://your-app.vercel.app/api/data
   - Should return JSON data
   - Test upload: Use UI to upload CSV/Excel

## ⚠️ Known Limitations

### 1. File Uploads (IMPORTANT!)
- **Temporary storage**: Uploads saved to `/tmp/uploads/`
- **Not persistent**: Files deleted after serverless function ends
- **Solution**: Data stored in memory during session
- **For production**: Use database (PostgreSQL, MongoDB, Supabase)

### 2. Data Persistence
- **Current**: Data resets on cold start
- **Recommended**: Migrate to database for permanent storage

### 3. Serverless Timeouts
- **Max execution**: 10 seconds (Hobby plan)
- **Large file uploads**: May timeout on big CSV/Excel files

## 🐛 Troubleshooting

### Build Fails
```bash
# Check build logs in Vercel dashboard
# Common fixes:
- Ensure all dependencies in package.json
- Check Node version (24.x)
- Verify client/dist/ is created
```

### API Returns 500
```bash
# Check server logs in Vercel dashboard
# Common issues:
- CORS not configured
- File upload path issues (/tmp/uploads/)
- Missing environment variables
```

### Frontend Blank Page
```bash
# Check browser console
# Common fixes:
- Ensure routes configured correctly in vercel.json
- Check if client/dist/index.html exists
- Verify API proxy is working
```

### Upload Not Working
```bash
# Expected behavior:
- Upload works but data is temporary
- Resets on serverless function restart

# Solution for production:
- Add database integration
- See DEPLOYMENT.md for database options
```

## 🔄 Redeploy After Changes

```bash
# Commit changes
git add .
git commit -m "Update feature"
git push

# Or via CLI
vercel --prod
```

## 📈 Performance Tips

1. **Enable caching** for static assets
2. **Optimize images** in client/public
3. **Minimize bundle size**: Check with `npm run build`
4. **Use CDN** for Chart.js (already done)

## 🎯 Post-Deployment

After successful deployment:

1. ✅ Test all features
2. ✅ Check upload functionality
3. ✅ Verify date filtering
4. ✅ Test CSV/Excel import
5. ✅ Monitor Vercel analytics

## 🔗 Useful Links

- Vercel Dashboard: https://vercel.com/dashboard
- Vercel Docs: https://vercel.com/docs
- Deployment Logs: Check Vercel dashboard

## 💾 Database Integration (Future)

For permanent data storage, consider:

1. **Vercel Postgres** (Recommended)
   ```bash
   vercel postgres create
   ```

2. **MongoDB Atlas** (Free tier available)
   - Cloud-hosted MongoDB
   - Easy integration

3. **Supabase** (Open source)
   - PostgreSQL + API
   - Real-time features

---

**Ready to Deploy?** Run `vercel` and follow the prompts! 🚀

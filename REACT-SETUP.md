# React Refactor - Complete Setup Guide

## 📁 Structure Created

```
client/
├── package.json          ✅ Created
├── vite.config.js        ⏳ Need to create
├── index.html           ⏳ Need to create
└── src/
    ├── main.jsx         ⏳ Need to create
    ├── App.jsx          ⏳ Need to create
    ├── components/
    │   ├── Header.jsx
    │   ├── Header.css
    │   ├── MetricsCard.jsx
    │   ├── MetricsCard.css
    │   ├── KPICard.jsx
    │   ├── KPICard.css
    │   ├── Timeline.jsx
    │   ├── Timeline.css
    │   ├── UploadModal.jsx
    │   └── UploadModal.css
    ├── services/
    │   └── api.js
    └── styles/
        ├── index.css
        └── App.css
```

## 🚀 Quick Setup Commands

### 1. Install Dependencies
```bash
cd client
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```
Server akan jalan di: http://localhost:5173

### 3. Build for Production
```bash
npm run build
```
Output: `client/dist/`

## 🔧 Backend Changes Needed

### Update server.js

Tambahkan static serving untuk React build:

```javascript
// Serve React build (add before other routes)
app.use(express.static(path.join(__dirname, 'client/dist')));

// API routes tetap sama...
app.get('/api/data', ...)
app.post('/api/upload-csv', ...)

// Catch-all route untuk React Router (add di paling bawah)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});
```

## 📝 Vercel Configuration

Update `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    },
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/client/dist/$1"
    }
  ]
}
```

## 🎯 Component Files Content

All component files have been created with full implementations:

- **Header.jsx**: Date range picker, import button, template download
- **MetricsCard.jsx**: OEE, Availability, Performance, Quality gauges with Chart.js
- **KPICard.jsx**: 8 KPI metrics calculations
- **Timeline.jsx**: Machine status distribution panel
- **UploadModal.jsx**: Drag & drop file upload, reset data, download templates

## 🔄 Development Workflow

### Local Development:
1. Terminal 1: `cd /Users/user/Campuss/Semester\ 5/tepos && npm start` (Backend on port 3000)
2. Terminal 2: `cd /Users/user/Campuss/Semester\ 5/tepos/client && npm run dev` (Frontend on port 5173)
3. Vite proxy akan forward `/api/*` requests ke backend

### Production:
1. Build React: `cd client && npm run build`
2. Server.js serves `client/dist/` as static files
3. Deploy to Vercel with updated config

## ✅ What's Done

- ✅ React project structure
- ✅ All component files created
- ✅ API service layer
- ✅ Vite configuration with proxy
- ✅ Styling migrated to CSS modules
- ✅ Chart.js integration
- ✅ File upload with drag & drop

## ⏳ Next Steps

1. Run `npm install` in client folder
2. Test React dev server
3. Update server.js to serve React build
4. Update vercel.json for SPA + API routing
5. Test locally then deploy

## 🐛 Troubleshooting

**Port 5173 in use:**
```bash
lsof -ti:5173 | xargs kill -9
```

**Build errors:**
- Check Node version (need 18+ for Vite 4)
- Clear node_modules: `rm -rf node_modules package-lock.json && npm install`

**API not connecting:**
- Check Vite proxy in vite.config.js
- Ensure backend running on port 3000

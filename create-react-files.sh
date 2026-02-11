#!/bin/bash

# Styles
cat > client/src/styles/index.css << 'EOF'
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary-blue: #0066ff;
  --bg-gray: #f5f7fa;
  --white: #ffffff;
  --text-dark: #1a1a1a;
  --text-gray: #6b7280;
  --border-light: #e5e7eb;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  --info: #3b82f6;
}

body {
  font-family: "Inter", sans-serif;
  background: var(--bg-gray);
  color: var(--text-dark);
  padding: 20px;
}

#root {
  min-height: 100vh;
}
EOF

cat > client/src/styles/App.css << 'EOF'
.app {
  min-height: 100vh;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 18px;
  color: var(--text-gray);
}

.main-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

@media (max-width: 1200px) {
  .main-grid {
    grid-template-columns: 1fr;
  }
}
EOF

echo "✅ Styles created"

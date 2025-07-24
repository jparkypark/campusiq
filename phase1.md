# Phase 1: Monorepo Setup & Structure

## Overview
Set up the foundational monorepo structure with Node.js/TypeScript backend and React/TypeScript frontend, including development tooling and concurrent execution capabilities.

---

## Task 1.1: Initialize monorepo with workspace structure

### Steps:
1. Create the monorepo directory structure:
```bash
mkdir -p packages/backend packages/frontend
```

2. Verify directory structure:
```
campusiq/
├── packages/
│   ├── backend/
│   └── frontend/
├── REQUIREMENTS.md
├── PLANNING.md
├── TASKS.md
└── phase1.md
```

---

## Task 1.2: Set up Node.js/TypeScript backend with Express.js

### Steps:
1. Create backend directory structure:
```bash
mkdir -p packages/backend/src/{routes,services,models,types}
```

2. Create `packages/backend/package.json`:
```json
{
  "name": "@campusiq/backend",
  "version": "1.0.0",
  "main": "dist/index.js",
  "scripts": {
    "dev": "nodemon src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "better-sqlite3": "^9.2.2",
    "axios": "^1.6.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.17",
    "@types/better-sqlite3": "^7.6.8",
    "@types/node": "^20.10.5",
    "typescript": "^5.3.3",
    "nodemon": "^3.0.2",
    "ts-node": "^10.9.2"
  }
}
```

3. Create basic Express server `packages/backend/src/index.ts`:
```typescript
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend server is running' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
```

4. Directory structure after setup:
```
packages/backend/
├── src/
│   ├── index.ts
│   ├── routes/
│   ├── services/
│   ├── models/
│   └── types/
├── package.json
└── tsconfig.json (created in Task 1.6)
```

---

## Task 1.3: Set up React frontend with TypeScript and Vite

### Steps:
1. Create `packages/frontend/package.json`:
```json
{
  "name": "@campusiq/frontend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@tanstack/react-query": "^5.15.5",
    "react-router-dom": "^6.20.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.45",
    "@types/react-dom": "^18.2.18",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.3.3",
    "vite": "^5.0.8"
  }
}
```

2. Create `packages/frontend/vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
})
```

3. Create basic React app structure:
```bash
mkdir -p packages/frontend/src/{components,pages,hooks,types}
mkdir -p packages/frontend/public
```

4. Create `packages/frontend/src/main.tsx`:
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

5. Create `packages/frontend/src/App.tsx`:
```typescript
import React from 'react'

function App() {
  return (
    <div>
      <h1>CampusIQ - News, Weather & Stocks</h1>
      <p>Frontend is running!</p>
    </div>
  )
}

export default App
```

6. Create `packages/frontend/index.html`:
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CampusIQ</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## Task 1.4: Configure shared package.json with workspaces

### Steps:
1. Create root `package.json`:
```json
{
  "name": "campusiq-monorepo",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:backend": "npm run dev --workspace=@campusiq/backend",
    "dev:frontend": "npm run dev --workspace=@campusiq/frontend",
    "build": "npm run build --workspaces",
    "build:backend": "npm run build --workspace=@campusiq/backend",
    "build:frontend": "npm run build --workspace=@campusiq/frontend",
    "install:all": "npm install && npm install --workspaces"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
```

---

## Task 1.5: Set up development scripts for concurrent development

### Steps:
1. Install concurrently for parallel execution:
```bash
npm install --save-dev concurrently
```

2. Scripts are already configured in root package.json (Task 1.4)

3. Test scripts:
```bash
# Install all dependencies
npm run install:all

# Run both backend and frontend concurrently
npm run dev

# Run individually
npm run dev:backend
npm run dev:frontend
```

---

## Task 1.6: Configure TypeScript configs for both packages

### Steps:
1. Create root `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020"],
    "module": "commonjs",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "outDir": "./dist"
  },
  "exclude": ["node_modules", "dist"]
}
```

2. Create `packages/backend/tsconfig.json`:
```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"],
      "@/types/*": ["./types/*"],
      "@/services/*": ["./services/*"],
      "@/models/*": ["./models/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

3. Create `packages/frontend/tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/pages/*": ["./pages/*"],
      "@/hooks/*": ["./hooks/*"],
      "@/types/*": ["./types/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

4. Create `packages/frontend/tsconfig.node.json`:
```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

---

## Validation Steps

After completing all tasks, verify the setup:

1. **Install dependencies**:
```bash
npm run install:all
```

2. **Start development servers**:
```bash
npm run dev
```

3. **Check endpoints**:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:3001/api/health`

4. **Verify TypeScript compilation**:
```bash
npm run build
```

---

## Expected Final Structure

```
campusiq/
├── package.json (workspace config)
├── tsconfig.json (shared TS config)
├── packages/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   └── types/
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── frontend/
│       ├── src/
│       │   ├── main.tsx
│       │   ├── App.tsx
│       │   ├── components/
│       │   ├── pages/
│       │   ├── hooks/
│       │   └── types/
│       ├── public/
│       ├── index.html
│       ├── package.json
│       ├── tsconfig.json
│       ├── tsconfig.node.json
│       └── vite.config.ts
├── REQUIREMENTS.md
├── PLANNING.md
├── TASKS.md
└── phase1.md
```

---

## Success Criteria

- ✅ Monorepo structure created with packages/backend and packages/frontend
- ✅ Backend runs on port 3001 with Express.js and TypeScript
- ✅ Frontend runs on port 3000 with React, TypeScript, and Vite
- ✅ Concurrent development with `npm run dev`
- ✅ TypeScript compilation works for both packages
- ✅ Workspace dependencies properly configured
- ✅ Basic health check endpoint responding
- ✅ Frontend displays and connects to backend via proxy
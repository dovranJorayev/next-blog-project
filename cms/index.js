import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs/promises';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

import articlesRoutes from './routes/articles.js';
import revalidateRoutes from './routes/revalidate.js';

// Routes
app.use('/api/articles', articlesRoutes);
app.use('/api/revalidate', revalidateRoutes);

// Storage directory
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const storageDir = path.join(__dirname, 'storage');

// Ensure storage directory exists
async function ensureStorageDir() {
  try {
    await fs.mkdir(storageDir, { recursive: true });
    
    // Check if articles.json exists, if not create it
    const articlesPath = path.join(storageDir, 'articles.json');
    try {
      await fs.access(articlesPath);
    } catch  {
      // File doesn't exist, create it with empty array
      await fs.writeFile(articlesPath, JSON.stringify([], null, 2));
    }
  } catch (err) {
    console.error('Error setting up storage directory:', err);
  }
}

// Start server
async function startServer() {
  await ensureStorageDir();
  
  app.listen(PORT, () => {
    console.log(`CMS server running on port ${PORT}`);
  });
}

startServer(); 
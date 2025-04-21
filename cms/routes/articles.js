import express from 'express';
import path from 'path';
import fs from 'fs/promises';

const router = express.Router();
// In ES modules, __dirname is not available, so we need to construct it
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const storageDir = path.join(__dirname, '../storage');
const articlesPath = path.join(storageDir, 'articles.json');

// Get all articles
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    
    const articlesData = await fs.readFile(articlesPath, 'utf8');
    const allArticles = JSON.parse(articlesData);
    
    // Calculate pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedArticles = allArticles.slice(startIndex, endIndex);
    
    res.json({
      articles: paginatedArticles.map(article => ({
        ...article,
        publishedAt: new Date().toISOString(),
      })),
      pagination: {
        total: allArticles.length,
        page,
        pageSize,
        totalPages: Math.ceil(allArticles.length / pageSize)
      }
    });
  } catch (error) {
    console.error('Error reading articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// Get article by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const articlesData = await fs.readFile(articlesPath, 'utf8');
    const articles = JSON.parse(articlesData);
    
    const article = articles.find(article => article.slug === slug);
    
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    res.json({
      ...article,
      publishedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error(`Error fetching article with slug ${req.params.slug}:`, error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// Create a new article
router.post('/', async (req, res) => {
  try {
    const newArticle = req.body;
    
    // Basic validation
    if (!newArticle.title || !newArticle.slug || !newArticle.content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Read existing articles
    const articlesData = await fs.readFile(articlesPath, 'utf8');
    const articles = JSON.parse(articlesData);
    
    // Check for duplicate slug
    if (articles.some(article => article.slug === newArticle.slug)) {
      return res.status(400).json({ error: 'Article with this slug already exists' });
    }
    
    // Add ID and timestamps
    newArticle.id = Date.now();
    if (!newArticle.publishedAt) {
      newArticle.publishedAt = new Date().toISOString();
    }
    
    // Add to articles
    articles.push(newArticle);
    
    // Save to file
    await fs.writeFile(articlesPath, JSON.stringify(articles, null, 2));
    
    res.status(201).json(newArticle);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
});

export default router;
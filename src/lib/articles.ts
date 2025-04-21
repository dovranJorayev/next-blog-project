import { Article } from './types';

// Base URL for API calls
const API_URL = 'http://localhost:3001/api';

// Fetch all articles with cache
export async function getArticles(): Promise<Article[]> {
  const res = await fetch(`${API_URL}/articles`, {
    // This option enables caching and makes the page static
    // Use force-cache for longer-term caching
    next: { tags: ['articles'] }
  }).catch((error) => {
    console.error('Error getArticles:', error);
    throw error;
  });
  
  if (!res.ok) {
    throw res;
  }
  
  return res.json().catch((error) => {
    console.error('Error getArticles json:', error);
    throw error;
  });;
}

// Fetch a single article by slug with cache
export async function getArticleBySlug(slug: string): Promise<Article> {
  const res = await fetch(`${API_URL}/articles/${slug}`, {
    next: { tags: ['articles', `articles/${slug}`] } 
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch article');
  }
  
  return res.json();
}

// Revalidate the cache - used by the webhook
export async function revalidateArticles(): Promise<void> {
  await fetch(`${API_URL}/revalidate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  });
} 
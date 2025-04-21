# Blog CMS

A simple Express-based CMS for managing blog content.

## Getting Started

1. Install dependencies:
```
npm install
```

2. Start the development server:
```
npm run dev
```

The server will start on port 3001 by default.

## API Endpoints

- `GET /api/articles` - Get all articles
- `GET /api/articles/:slug` - Get a specific article by slug
- `POST /api/articles` - Create a new article

## Data Structure

Articles are stored in JSON format in the `storage/articles.json` file.

Each article has the following structure:

```json
{
  "id": 1,
  "title": "Article Title",
  "slug": "article-slug",
  "excerpt": "Short excerpt of the article",
  "content": "Full article content",
  "author": "Author Name",
  "publishedAt": "2023-01-01T00:00:00Z",
  "readTime": "5 min"
}
``` 
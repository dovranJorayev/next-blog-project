import { Metadata } from 'next';
import Link from 'next/link';
import { getArticles } from '@/lib/articles';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Articles | Next.js Blog',
  description: 'Read our latest articles about web development and React',
};

export default async function ArticlesPage() {
  const {articles} = await getArticles();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Articles ({articles.length})</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link key={article.id} href={`/articles/${article.slug}`}>
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                <CardDescription>
                  By {article.author} • {article.readTime}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-3">{article.excerpt}</p>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                Published: {formatDate(article.publishedAt)}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 
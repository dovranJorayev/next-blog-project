import Link from 'next/link';

export default function ArticleNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
      <p className="text-gray-600 mb-8">
        The article you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link 
        href="/articles" 
        className="text-blue-600 hover:underline inline-block"
      >
        ← Back to Articles
      </Link>
    </div>
  );
} 
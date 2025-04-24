import { getArticleBySlug, getArticles, } from "@/lib/articles";
import { formatDate } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { draftMode } from 'next/headers'

export const dynamic = 'force-static';
export const dynamicParams = true;

// Generate metadata for each article page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    return {
      title: `${article.title} | Next.js Blog`,
      description: article.excerpt,
    };
  } catch {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }
}

// Generate static params for all articles
export async function generateStaticParams() {
  const {articles} = await getArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  try {
    const draft = await draftMode();
    if (draft.isEnabled) console.log('Draft mode is enabled');
    else console.log('Draft mode is disabled');

    const { slug } = await params;
    const article = await getArticleBySlug(slug).catch(e => {
      console.error('Error fetching article:', e);
      throw e;
    });

    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link
          href="/articles"
          className="text-blue-600 hover:underline mb-6 inline-block"
        >
          ← Back to Articles
        </Link>

        <article className="prose lg:prose-xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

          <div className="flex items-center gap-4 text-gray-600 mb-8">
            <span>By {article.author}</span>
            <span>•</span>
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>

          <div className="mt-8">
            {article.content.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    );
  } catch {
    notFound();
  }
}

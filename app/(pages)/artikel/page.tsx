import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/meta";
import { getPosts, stripHtmlAndTruncate } from "@/lib/wpgraphql";
import type { WPPost } from "@/lib/wpgraphql";
import PageHero from "@/components/page-hero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: siteConfig.pages.article.title,
  description: siteConfig.pages.article.subtitle,
});

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function PostCard({ post }: { post: WPPost }) {
  const excerpt = stripHtmlAndTruncate(post.excerpt, 120);

  return (
    <Link
      href={`/artikel/${post.slug}`}
      className="group surface flex flex-col overflow-hidden transition-shadow hover:shadow-md"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full bg-slate-100">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-200 text-slate-400">
            <svg
              className="h-12 w-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.author?.node?.name && (
            <>
              <span>•</span>
              <span>{post.author.node.name}</span>
            </>
          )}
        </div>

        <h2 className="text-lg font-semibold text-slate-900 group-hover:text-brand-primary transition-colors">
          {post.title}
        </h2>

        {excerpt && (
          <p className="text-sm text-slate-600 line-clamp-2">{excerpt}</p>
        )}

        <span className="mt-auto pt-2 text-sm font-medium text-brand-primary group-hover:underline">
          Baca selengkapnya →
        </span>
      </div>
    </Link>
  );
}

export default async function ArtikelPage() {
  const posts = await getPosts(10);

  return (
    <div className="space-y-12 md:space-y-16">
      <PageHero
        eyebrow="Artikel"
        title={siteConfig.pages.article.title}
        subtitle={siteConfig.pages.article.subtitle}
      />

      <section className="section-shell">
        {posts.length === 0 ? (
          <div className="surface p-12 text-center">
            <p className="text-slate-600">Belum ada artikel yang dipublikasikan.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}


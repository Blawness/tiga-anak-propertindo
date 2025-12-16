import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getPostBySlug, stripHtmlAndTruncate } from "@/lib/wpgraphql";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: "Artikel Tidak Ditemukan",
        };
    }

    const description = stripHtmlAndTruncate(post.excerpt, 160);

    return {
        title: post.title,
        description,
        openGraph: {
            title: post.title,
            description,
            type: "article",
            publishedTime: post.date,
            authors: post.author?.node?.name ? [post.author.node.name] : undefined,
            images: post.featuredImage
                ? [
                    {
                        url: post.featuredImage.node.sourceUrl,
                        alt: post.featuredImage.node.altText || post.title,
                    },
                ]
                : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description,
            images: post.featuredImage
                ? [post.featuredImage.node.sourceUrl]
                : undefined,
        },
    };
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default async function ArtikelDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="section-shell py-12 md:py-16">
            {/* Back link */}
            <Link
                href="/artikel"
                className="mb-8 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-brand-primary transition-colors"
            >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Kembali ke Artikel
            </Link>

            {/* Header */}
            <header className="mb-8 space-y-4">
                <h1 className="text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
                    {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    {post.author?.node?.name && (
                        <>
                            <span>•</span>
                            <span>Oleh {post.author.node.name}</span>
                        </>
                    )}
                </div>
            </header>

            {/* Featured Image */}
            {post.featuredImage && (
                <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-2xl bg-slate-100">
                    <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.featuredImage.node.altText || post.title}
                        fill
                        sizes="(max-width: 1200px) 100vw, 1200px"
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            {/* Content */}
            <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Footer */}
            <footer className="mt-12 border-t border-slate-200 pt-8">
                <Link
                    href="/artikel"
                    className="inline-flex items-center gap-2 text-brand-primary font-medium hover:underline"
                >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Lihat semua artikel
                </Link>
            </footer>
        </article>
    );
}

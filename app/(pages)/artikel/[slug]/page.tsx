import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getPostBySlug, stripHtmlAndTruncate } from "@/lib/wpgraphql";
import { sanitizeWordPressContent } from "@/lib/sanitize-wp-content";
import { SplitText } from "@/components/motion";

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
    const canonicalUrl = `https://tapropertindo.com/artikel/${slug}`;

    // Rewrite WordPress image URL to frontend domain for SEO
    const getOgImageUrl = () => {
        if (!post.featuredImage) return undefined;
        // Replace WordPress domain with frontend domain (needs image proxy or Next.js handled)
        return post.featuredImage.node.sourceUrl.replace(
            /https?:\/\/[^\/]*hostingersite\.com/,
            'https://tapropertindo.com'
        );
    };
    const ogImageUrl = getOgImageUrl();

    return {
        title: post.title,
        description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: post.title,
            description,
            url: canonicalUrl,
            type: "article",
            publishedTime: post.date,
            authors: post.author?.node?.name ? [post.author.node.name] : undefined,
            images: ogImageUrl
                ? [
                    {
                        url: ogImageUrl,
                        alt: post.featuredImage?.node.altText || post.title,
                    },
                ]
                : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description,
            images: ogImageUrl ? [ogImageUrl] : undefined,
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
        <article>
            <header className="bg-ink pb-[clamp(8rem,18vw,14rem)] pt-36 text-paper md:pt-44">
                <div className="section-shell">
                    <Link
                        href="/artikel"
                        className="eyebrow group inline-flex items-center gap-3 text-paper/60 transition-colors duration-500 ease-luxe hover:text-paper"
                    >
                        <span
                            aria-hidden
                            className="transition-transform duration-500 ease-luxe group-hover:-translate-x-1"
                        >
                            ←
                        </span>
                        Kembali ke artikel
                    </Link>

                    <SplitText
                        as="h1"
                        text={post.title}
                        trigger="mount"
                        delay={0.15}
                        stagger={0.04}
                        className="mt-10 max-w-[22ch] text-h1"
                    />

                    <p className="eyebrow mt-10 flex flex-wrap items-center gap-3 text-bronze">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        {post.author?.node?.name ? (
                            <>
                                <span aria-hidden className="h-px w-4 bg-current" />
                                <span>Oleh {post.author.node.name}</span>
                            </>
                        ) : null}
                    </p>
                </div>
            </header>

            <div className="section-shell">
                {post.featuredImage ? (
                    <div className="relative -mt-[clamp(6rem,14vw,11rem)] aspect-[16/9] w-full overflow-hidden bg-bone">
                        <Image
                            src={post.featuredImage.node.sourceUrl}
                            alt={post.featuredImage.node.altText || post.title}
                            fill
                            sizes="(max-width: 1440px) 100vw, 1344px"
                            className="object-cover"
                            priority
                        />
                    </div>
                ) : null}

                <div
                    className="article-content mx-auto max-w-[68ch] py-20 md:py-28"
                    dangerouslySetInnerHTML={{ __html: sanitizeWordPressContent(post.content) }}
                />

                <footer className="mx-auto max-w-[68ch] border-t border-line pb-28 pt-10">
                    <Link href="/artikel" className="eyebrow group inline-flex items-center gap-3">
                        <span
                            aria-hidden
                            className="transition-transform duration-500 ease-luxe group-hover:-translate-x-1"
                        >
                            ←
                        </span>
                        <span className="link-underline">Lihat semua artikel</span>
                    </Link>
                </footer>
            </div>
        </article>
    );
}

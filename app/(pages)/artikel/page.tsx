import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/meta";
import { getPosts, stripHtmlAndTruncate } from "@/lib/wpgraphql";
import type { WPPost } from "@/lib/wpgraphql";
import PageHero from "@/components/page-hero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

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

function PostMeta({ post }: { post: WPPost }) {
  return (
    <p className="eyebrow flex flex-wrap items-center gap-3 text-stone">
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      {post.author?.node?.name ? (
        <>
          <span aria-hidden className="h-px w-4 bg-current" />
          <span>{post.author.node.name}</span>
        </>
      ) : null}
    </p>
  );
}

function PostImage({ post, sizes, className }: { post: WPPost; sizes: string; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden bg-bone", className)}>
      {post.featuredImage ? (
        <Image
          src={post.featuredImage.node.sourceUrl}
          alt={post.featuredImage.node.altText || post.title}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-105"
        />
      ) : (
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center font-display text-6xl italic text-stone/40"
        >
          TAP
        </span>
      )}
    </div>
  );
}

function FeaturedPost({ post }: { post: WPPost }) {
  const excerpt = stripHtmlAndTruncate(post.excerpt, 220);
  return (
    <Reveal>
      <Link
        href={`/artikel/${post.slug}`}
        className="group grid gap-10 border-b border-line pb-16 md:grid-cols-12 md:items-end md:gap-8 md:pb-24"
      >
        <PostImage
          post={post}
          sizes="(max-width: 768px) 100vw, 58vw"
          className="aspect-[4/3] md:col-span-7"
        />
        <div className="flex flex-col gap-6 md:col-span-5">
          <PostMeta post={post} />
          <h2 className="text-h2 transition-colors duration-700 ease-luxe group-hover:text-accent">
            {post.title}
          </h2>
          {excerpt ? <p className="text-ink/65">{excerpt}</p> : null}
          <span className="eyebrow inline-flex items-center gap-3">
            <span className="link-underline">Baca artikel</span>
            <span
              aria-hidden
              className="transition-transform duration-500 ease-luxe group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

function PostCard({ post }: { post: WPPost }) {
  const excerpt = stripHtmlAndTruncate(post.excerpt, 120);
  return (
    <Link href={`/artikel/${post.slug}`} className="group flex flex-col gap-6">
      <PostImage
        post={post}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="aspect-[4/3]"
      />
      <div className="flex flex-col gap-3">
        <PostMeta post={post} />
        <h3 className="text-h3 transition-colors duration-700 ease-luxe group-hover:text-accent">
          {post.title}
        </h3>
        {excerpt ? <p className="line-clamp-2 text-ink/65">{excerpt}</p> : null}
      </div>
    </Link>
  );
}

export default async function ArtikelPage() {
  const posts = await getPosts(10);
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="Artikel"
        title={siteConfig.pages.article.title}
        subtitle={siteConfig.pages.article.subtitle}
        image={siteConfig.images.planning}
        imageAlt="Fasad rumah putih bergaris tegas di antara pepohonan"
      />

      <section className="section-y bg-paper">
        <div className="section-shell">
          {!featured ? (
            <p className="text-h3 text-ink/60">Belum ada artikel yang dipublikasikan.</p>
          ) : (
            <>
              <FeaturedPost post={featured} />
              {rest.length > 0 ? (
                <RevealGroup className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 md:mt-24 lg:grid-cols-3">
                  {rest.map((post) => (
                    <RevealItem key={post.id} as="article">
                      <PostCard post={post} />
                    </RevealItem>
                  ))}
                </RevealGroup>
              ) : null}
            </>
          )}
        </div>
      </section>
    </>
  );
}

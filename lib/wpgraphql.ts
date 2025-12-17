/**
 * WordPress GraphQL Data Layer
 *
 * Native fetch wrapper for WPGraphQL with Server Component caching.
 * No external dependencies - uses native fetch with Next.js revalidation.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface WPAuthor {
  node: {
    name: string;
  };
}

export interface WPFeaturedImage {
  node: {
    sourceUrl: string;
    altText: string;
  };
}

export interface WPPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  content: string;
  excerpt: string;
  author: WPAuthor;
  featuredImage: WPFeaturedImage | null;
}

export interface WPPostsResponse {
  posts: {
    nodes: WPPost[];
  };
}

export interface WPPostBySlugResponse {
  postBy: WPPost | null;
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Configuration
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get the WordPress GraphQL endpoint from environment.
 * Throws if not configured.
 */
function getWpEndpoint(): string {
  const endpoint = process.env.WP_GRAPHQL_ENDPOINT;

  if (!endpoint) {
    throw new Error(
      "Missing WP_GRAPHQL_ENDPOINT environment variable. " +
      "Please add it to your .env.local file: " +
      "WP_GRAPHQL_ENDPOINT=https://your-wordpress-site.com/graphql"
    );
  }

  return endpoint;
}

// ─────────────────────────────────────────────────────────────────────────────
// GraphQL Fetch
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Execute a GraphQL query against the WordPress backend.
 *
 * Uses native fetch with Next.js revalidation for caching.
 * Throws on network errors or GraphQL errors.
 *
 * @param query - GraphQL query string
 * @param variables - Optional query variables
 * @returns Typed response data
 */
export async function wpFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const endpoint = getWpEndpoint();

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!response.ok) {
    throw new Error(
      `WordPress GraphQL request failed: ${response.status} ${response.statusText}`
    );
  }

  const json: GraphQLResponse<T> = await response.json();

  if (json.errors && json.errors.length > 0) {
    const messages = json.errors.map((e) => e.message).join("; ");
    throw new Error(`WordPress GraphQL errors: ${messages}`);
  }

  if (!json.data) {
    throw new Error("WordPress GraphQL response missing data");
  }

  return json.data;
}

/**
 * Execute an authenticated GraphQL mutation against WordPress.
 *
 * Uses JWT Bearer token for authentication. No caching.
 * Throws on network errors or GraphQL errors.
 *
 * @param query - GraphQL mutation string
 * @param variables - Optional mutation variables
 * @returns Typed response data
 */
export async function wpGqlWrite<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const endpoint = getWpEndpoint();
  const token = process.env.WP_JWT_TOKEN;

  if (!token) {
    throw new Error(
      "Missing WP_JWT_TOKEN environment variable. " +
      "Please add it to your .env file for authenticated mutations."
    );
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token.trim()}`,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store", // Never cache mutations
  });

  if (!response.ok) {
    throw new Error(
      `WordPress GraphQL mutation failed: ${response.status} ${response.statusText}`
    );
  }

  const json: GraphQLResponse<T> = await response.json();

  if (json.errors && json.errors.length > 0) {
    const messages = json.errors.map((e) => e.message).join("; ");
    throw new Error(`WordPress GraphQL mutation errors: ${messages}`);
  }

  if (!json.data) {
    throw new Error("WordPress GraphQL mutation response missing data");
  }

  return json.data;
}

// ─────────────────────────────────────────────────────────────────────────────
// Queries
// ─────────────────────────────────────────────────────────────────────────────

const POSTS_QUERY = `
  query GetPosts($first: Int!) {
    posts(first: $first) {
      nodes {
        id
        title
        slug
        date
        excerpt
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

const POST_BY_SLUG_QUERY = `
  query GetPostBySlug($slug: String!) {
    postBy(slug: $slug) {
      id
      title
      slug
      date
      content
      excerpt
      author {
        node {
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Data Fetchers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetch a list of blog posts.
 * @param count - Number of posts to fetch (default: 10)
 */
export async function getPosts(count = 10): Promise<WPPost[]> {
  const data = await wpFetch<WPPostsResponse>(POSTS_QUERY, { first: count });
  return data.posts.nodes;
}

/**
 * Fetch a single post by slug.
 * @param slug - Post slug
 * @returns Post or null if not found
 */
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const data = await wpFetch<WPPostBySlugResponse>(POST_BY_SLUG_QUERY, {
    slug,
  });
  return data.postBy;
}

// ─────────────────────────────────────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Strip HTML tags and truncate text.
 * Useful for generating meta descriptions from excerpts.
 */
export function stripHtmlAndTruncate(html: string, maxLength = 160): string {
  const text = html.replace(/<[^>]*>/g, "").trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3).trim() + "...";
}

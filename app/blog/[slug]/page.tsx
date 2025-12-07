import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getBlogPost, getBlogSlugs } from "../../lib/blogs";
import styles from "./page.module.css";

type BlogPageParams = { slug: string };

function formatDate(dateString?: string) {
    if (!dateString) {
        return null;
    }

    const parsedDate = new Date(dateString);

    if (Number.isNaN(parsedDate.getTime())) {
        return dateString;
    }

    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(parsedDate);
}

export async function generateStaticParams() {
    const slugs = await getBlogSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<BlogPageParams> | BlogPageParams;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        return {
            title: "Blog post not found | ShopifyOrNot",
        };
    }

    const { frontmatter } = post;
    const description =
        frontmatter.description ??
        "ShopifyOrNot blog post with tips, stories, and Shopify detection benchmarks.";

    return {
        title: `${frontmatter.title} | ShopifyOrNot Blog`,
        description,
        keywords: frontmatter.keywords,
        alternates: {
            canonical: `/blog/${slug}`,
        },
        openGraph: {
            title: frontmatter.title,
            description,
            type: "article",
            url: `https://shopifyornot.in/blog/${slug}`,
        },
        twitter: {
            card: "summary_large_image",
            title: frontmatter.title,
            description,
        },
    };
}

export default async function BlogPage({
    params,
}: {
    params: Promise<BlogPageParams> | BlogPageParams;
}) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        notFound();
    }

    const { frontmatter, content } = post;
    const formattedDate = formatDate(frontmatter.date);

    return (
        <section className={styles.blogPage}>
            <header className={styles.header}>
                <p className={styles.kicker}>ShopifyOrNot Blog</p>
                <h1 className={styles.title}>{frontmatter.title}</h1>
                {frontmatter.description && (
                    <p className={styles.description}>{frontmatter.description}</p>
                )}
                <div className={styles.metaRow}>
                    {frontmatter.author && <span className={styles.metaItem}>{frontmatter.author}</span>}
                    {formattedDate && <span className={styles.metaItem}>{formattedDate}</span>}
                    {frontmatter.readingTime && (
                        <span className={styles.metaItem}>{frontmatter.readingTime}</span>
                    )}
                </div>
                {frontmatter.keywords?.length ? (
                    <div className={styles.tags} aria-label="Keywords">
                        {frontmatter.keywords.map((keyword) => (
                            <span key={keyword} className={styles.tag}>
                                {keyword}
                            </span>
                        ))}
                    </div>
                ) : null}
            </header>

            <article className={styles.article}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </article>
        </section>
    );
}

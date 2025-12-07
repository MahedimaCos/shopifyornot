import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogFrontmatter = {
    title: string;
    description?: string;
    date?: string;
    author?: string;
    readingTime?: string;
    keywords?: string[];
};

export type BlogPost = {
    slug: string;
    frontmatter: BlogFrontmatter;
    content: string;
};

const blogsDirectory = path.join(process.cwd(), "app", "blogs");

export async function getBlogSlugs(): Promise<string[]> {
    const entries = await fs.promises.readdir(blogsDirectory);

    return entries
        .filter((file) => file.endsWith(".md"))
        .map((file) => file.replace(/\.md$/, ""));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    const markdownPath = path.join(blogsDirectory, `${slug}.md`);

    try {
        const rawMarkdown = await fs.promises.readFile(markdownPath, "utf8");
        const { data, content } = matter(rawMarkdown);

        const frontmatter: BlogFrontmatter = {
            title: data.title ?? slug,
            description: data.description,
            date: data.date,
            author: data.author,
            readingTime: data.readingTime,
            keywords: Array.isArray(data.keywords) ? data.keywords : undefined,
        };

        return {
            slug,
            frontmatter,
            content,
        };
    } catch {
        return null;
    }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
    const slugs = await getBlogSlugs();
    const posts = await Promise.all(slugs.map((slug) => getBlogPost(slug)));
    return posts
        .filter((post): post is BlogPost => Boolean(post))
        .sort((a, b) => {
            const dateA = a.frontmatter.date ? new Date(a.frontmatter.date).getTime() : 0;
            const dateB = b.frontmatter.date ? new Date(b.frontmatter.date).getTime() : 0;
            return dateB - dateA;
        });
}

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

function stripLeadingHeading(markdown: string) {
    const lines = markdown.split(/\r?\n/);
    if (lines.length === 0) {
        return markdown;
    }

    // Find the first non-empty line
    const firstNonEmptyIndex = lines.findIndex((line) => line.trim() !== "");
    if (firstNonEmptyIndex === -1) {
        return markdown;
    }

    const firstLine = lines[firstNonEmptyIndex].trim();
    if (!firstLine.startsWith("#")) {
        return markdown;
    }

    // Skip the heading and any following subtitle/meta lines (bold, italic, or empty)
    let startIndex = firstNonEmptyIndex + 1;
    while (startIndex < lines.length) {
        const line = lines[startIndex].trim();
        // Stop if we hit actual content (not empty, not bold-only subtitle, not italic-only date)
        if (line !== "" && !line.match(/^\*\*[^*]+\*\*$/) && !line.match(/^_[^_]+_$/)) {
            break;
        }
        startIndex++;
    }

    return lines.slice(startIndex).join("\n").trimStart();
}

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
            content: stripLeadingHeading(content),
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

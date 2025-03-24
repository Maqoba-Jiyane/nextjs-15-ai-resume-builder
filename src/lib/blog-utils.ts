import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  category: string;
  readTime: number;
};

export function getAllBlogPosts(): BlogPost[] {
  const postsDirectory = path.join(process.cwd(), 'content/posts');
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      content,
      date: new Date(data.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      image: data.image,
      category: data.category,
      readTime: Math.ceil(content.split(' ').length / 200), // 200 wpm reading speed
    };
  });

  // Sort posts by date (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
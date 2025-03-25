import Link from "next/link";
import Image from "next/image";

const posts = [
  {
    slug: "How-to-Write-a-Resume-That-Stands-Out",
    title: "How to Write a Resume That Stands Out",
    excerpt: "Learn professional resume writing techniques...",
    date: "2025-03-23",
    image:
      "https://images.unsplash.com/photo-1562564055-71e051d33c19?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Job Search",
    readTime: 6,
  },
  {
    slug: "top-5-skills-employers-look-for",
    title: "Top 5 Skills Employers Look For",
    excerpt:
      "Discover the essential skills that catch hiring managers' attention and how to showcase them on your resume.",
    date: "2025-03-24",
    image:
      "https://images.unsplash.com/photo-1576267423429-569309b31e84?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Career Advice",
    readTime: 5,
    author: "Jane Smith",
  },
  {
    slug: "common-resume-mistakes-to-avoid",
    title: "Common Resume Mistakes to Avoid",
    excerpt:
      "Avoid these resume mistakes that could be silently hurting your chances of getting interviews—and learn how to fix them fast.",
    date: "2025-03-25",
    image:
      "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Q29tbW9uJTIwUmVzdW1lJTIwTWlzdGFrZXMlMjB0byUyMEF2b2lkfGVufDB8fDB8fHwy",
    category: "Career Advice",
    readTime: 4,
    author: "Jane Smith",
  },
];

export default function BlogLanding() {
  const featuredPost = posts[0]; // First post is featured
  const otherPosts = posts.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Career Insights Blog
        </h1>
        <p className="text-xl max-w-2xl mx-auto">
          Expert advice to help you land your dream job and grow your career
        </p>
      </section>

      {/* Featured Post */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-6">Featured Post</h2>
        <div className="rounded-xl shadow-md overflow-hidden">
          <Link href={`/blog/${featuredPost.slug}`}>
            <div className="md:flex">
              <div className="md:w-1/2 h-64 md:h-auto relative">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:w-1/2">
                <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold">
                  {featuredPost.category}
                </div>
                <h3 className="mt-2 text-2xl font-semibold">
                  {featuredPost.title}
                </h3>
                <p className="mt-3 text-gray-600">{featuredPost.excerpt}</p>
                <div className="mt-4 flex items-center">
                  <div className="text-sm text-gray-500">
                    {featuredPost.date} · {featuredPost.readTime} min read
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* All Posts Grid */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <div className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-indigo-600">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {post.readTime} min read
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm">{post.excerpt}</p>
                  <div className="mt-4 text-xs text-gray-500">{post.date}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter CTA (Optional) */}
      {/* <section className="mt-20 bg-gray-50 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-semibold mb-2">Get Career Tips Directly</h3>
        <p className="text-gray-600 mb-6 max-w-lg mx-auto">
          Join our newsletter to receive the latest job search strategies and career advice
        </p>
        <div className="max-w-md mx-auto flex">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-grow px-4 py-2 rounded-l-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-r-lg hover:bg-indigo-700 transition">
            Subscribe
          </button>
        </div>
      </section> */}
    </div>
  );
}

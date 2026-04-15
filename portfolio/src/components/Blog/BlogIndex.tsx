import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Calendar, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

// Types & Data Fetching
const blogModules = import.meta.glob('/blog/*.md', { query: '?raw', import: 'default', eager: true });

interface Frontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  coverImage?: string;
  readTime?: string;
  featured?: boolean;
}

interface BlogPost {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
}

function parseFrontmatter(content: string): { frontmatter: Frontmatter; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: { title: '', description: '', date: '', tags: [] }, content };
  }
  
  const [, frontmatterStr, restContent] = match;
  const frontmatter: Partial<Record<keyof Frontmatter, string | string[] | boolean | undefined>> = {};
  
  frontmatterStr.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      const value = valueParts.join(':').trim();
      if (value.startsWith('[') && value.endsWith(']')) {
        frontmatter[key.trim() as keyof Frontmatter] = value.slice(1, -1).split(',').map(s => s.trim().replace(/['"]/g, ''));
      } else if (value === 'true') {
        frontmatter[key.trim() as keyof Frontmatter] = true;
      } else if (value === 'false') {
        frontmatter[key.trim() as keyof Frontmatter] = false;
      } else {
        frontmatter[key.trim() as keyof Frontmatter] = value.replace(/['"]/g, '');
      }
    }
  });
  
  return {
    frontmatter: frontmatter as Frontmatter,
    content: restContent.trim()
  };
}

function getAllPosts(): BlogPost[] {
  return Object.entries(blogModules).map(([path, content]) => {
    const slug = path.replace('/blog/', '').replace('.md', '');
    const { frontmatter, content: postContent } = parseFrontmatter(content as string);
    return { slug, frontmatter, content: postContent };
  }).sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Components

const BlogCard = ({ post, onClick, index }: { post: BlogPost; onClick: () => void; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    onClick={onClick}
    className="group asym-rounded border-2 border-primary p-8 md:p-10 flex flex-col justify-between min-h-[450px] bg-surface hover:bg-primary hover:text-background transition-all duration-700 cursor-pointer overflow-hidden relative"
  >
    <div className="space-y-10">
      <div className="flex justify-between items-start">
        <div className="text-[10px] font-black tracking-[0.4em] uppercase opacity-40 italic">
          {formatDate(post.frontmatter.date)}
        </div>
        <ArrowUpRight size={32} className="opacity-0 group-hover:opacity-100 transition-all text-accent" />
      </div>

      <div className="space-y-6">
        <h3 className="text-4xl md:text-5xl font-black leading-none tracking-tighter uppercase group-hover:text-accent transition-colors">
          {post.frontmatter.title}
        </h3>
        <p className="text-xl font-medium opacity-60 line-clamp-3 leading-relaxed text-text-muted">
          {post.frontmatter.description}
        </p>
      </div>
    </div>

    <div className="space-y-6 pt-10 border-t border-text-main/10 group-hover:border-accent/30">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {post.frontmatter.tags?.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] font-black tracking-[0.2em] uppercase opacity-60">
              {tag}
            </span>
          ))}
        </div>
    </div>
  </motion.article>
);

const BlogPostView = ({ post, onBack }: { post: BlogPost; onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post.slug]);
  
  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-40 pb-20 px-6 md:px-12 bg-background"
    >
      <div className="max-w-[1400px] mx-auto">
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-4 mb-20 text-[10px] font-black tracking-[0.4em] uppercase opacity-60 hover:opacity-100 transition-all text-text-main"
        >
          <ArrowLeft size={16} />
          <span>BACK TO BLOG</span>
        </button>

        <header className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24">
          <div className="lg:col-span-12">
             <h1 className="text-7xl md:text-[8vw] font-black leading-none tracking-tighter uppercase whitespace-pre-line mb-10 text-text-main">
               {post.frontmatter.title}
             </h1>
             <p className="text-2xl md:text-3xl font-medium opacity-60 max-w-4xl italic leading-relaxed text-text-muted">
               {post.frontmatter.description}
             </p>
          </div>

          <div className="lg:col-span-12 flex flex-wrap gap-12 text-[10px] font-black tracking-[0.4em] uppercase opacity-40 text-text-main">
             <div className="flex items-center gap-3">
               <Calendar size={14} className="text-accent" />
               {formatDate(post.frontmatter.date)}
             </div>
             {post.frontmatter.readTime && (
               <div className="flex items-center gap-3">
                 <Clock size={14} className="text-accent" />
                 {post.frontmatter.readTime}
               </div>
             )}
          </div>
        </header>

        {post.frontmatter.coverImage && (
          <div className="asym-rounded overflow-hidden border-2 border-primary shadow-2xl mb-24 aspect-[21/9]">
            <img
              src={post.frontmatter.coverImage}
              alt={post.frontmatter.title}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8 lg:col-start-3">
             <div className="prose prose-2xl prose-zinc dark:prose-invert max-w-none text-text-main
               prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-text-main
               prose-p:text-2xl prose-p:font-medium prose-p:opacity-80 prose-p:leading-relaxed prose-p:text-text-main
               prose-a:text-accent prose-a:no-underline hover:prose-a:underline
               prose-blockquote:border-l-8 prose-blockquote:border-accent prose-blockquote:bg-accent/5 prose-blockquote:p-10 prose-blockquote:rounded-r-3xl
               prose-img:asym-rounded prose-img:border-2 prose-img:border-primary
               prose-code:text-accent prose-code:bg-accent/10 prose-code:px-2 prose-code:py-1 prose-code:rounded
               prose-pre:bg-surface prose-pre:p-8 prose-pre:asym-rounded prose-pre:border-2 prose-pre:border-text-main/10
             ">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeSanitize]}
                  components={{
                    img: ({ src, alt }) => {
                      const imgPath = src?.startsWith('./images/') ? src.replace('./images/', '/blog/images/') : src;
                      return <img src={imgPath} alt={alt} className="w-full" loading="lazy" />;
                    },
                    code: ({ className, children, ...props }) => {
                      const match = /language-(\w+)/.exec(className || '');
                      const isInline = !match;
                      if (isInline) return <code className="text-accent font-black" {...props}>{children}</code>;
                      return (
                        <div className="relative my-10">
                           <pre className="overflow-x-auto">
                             <code className={className} {...props}>{children}</code>
                           </pre>
                        </div>
                      );
                    }
                  }}
                >
                  {post.content}
                </ReactMarkdown>
             </div>
          </div>
        </div>

        <footer className="mt-32 pt-20 border-t border-text-main/10 flex flex-col items-center text-center space-y-10">
             <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center text-background font-black text-3xl">S</div>
             <div className="space-y-2">
                <p className="text-[10px] font-black tracking-[0.4em] uppercase opacity-40 text-text-main">AUTHOR</p>
                <h4 className="text-4xl font-black tracking-tighter uppercase text-text-main">Sidharth P L</h4>
             </div>
             <button
              onClick={onBack}
              className="px-12 py-5 bg-text-main text-background asym-rounded font-black uppercase tracking-[0.2em] text-sm hover:scale-105 transition-all mt-10"
            >
              Back to Blog
            </button>
        </footer>
      </div>
    </motion.article>
  );
};

const BlogIndex = () => {
  const [hash, setHash] = useState(window.location.hash);
  
  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  const selectedPostSlug = hash.startsWith('#blog/') ? hash.replace('#blog/', '') : null;
  const posts = getAllPosts();
  const currentPost = selectedPostSlug ? posts.find(p => p.slug === selectedPostSlug) : null;

  const handleSelectPost = (slug: string) => {
    window.location.assign(`#blog/${slug}`);
  };

  const handleBack = () => {
    window.location.assign('#blog');
  };

  if (currentPost) {
    return (
      <AnimatePresence mode="wait">
        <BlogPostView key={currentPost.slug} post={currentPost} onBack={handleBack} />
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-40 pb-20 px-6 md:px-12 overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <p className="text-[13px] font-black tracking-[0.4em] text-accent uppercase">
              THOUGHTS & IDEAS
            </p>
            <h1 className="text-7xl md:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase text-text-main">
              JOURNAL
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-md"
          >
            <p className="text-xl md:text-2xl font-medium text-text-muted italic leading-relaxed">
              "Exploring the intersection of artificial intelligence, digital design, and future infrastructure."
            </p>
          </motion.div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post, i) => (
            <BlogCard
              key={post.slug}
              post={post}
              onClick={() => handleSelectPost(post.slug)}
              index={i}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default BlogIndex;

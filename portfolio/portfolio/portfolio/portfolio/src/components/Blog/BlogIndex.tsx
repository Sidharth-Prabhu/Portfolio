import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, ArrowRight, PenLine, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

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

const FloatingOrbs = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-[float_20s_ease-in-out_infinite]" />
    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-[float_25s_ease-in-out_infinite_reverse]" />
    <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-[float_30s_ease-in-out_infinite]" />
  </div>
);

const GridPattern = () => (
  <div className="fixed inset-0 pointer-events-none -z-20 opacity-[0.03] dark:opacity-[0.02]">
    <div className="absolute inset-0" style={{
      backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                       linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
      backgroundSize: '64px 64px'
    }} />
  </div>
);

const BlogPost = ({ post, onBack }: { post: BlogPost; onBack: () => void }) => {
  const articleRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    articleRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [post.slug]);
  
  return (
    <motion.article
      ref={articleRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="group inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Blog</span>
        </motion.button>
        
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-2 mb-6">
            {post.frontmatter.tags?.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 text-primary dark:from-primary/20 dark:to-purple-500/20 border border-primary/20 dark:border-primary/30"
              >
                {tag}
              </motion.span>
            ))}
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tight">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text">
              {post.frontmatter.title}
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl leading-relaxed">
            {post.frontmatter.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold">
                S
              </div>
              <span className="font-medium">Sidharth</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
              <Calendar size={16} />
              <span>{formatDate(post.frontmatter.date)}</span>
            </div>
            {post.frontmatter.readTime && (
              <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                <Clock size={16} />
                <span>{post.frontmatter.readTime}</span>
              </div>
            )}
          </div>
        </motion.header>
        
        {post.frontmatter.coverImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className="relative mb-12 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="aspect-[21/9] bg-gradient-to-br from-primary/20 via-purple-500/10 to-primary/20" />
            <img
              src={post.frontmatter.coverImage}
              alt={post.frontmatter.title}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose prose-lg lg:prose-xl dark:prose-invert max-w-none
            prose-headings:scroll-mt-20
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-800
            prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
            prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium
            prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
            prose-code:text-sm prose-code:font-mono prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:before:content-none prose-code:after:content-none
            prose-pre:rounded-2xl prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 prose-pre:border prose-pre:border-gray-800 prose-pre:shadow-xl
            prose-img:rounded-2xl prose-img:shadow-xl prose-img:my-10
            prose-ul:my-6 prose-ol:my-6 prose-li:my-2
            prose-li:text-gray-600 dark:prose-li:text-gray-400
            prose-blockquote:border-l-4 prose-blockquote:border-primary dark:prose-blockquote:border-dark-primary prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:not-italic prose-blockquote:text-xl prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400
            prose-table:text-sm
            prose-th:bg-gray-50 dark:prose-th:bg-gray-900
            prose-hr:border-gray-200 dark:prose-hr:border-gray-800"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={{
              img: ({ src, alt }) => {
                if (src?.startsWith('./images/')) {
                  const imgPath = src.replace('./images/', '/blog/images/');
                  return <img src={imgPath} alt={alt} className="rounded-2xl shadow-xl my-10" loading="lazy" />;
                }
                return <img src={src} alt={alt} className="rounded-2xl shadow-xl my-10" loading="lazy" />;
              },
              code: ({ className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '');
                const isInline = !match;
                if (isInline) {
                  return <code className={className} {...props}>{children}</code>;
                }
                return (
                  <code className={`${className} block`} {...props}>
                    {children}
                  </code>
                );
              },
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </motion.div>
        
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                S
              </div>
              <div>
                <p className="font-semibold">Written by Sidharth</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Developer & Creator</p>
              </div>
            </div>
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
            >
              Read More Articles
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.footer>
      </div>
    </motion.article>
  );
};

const FeaturedPost = ({ post, onClick, index }: { post: BlogPost; onClick: () => void; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.15 }}
    onClick={onClick}
    className="group relative overflow-hidden rounded-3xl cursor-pointer bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-primary/30 transition-all duration-500"
  >
    <div className="aspect-[16/10] relative overflow-hidden">
      {post.frontmatter.coverImage ? (
        <img
          src={post.frontmatter.coverImage}
          alt={post.frontmatter.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-primary/20" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/20">
          Featured
        </span>
      </div>
    </div>
    
    <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
      <div className="flex flex-wrap gap-2 mb-4">
        {post.frontmatter.tags?.slice(0, 3).map(tag => (
          <span key={tag} className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/20">
            {tag}
          </span>
        ))}
      </div>
      
      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:translate-x-2 transition-transform duration-300">
        {post.frontmatter.title}
      </h3>
      
      <p className="text-white/70 line-clamp-2 mb-4 text-sm lg:text-base">
        {post.frontmatter.description}
      </p>
      
      <div className="flex items-center gap-4 text-sm text-white/60">
        <span className="flex items-center gap-1.5">
          <Calendar size={14} />
          {formatDate(post.frontmatter.date)}
        </span>
        {post.frontmatter.readTime && (
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {post.frontmatter.readTime}
          </span>
        )}
      </div>
    </div>
  </motion.article>
);

const BlogCard = ({ post, onClick, index }: { post: BlogPost; onClick: () => void; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08 }}
    onClick={onClick}
    className="group relative overflow-hidden rounded-2xl cursor-pointer bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
  >
    <div className="aspect-[16/9] relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800/50 dark:to-gray-900/50">
      {post.frontmatter.coverImage ? (
        <img
          src={post.frontmatter.coverImage}
          alt={post.frontmatter.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-600" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    
    <div className="p-5 lg:p-6">
      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
        <span className="flex items-center gap-1">
          <Calendar size={12} />
          {formatDate(post.frontmatter.date)}
        </span>
        {post.frontmatter.readTime && (
          <>
            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.frontmatter.readTime}
            </span>
          </>
        )}
      </div>
      
      <h3 className="text-lg lg:text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
        {post.frontmatter.title}
      </h3>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
        {post.frontmatter.description}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {post.frontmatter.tags?.slice(0, 2).map(tag => (
            <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary dark:bg-primary/20">
              {tag}
            </span>
          ))}
        </div>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          Read <ArrowRight size={14} />
        </span>
      </div>
    </div>
  </motion.article>
);

const BlogList = ({ onSelectPost }: { onSelectPost: (slug: string) => void }) => {
  const posts = getAllPosts();
  const featuredPosts = posts.filter(p => p.frontmatter.featured);
  const regularPosts = posts.filter(p => !p.frontmatter.featured);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <PenLine size={16} />
            <span>My Blog</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text">
              Thoughts & Ideas
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Exploring web development, AI, and the craft of building digital products.
          </p>
        </motion.header>
        
        {featuredPosts.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full" />
              <h2 className="text-2xl font-bold">Featured Stories</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map((post, i) => (
                <FeaturedPost
                  key={post.slug}
                  post={post}
                  onClick={() => onSelectPost(post.slug)}
                  index={i}
                />
              ))}
            </div>
          </section>
        )}
        
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-1 bg-gradient-to-r from-gray-400 to-gray-600 dark:from-gray-600 dark:to-gray-400 rounded-full" />
            <h2 className="text-2xl font-bold">All Articles</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
              {posts.length} posts
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post, i) => (
              <BlogCard
                key={post.slug}
                post={post}
                onClick={() => onSelectPost(post.slug)}
                index={i}
              />
            ))}
            {featuredPosts.length === 0 && posts.slice(0, 3).map((post, i) => (
              <BlogCard
                key={post.slug}
                post={post}
                onClick={() => onSelectPost(post.slug)}
                index={i}
              />
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

const BlogIndex = () => {
  const [hash, setHash] = useState(window.location.hash);
  
  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  const selectedPost = hash.startsWith('#blog/') ? hash.replace('#blog/', '') : null;
  const posts = getAllPosts();
  const currentPost = selectedPost ? posts.find(p => p.slug === selectedPost) : null;

  const handleSelectPost = (slug: string) => {
    window.location.hash = `blog/${slug}`;
  };

  const handleBack = () => {
    window.location.hash = 'blog';
  };

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background relative overflow-x-hidden">
      <FloatingOrbs />
      <GridPattern />
      
      <AnimatePresence mode="wait">
        {currentPost ? (
          <BlogPost key={currentPost.slug} post={currentPost} onBack={handleBack} />
        ) : (
          <BlogList key="list" onSelectPost={handleSelectPost} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogIndex;

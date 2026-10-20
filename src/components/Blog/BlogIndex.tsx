import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Clock,
  Plus,
  Edit2,
  Trash2,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import BlogAuthModal from './BlogAuthModal';
import BlogEditor from './BlogEditor';
import type { BlogPost, Frontmatter } from '../../services/blogApi';
import {
  fetchBackendPosts,
  deleteBackendPost,
  checkBackendHealth,
  getStoredPin,
  getCachedPosts,
} from '../../services/blogApi';

// Local markdown glob
const blogModules = import.meta.glob('/blog/*.md', { query: '?raw', import: 'default', eager: true });

function stripRedundantTitle(body: string, title: string): string {
  let cleaned = body.trim();
  const h1Regex = /^#\s+(.+?)(\r?\n|$)/;
  const match = cleaned.match(h1Regex);
  if (match) {
    const headingText = match[1].trim().toLowerCase();
    const titleText = title.trim().toLowerCase();
    if (headingText === titleText || headingText.includes(titleText) || titleText.includes(headingText)) {
      cleaned = cleaned.replace(h1Regex, '').trim();
    }
  }
  return cleaned;
}

function parseFrontmatter(content: string): { frontmatter: Frontmatter; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: { title: '', description: '', date: '', tags: [] }, content };
  }

  const [, frontmatterStr, restContent] = match;
  const frontmatter: Partial<Record<keyof Frontmatter, string | string[] | boolean | undefined>> = {};

  frontmatterStr.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      const value = valueParts.join(':').trim();
      if (value.startsWith('[') && value.endsWith(']')) {
        frontmatter[key.trim() as keyof Frontmatter] = value
          .slice(1, -1)
          .split(',')
          .map((s) => s.trim().replace(/['"]/g, ''));
      } else if (value === 'true') {
        frontmatter[key.trim() as keyof Frontmatter] = true;
      } else if (value === 'false') {
        frontmatter[key.trim() as keyof Frontmatter] = false;
      } else {
        const cleanedVal = value.replace(/['"]/g, '').trim();
        frontmatter[key.trim() as keyof Frontmatter] = cleanedVal || undefined;
      }
    }
  });

  const parsedFrontmatter = frontmatter as Frontmatter;
  const cleanedContent = stripRedundantTitle(restContent, parsedFrontmatter.title || '');

  return {
    frontmatter: parsedFrontmatter,
    content: cleanedContent,
  };
}

function getLocalStaticPosts(): BlogPost[] {
  return Object.entries(blogModules)
    .map(([path, content]) => {
      const slug = path.replace('/blog/', '').replace('.md', '');
      const { frontmatter, content: postContent } = parseFrontmatter(content as string);
      return { slug, frontmatter, content: postContent, isFromBackend: false };
    })
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr || 'Recent';
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Post Card Component
const BlogCard = ({
  post,
  onClick,
  index,
  isAuthenticated,
  onEdit,
  onDelete,
}: {
  post: BlogPost;
  onClick: () => void;
  index: number;
  isAuthenticated: boolean;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}) => (
  <motion.article
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08 }}
    onClick={onClick}
    className="group asym-rounded border-2 border-primary/30 p-7 md:p-8 flex flex-col justify-between min-h-[380px] bg-surface hover:border-accent hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden relative"
  >
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase opacity-50 text-accent">
          {formatDate(post.frontmatter.date)}
        </span>

        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                title="Edit post"
                onClick={onEdit}
                className="p-1.5 rounded-lg bg-text-main/5 hover:bg-accent/20 hover:text-accent transition-colors"
              >
                <Edit2 size={14} />
              </button>
              <button
                type="button"
                title="Delete post from Pi"
                onClick={onDelete}
                className="p-1.5 rounded-lg bg-text-main/5 hover:bg-red-500/20 hover:text-red-500 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          )}
          <ArrowUpRight size={22} className="opacity-0 group-hover:opacity-100 transition-all text-accent" />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-2xl md:text-3xl font-black leading-tight tracking-tight uppercase group-hover:text-accent transition-colors">
          {post.frontmatter.title}
        </h3>
        <p className="text-sm md:text-base font-normal opacity-70 line-clamp-3 leading-relaxed text-text-muted">
          {post.frontmatter.description}
        </p>
      </div>
    </div>

    <div className="space-y-4 pt-6 border-t border-text-main/10 group-hover:border-accent/20">
      <div className="flex flex-wrap gap-2">
        {post.frontmatter.tags?.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-mono font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-text-main/5 text-text-muted border border-text-main/10"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.article>
);

// Full Blog Post View Component
const BlogPostView = ({
  post,
  onBack,
  onEdit,
  isAuthenticated,
}: {
  post: BlogPost;
  onBack: () => void;
  onEdit?: () => void;
  isAuthenticated: boolean;
}) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setImageError(false);
  }, [post.slug]);

  const rawCover = post.frontmatter.coverImage?.trim();
  const resolvedCover = rawCover
    ? rawCover.startsWith('./images/')
      ? rawCover.replace('./images/', '/blog/images/')
      : rawCover
    : null;
  const hasCoverImage = Boolean(resolvedCover) && !imageError;

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20 px-6 md:px-12 bg-background"
    >
      <div className="max-w-[1000px] mx-auto">
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-3 text-xs font-mono font-bold tracking-[0.25em] uppercase opacity-70 hover:opacity-100 hover:text-accent transition-all text-text-main"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO BLOG</span>
          </button>

          {isAuthenticated && onEdit && (
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-black font-mono font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-sm"
            >
              <Edit2 size={13} />
              <span>Edit Post</span>
            </button>
          )}
        </div>

        <header className="space-y-6 mb-12 pb-10 border-b border-text-main/10">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-6 text-[11px] font-mono font-semibold tracking-wider uppercase text-text-muted">
              <div className="flex items-center gap-2">
                <Calendar size={13} className="text-accent" />
                <span>{formatDate(post.frontmatter.date)}</span>
              </div>
              {post.frontmatter.readTime && (
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-accent" />
                  <span>{post.frontmatter.readTime}</span>
                </div>
              )}
              {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="opacity-30">•</span>
                  <div className="flex flex-wrap gap-1.5">
                    {post.frontmatter.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-accent/10 text-accent font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight uppercase text-text-main">
              {post.frontmatter.title}
            </h1>

            {post.frontmatter.description && (
              <p className="text-base sm:text-lg md:text-xl font-normal opacity-80 leading-relaxed text-text-muted">
                {post.frontmatter.description}
              </p>
            )}
          </div>
        </header>

        {hasCoverImage && resolvedCover && (
          <div className="asym-rounded overflow-hidden border-2 border-text-main/10 shadow-xl mb-14 aspect-[21/9]">
            <img
              src={resolvedCover}
              alt={post.frontmatter.title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        )}

        <div className="w-full">
          <div className="prose prose-lg md:prose-xl prose-zinc dark:prose-invert max-w-none text-text-main
            prose-headings:font-black prose-headings:tracking-tight prose-headings:text-text-main
            prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-base md:prose-p:text-lg prose-p:font-normal prose-p:leading-relaxed prose-p:opacity-85
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-accent/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:text-base md:prose-blockquote:text-lg
            prose-img:asym-rounded prose-img:border prose-img:border-text-main/10
            prose-code:text-accent prose-code:bg-accent/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
            prose-pre:bg-surface prose-pre:p-6 prose-pre:rounded-xl prose-pre:border prose-pre:border-text-main/10
            prose-table:text-sm prose-th:font-mono prose-td:font-mono
          ">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
              components={{
                h1: ({ children, ...props }) => {
                  const text = String(children || '').trim().toLowerCase();
                  const title = (post.frontmatter.title || '').trim().toLowerCase();
                  if (text && title && (text === title || text.includes(title) || title.includes(text))) {
                    return null;
                  }
                  return <h1 {...props}>{children}</h1>;
                },
                img: ({ src, alt }) => {
                  const imgPath = src?.startsWith('./images/') ? src.replace('./images/', '/blog/images/') : src;
                  return (
                    <img
                      src={imgPath}
                      alt={alt}
                      className="w-full"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                    />
                  );
                },
                code: ({ className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || '');
                  const isInline = !match;
                  if (isInline) return <code className="text-accent font-semibold font-mono" {...props}>{children}</code>;
                  return (
                    <div className="relative my-6">
                      <pre className="overflow-x-auto">
                        <code className={className} {...props}>{children}</code>
                      </pre>
                    </div>
                  );
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>

        <footer className="mt-20 pt-12 border-t border-text-main/10 flex flex-col items-center text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-white font-black text-xl">S</div>
          <div className="space-y-1">
            <p className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase opacity-50 text-text-main">AUTHOR</p>
            <h4 className="text-2xl font-black tracking-tight uppercase text-text-main">Sidharth P L</h4>
          </div>
          <button
            onClick={onBack}
            className="px-8 py-3 bg-text-main text-background asym-rounded font-mono font-bold uppercase tracking-wider text-xs hover:scale-105 transition-all mt-4"
          >
            Back to Blog
          </button>
        </footer>
      </div>
    </motion.article>
  );
};

// Main Blog Component
export const BlogIndex = () => {
  const [hash, setHash] = useState(window.location.hash);
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const local = getLocalStaticPosts();
    const cached = getCachedPosts();
    if (cached.length > 0) {
      const cachedSlugs = new Set(cached.map((p) => p.slug));
      const filteredLocal = local.filter((p) => !cachedSlugs.has(p.slug));
      return [...cached, ...filteredLocal].sort(
        (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
      );
    }
    return local;
  });
  const [backendStatus, setBackendStatus] = useState<{
    checked: boolean;
    online: boolean;
    postCount?: number;
  }>({
    checked: false,
    online: false,
  });

  // Auth state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authPin, setAuthPin] = useState<string>(() => getStoredPin() || '');
  const [pendingAction, setPendingAction] = useState<'create' | { type: 'edit'; slug: string } | null>(null);

  // Sync hash changes
  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Fetch posts from Raspberry Pi backend and merge with static posts
  const loadPosts = useCallback(async () => {
    const local = getLocalStaticPosts();
    const cached = getCachedPosts();
    try {
      const health = await checkBackendHealth();
      setBackendStatus({
        checked: true,
        online: health.online,
        postCount: health.postCount,
      });

      if (health.online) {
        const remotePosts = await fetchBackendPosts();
        const remoteSlugs = new Set(remotePosts.map((p) => p.slug));
        const filteredLocal = local.filter((p) => !remoteSlugs.has(p.slug));
        const combined = [...remotePosts, ...filteredLocal].sort(
          (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
        );
        setPosts(combined);
      } else if (cached.length > 0) {
        const cachedSlugs = new Set(cached.map((p) => p.slug));
        const filteredLocal = local.filter((p) => !cachedSlugs.has(p.slug));
        setPosts([...cached, ...filteredLocal]);
      } else {
        setPosts(local);
      }
    } catch (e) {
      console.warn('Backend load failed, using cached/local posts:', e);
      if (cached.length > 0) {
        const cachedSlugs = new Set(cached.map((p) => p.slug));
        const filteredLocal = local.filter((p) => !cachedSlugs.has(p.slug));
        setPosts([...cached, ...filteredLocal]);
      } else {
        setPosts(local);
      }
      setBackendStatus({ checked: true, online: false });
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  // Route parser
  const isCreateRoute = hash === '#blog/new';
  const isEditRoute = hash.startsWith('#blog/edit/');
  const editSlug = isEditRoute ? hash.replace('#blog/edit/', '') : null;
  const isPostView = hash.startsWith('#blog/') && !isCreateRoute && !isEditRoute;
  const viewSlug = isPostView ? hash.replace('#blog/', '') : null;

  const currentViewPost = viewSlug ? posts.find((p) => p.slug === viewSlug) : null;
  const currentEditPost = editSlug ? posts.find((p) => p.slug === editSlug) : null;

  const handleSelectPost = (slug: string) => {
    window.location.assign(`#blog/${slug}`);
  };

  const handleBack = () => {
    window.location.assign('#blog');
  };

  const handleStartCreate = () => {
    if (authPin && /^\d{6}$/.test(authPin)) {
      window.location.assign('#blog/new');
    } else {
      setPendingAction('create');
      setIsAuthModalOpen(true);
    }
  };

  const handleStartEdit = (slug: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (authPin && /^\d{6}$/.test(authPin)) {
      window.location.assign(`#blog/edit/${slug}`);
    } else {
      setPendingAction({ type: 'edit', slug });
      setIsAuthModalOpen(true);
    }
  };

  const handleDeletePost = async (slug: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const confirmed = window.confirm(
      `Are you sure you want to delete post "${slug}" from your Raspberry Pi SQLite database?`
    );
    if (!confirmed) return;

    if (!authPin) {
      setPendingAction({ type: 'edit', slug });
      setIsAuthModalOpen(true);
      return;
    }

    try {
      await deleteBackendPost(slug, authPin);
      await loadPosts();
    } catch (err: any) {
      alert(`Could not delete post: ${err.message || 'Check connection'}`);
    }
  };

  const handleAuthSuccess = (verifiedPin: string) => {
    setAuthPin(verifiedPin);
    if (pendingAction === 'create') {
      window.location.assign('#blog/new');
    } else if (pendingAction && typeof pendingAction === 'object' && pendingAction.type === 'edit') {
      window.location.assign(`#blog/edit/${pendingAction.slug}`);
    }
    setPendingAction(null);
  };

  // Route: Create New Post
  if (isCreateRoute) {
    return (
      <>
        <BlogEditor
          pin={authPin}
          onSaved={() => {
            loadPosts();
            window.location.assign('#blog');
          }}
          onCancel={handleBack}
          onRequestReauth={() => setIsAuthModalOpen(true)}
        />
        <BlogAuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      </>
    );
  }

  // Route: Edit Post
  if (isEditRoute) {
    return (
      <>
        <BlogEditor
          initialPost={currentEditPost}
          pin={authPin}
          onSaved={() => {
            loadPosts();
            window.location.assign(`#blog/${editSlug}`);
          }}
          onCancel={handleBack}
          onRequestReauth={() => setIsAuthModalOpen(true)}
        />
        <BlogAuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      </>
    );
  }

  // Route: View Single Post
  if (currentViewPost) {
    return (
      <>
        <AnimatePresence mode="wait">
          <BlogPostView
            key={currentViewPost.slug}
            post={currentViewPost}
            onBack={handleBack}
            onEdit={() => handleStartEdit(currentViewPost.slug)}
            isAuthenticated={Boolean(authPin && /^\d{6}$/.test(authPin))}
          />
        </AnimatePresence>
        <BlogAuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      </>
    );
  }

  // Route: Post Listing
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6 md:px-12 overflow-x-hidden">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="flex items-center gap-3">
              <p className="text-xs font-mono font-bold tracking-[0.3em] text-accent uppercase">
                THOUGHTS & IDEAS
              </p>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight uppercase text-text-main">
              JOURNAL
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <p className="text-sm md:text-base font-normal text-text-muted italic max-w-xs leading-relaxed hidden lg:block">
              "Exploring the intersection of artificial intelligence, digital design, and future infrastructure."
            </p>

            <button
              onClick={handleStartCreate}
              className="px-6 py-3.5 rounded-2xl bg-text-main text-background font-mono font-bold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-2 group"
            >
              <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300 text-accent" />
              <span>NEW POST</span>
            </button>
          </motion.div>
        </header>

        {/* Server Down Banner - Only shown when server is unreachable */}
        {backendStatus.checked && !backendStatus.online && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 px-5 py-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-between text-xs font-mono"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span className="font-semibold tracking-wide">
                Blog server is currently down.
              </span>
            </div>
            <button
              onClick={() => loadPosts()}
              className="underline text-[11px] hover:text-red-400 transition-colors"
            >
              Retry
            </button>
          </motion.div>
        )}

        {/* Post Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <BlogCard
              key={post.slug}
              post={post}
              onClick={() => handleSelectPost(post.slug)}
              index={i}
              isAuthenticated={Boolean(authPin && /^\d{6}$/.test(authPin))}
              onEdit={(e) => handleStartEdit(post.slug, e)}
              onDelete={(e) => handleDeletePost(post.slug, e)}
            />
          ))}
        </section>
      </div>

      {/* 6-Digit PIN Auth Modal */}
      <BlogAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default BlogIndex;

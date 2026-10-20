// Raspberry Pi Blog Engine API Client (Primary endpoint: https://blogserver.sidharthprabhu.co.in)

export interface Frontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  coverImage?: string;
  readTime?: string;
  featured?: boolean;
}

export interface BlogPost {
  id?: number;
  slug: string;
  frontmatter: Frontmatter;
  content: string;
  isFromBackend?: boolean;
}

const STORAGE_API_KEY = 'rpi_blog_api_url';
const STORAGE_PIN_KEY = 'blog_auth_pin';
const CACHE_POSTS_KEY = 'cached_rpi_blog_posts';

// Primary production endpoint for Raspberry Pi backend via Cloudflare tunnel
export const DEFAULT_API_URL =
  import.meta.env.VITE_BLOG_API_URL || 'https://blogserver.sidharthprabhu.co.in';

export function getApiBaseUrl(): string {
  try {
    const custom = localStorage.getItem(STORAGE_API_KEY);
    // If user previously had localhost stored, migrate to production domain
    if (custom && !custom.includes('localhost') && !custom.includes('127.0.0.1')) {
      return custom;
    }
    return DEFAULT_API_URL;
  } catch {
    return DEFAULT_API_URL;
  }
}

export function setApiBaseUrl(url: string) {
  try {
    const clean = url.trim().replace(/\/+$/, '');
    localStorage.setItem(STORAGE_API_KEY, clean);
  } catch (e) {
    console.error('Could not save API URL:', e);
  }
}

export function getStoredPin(): string | null {
  try {
    return sessionStorage.getItem(STORAGE_PIN_KEY);
  } catch {
    return null;
  }
}

export function setStoredPin(pin: string) {
  try {
    sessionStorage.setItem(STORAGE_PIN_KEY, pin);
  } catch (e) {
    console.error('Could not store PIN:', e);
  }
}

export function clearStoredPin() {
  try {
    sessionStorage.removeItem(STORAGE_PIN_KEY);
  } catch (e) {
    console.error('Could not clear PIN:', e);
  }
}

// Local cache helpers to guarantee instant page renders and zero downtime
export function getCachedPosts(): BlogPost[] {
  try {
    const data = localStorage.getItem(CACHE_POSTS_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.warn('Failed to parse cached posts:', e);
  }
  return [];
}

export function setCachedPosts(posts: BlogPost[]) {
  try {
    localStorage.setItem(CACHE_POSTS_KEY, JSON.stringify(posts));
  } catch (e) {
    console.warn('Failed to write cached posts:', e);
  }
}

/** Check if Raspberry Pi backend is online and reachable */
export async function checkBackendHealth(): Promise<{ online: boolean; postCount?: number; detail?: string }> {
  const base = getApiBaseUrl();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(`${base}/api/health`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      return { online: true, postCount: data.post_count };
    }
    return { online: false, detail: `HTTP ${res.status}` };
  } catch (err: any) {
    return { online: false, detail: err.message || 'Connection failed' };
  }
}

/** Verify 6-digit security key */
export async function verifyPin(pin: string): Promise<boolean> {
  const base = getApiBaseUrl();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(`${base}/api/auth/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      setStoredPin(pin);
      return true;
    }
    return false;
  } catch (err) {
    console.warn('Backend unreachable during PIN verify; verifying format:', err);
    if (/^\d{6}$/.test(pin)) {
      setStoredPin(pin);
      return true;
    }
    return false;
  }
}

/** Fetch posts from the Raspberry Pi SQLite backend with local cache resilience */
export async function fetchBackendPosts(): Promise<BlogPost[]> {
  const base = getApiBaseUrl();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  const res = await fetch(`${base}/api/posts`, {
    signal: controller.signal,
    headers: { Accept: 'application/json' },
  });
  clearTimeout(timeoutId);

  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.statusText}`);
  }

  const rawPosts: any[] = await res.json();
  const formatted: BlogPost[] = rawPosts.map((p) => {
    let cover = p.cover_image || p.coverImage;
    if (cover && cover.startsWith('/uploads/')) {
      cover = `${base}${cover}`;
    }
    return {
      id: p.id,
      slug: p.slug,
      frontmatter: {
        title: p.title,
        description: p.description || '',
        date: p.date,
        tags: p.tags || [],
        coverImage: cover,
        readTime: p.read_time,
        featured: Boolean(p.featured),
      },
      content: p.content,
      isFromBackend: true,
    };
  });

  // Update offline/instant cache
  if (formatted.length > 0) {
    setCachedPosts(formatted);
  }

  return formatted;
}

/** Create a new post in the Raspberry Pi SQLite database */
export async function createBackendPost(
  post: {
    title: string;
    description: string;
    content: string;
    slug?: string;
    date?: string;
    tags?: string[];
    cover_image?: string;
    read_time?: string;
    featured?: boolean;
  },
  pin: string
): Promise<BlogPost> {
  const base = getApiBaseUrl();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  const res = await fetch(`${base}/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Security-Key': pin,
    },
    body: JSON.stringify(post),
    signal: controller.signal,
  });
  clearTimeout(timeoutId);

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.detail || `Create failed with status ${res.status}`);
  }

  const p = await res.json();
  let cover = p.cover_image || p.coverImage;
  if (cover && cover.startsWith('/uploads/')) {
    cover = `${base}${cover}`;
  }

  const createdPost: BlogPost = {
    id: p.id,
    slug: p.slug,
    frontmatter: {
      title: p.title,
      description: p.description || '',
      date: p.date,
      tags: p.tags || [],
      coverImage: cover,
      readTime: p.read_time,
      featured: Boolean(p.featured),
    },
    content: p.content,
    isFromBackend: true,
  };

  // Prepend to local cache so it appears immediately
  const cached = getCachedPosts().filter((item) => item.slug !== createdPost.slug);
  setCachedPosts([createdPost, ...cached]);

  return createdPost;
}

/** Update an existing post */
export async function updateBackendPost(
  slug: string,
  post: Partial<{
    title: string;
    description: string;
    content: string;
    date: string;
    tags: string[];
    cover_image: string;
    read_time: string;
    featured: boolean;
  }>,
  pin: string
): Promise<BlogPost> {
  const base = getApiBaseUrl();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  const res = await fetch(`${base}/api/posts/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Security-Key': pin,
    },
    body: JSON.stringify(post),
    signal: controller.signal,
  });
  clearTimeout(timeoutId);

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.detail || `Update failed with status ${res.status}`);
  }

  const p = await res.json();
  let cover = p.cover_image;
  if (cover && cover.startsWith('/uploads/')) {
    cover = `${base}${cover}`;
  }

  const updatedPost: BlogPost = {
    id: p.id,
    slug: p.slug,
    frontmatter: {
      title: p.title,
      description: p.description || '',
      date: p.date,
      tags: p.tags || [],
      coverImage: cover,
      readTime: p.read_time,
      featured: Boolean(p.featured),
    },
    content: p.content,
    isFromBackend: true,
  };

  // Update in local cache
  const cached = getCachedPosts().map((item) => (item.slug === slug ? updatedPost : item));
  setCachedPosts(cached);

  return updatedPost;
}

/** Delete a post from Raspberry Pi SQLite database */
export async function deleteBackendPost(slug: string, pin: string): Promise<boolean> {
  const base = getApiBaseUrl();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  const res = await fetch(`${base}/api/posts/${slug}`, {
    method: 'DELETE',
    headers: {
      'X-Security-Key': pin,
    },
    signal: controller.signal,
  });
  clearTimeout(timeoutId);

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.detail || `Delete failed with status ${res.status}`);
  }

  // Remove from local cache
  const cached = getCachedPosts().filter((item) => item.slug !== slug);
  setCachedPosts(cached);

  return true;
}

/** Upload image to Raspberry Pi upload directory */
export async function uploadImageToPi(file: File, pin: string): Promise<string> {
  const base = getApiBaseUrl();
  const formData = new FormData();
  formData.append('file', file);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  const res = await fetch(`${base}/api/upload`, {
    method: 'POST',
    headers: {
      'X-Security-Key': pin,
    },
    body: formData,
    signal: controller.signal,
  });
  clearTimeout(timeoutId);

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.detail || `Upload failed with status ${res.status}`);
  }

  const data = await res.json();
  return `${base}${data.url}`;
}

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Save,
  Eye,
  Columns2,
  Edit3,
  Heading1,
  Heading2,
  Heading3,
  Bold,
  Italic,
  Strikethrough,
  Code,
  FileCode,
  Quote,
  List,
  ListOrdered,
  CheckSquare,
  Table as TableIcon,
  Minus,
  Link as LinkIcon,
  Image as ImageIcon,
  Upload,
  Sparkles,
  Info,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  Clock,
  Tag,
  Calendar,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import type { BlogPost } from '../../services/blogApi';
import { createBackendPost, updateBackendPost, uploadImageToPi, getStoredPin } from '../../services/blogApi';

interface BlogEditorProps {
  initialPost?: BlogPost | null;
  pin: string;
  onSaved: (savedPost: BlogPost) => void;
  onCancel: () => void;
  onRequestReauth: () => void;
}

export const BlogEditor: React.FC<BlogEditorProps> = ({
  initialPost,
  pin,
  onSaved,
  onCancel,
  onRequestReauth,
}) => {
  const isEditing = Boolean(initialPost && initialPost.slug);

  const [title, setTitle] = useState(initialPost?.frontmatter.title || '');
  const [slug, setSlug] = useState(initialPost?.slug || '');
  const [description, setDescription] = useState(initialPost?.frontmatter.description || '');
  const [tagsStr, setTagsStr] = useState(initialPost?.frontmatter.tags?.join(', ') || '');
  const [coverImage, setCoverImage] = useState(initialPost?.frontmatter.coverImage || '');
  const [readTime, setReadTime] = useState(initialPost?.frontmatter.readTime || '5 min read');
  const [featured, setFeatured] = useState(initialPost?.frontmatter.featured || false);
  const [content, setContent] = useState(
    initialPost?.content ||
      `## Overview\n\nWrite your thoughts here. You can use **rich markdown** and embed live images directly from your Raspberry Pi.\n\n> [!NOTE]\n> This blog post will be stored safely in your SQLite database on your Raspberry Pi!\n\n### System Highlights\n- High performance SQLite with WAL mode\n- Fast API engine\n- Offline-resilient portfolio\n`
  );

  const [viewMode, setViewMode] = useState<'editor' | 'split' | 'preview'>('split');
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgressMsg, setUploadProgressMsg] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverFileInputRef = useRef<HTMLInputElement>(null);

  // Auto-slugify when title changes in creation mode
  useEffect(() => {
    if (!isEditing && title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      setSlug(generatedSlug);
    }
  }, [title, isEditing]);

  // Estimate read time based on word count
  useEffect(() => {
    const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
    const estMinutes = Math.max(1, Math.ceil(wordCount / 180));
    setReadTime(`${estMinutes} min read`);
  }, [content]);

  // Insert or wrap text in textarea at cursor
  const insertFormatting = (before: string, after: string = '', defaultText: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = textarea.value;
    const selectedText = currentText.substring(start, end) || defaultText;

    const replacement = `${before}${selectedText}${after}`;
    const nextContent = currentText.substring(0, start) + replacement + currentText.substring(end);

    setContent(nextContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const handleInsertTable = () => {
    const tableTemplate = `\n| Metric | Baseline | Target |\n| :--- | :--- | :--- |\n| Latency | 45ms | < 10ms |\n| Memory | 256MB | 64MB |\n| Throughput | 1.2k req/s | 5k req/s |\n\n`;
    insertFormatting('', '', tableTemplate);
  };

  const handleInsertCallout = (type: 'NOTE' | 'TIP' | 'IMPORTANT' | 'WARNING') => {
    const calloutTemplate = `\n> [!${type}]\n> **${type}**: Add your key insight or note here.\n\n`;
    insertFormatting('', '', calloutTemplate);
  };

  // Direct image upload to Raspberry Pi
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isCover: boolean = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setUploadProgressMsg(`Uploading ${file.name} to Raspberry Pi...`);
    setErrorMessage(null);

    try {
      const activePin = pin || getStoredPin() || '';
      const uploadedUrl = await uploadImageToPi(file, activePin);

      if (isCover) {
        setCoverImage(uploadedUrl);
        setUploadProgressMsg('Cover image uploaded!');
      } else {
        insertFormatting(`\n![${file.name}](${uploadedUrl})\n`);
        setUploadProgressMsg('Image embedded into markdown!');
      }

      setTimeout(() => setUploadProgressMsg(null), 3000);
    } catch (err: any) {
      console.error('Image upload failed:', err);
      if (err.message && err.message.includes('401')) {
        setErrorMessage('Authentication expired. Please re-enter your 6-digit key.');
        onRequestReauth();
      } else {
        setErrorMessage(`Image upload failed: ${err.message || 'Check server connection'}`);
      }
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Keyboard shortcuts
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      insertFormatting('**', '**', 'bold text');
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'i') {
      e.preventDefault();
      insertFormatting('*', '*', 'italic text');
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      insertFormatting('[', '](https://example.com)', 'link text');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      insertFormatting('  ');
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setErrorMessage('Post title is required.');
      return;
    }
    if (!slug.trim()) {
      setErrorMessage('Slug is required.');
      return;
    }
    if (!content.trim()) {
      setErrorMessage('Post content cannot be empty.');
      return;
    }

    setSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const activePin = pin || getStoredPin() || '';
    const tagsArray = tagsStr
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      if (isEditing && initialPost?.slug) {
        const updated = await updateBackendPost(
          initialPost.slug,
          {
            title: title.trim(),
            description: description.trim(),
            content: content.trim(),
            tags: tagsArray,
            cover_image: coverImage.trim() || undefined,
            read_time: readTime,
            featured,
          },
          activePin
        );
        setSuccessMessage('Post updated successfully!');
        setTimeout(() => onSaved(updated), 900);
      } else {
        const created = await createBackendPost(
          {
            title: title.trim(),
            slug: slug.trim(),
            description: description.trim(),
            content: content.trim(),
            tags: tagsArray,
            cover_image: coverImage.trim() || undefined,
            read_time: readTime,
            featured,
          },
          activePin
        );
        setSuccessMessage('New post published successfully!');
        setTimeout(() => onSaved(created), 900);
      }
    } catch (err: any) {
      console.error('Save failed:', err);
      if (err.message && (err.message.includes('401') || err.message.includes('PIN') || err.message.includes('Key'))) {
        setErrorMessage('Invalid or expired security key. Please re-enter your 6-digit key.');
        onRequestReauth();
      } else {
        setErrorMessage(`Save failed: ${err.message || 'Could not connect to blog server'}`);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-main pt-28 pb-20 px-4 md:px-10">
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Top bar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-text-main/10">
          <div className="flex items-center gap-4">
            <button
              onClick={onCancel}
              className="p-2.5 rounded-xl border border-text-main/20 hover:bg-text-main/5 text-text-main transition-colors flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
            <div>
              <p className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-accent">
                {isEditing ? 'UPDATE POST' : 'TRANSMISSION'}
              </p>
              <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-text-main">
                {isEditing ? 'Edit Blog Post' : 'Create New Post'}
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Switcher */}
            <div className="flex items-center p-1 bg-surface border border-text-main/15 rounded-xl text-xs font-mono">
              <button
                onClick={() => setViewMode('editor')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'editor'
                    ? 'bg-text-main text-background font-bold shadow-sm'
                    : 'text-text-muted hover:text-text-main'
                }`}
              >
                <Edit3 size={13} />
                <span className="hidden sm:inline">Editor</span>
              </button>
              <button
                onClick={() => setViewMode('split')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'split'
                    ? 'bg-text-main text-background font-bold shadow-sm'
                    : 'text-text-muted hover:text-text-main'
                }`}
              >
                <Columns2 size={13} />
                <span className="hidden sm:inline">Split</span>
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'preview'
                    ? 'bg-text-main text-background font-bold shadow-sm'
                    : 'text-text-muted hover:text-text-main'
                }`}
              >
                <Eye size={13} />
                <span className="hidden sm:inline">Preview</span>
              </button>
            </div>

            {/* Action buttons */}
            <button
              onClick={handleSave}
              disabled={saving || uploadingImage}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent text-black font-mono font-bold text-xs uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all shadow-md disabled:opacity-50"
            >
              <Save size={15} />
              <span>{saving ? 'Publishing...' : isEditing ? 'Save Changes' : 'Publish Post'}</span>
            </button>
          </div>
        </header>

        {/* Feedback banners */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4 bg-red-500/10 border-2 border-red-500/30 rounded-2xl text-red-500 text-xs font-mono"
          >
            <AlertCircle size={18} className="shrink-0" />
            <span className="flex-1">{errorMessage}</span>
            <button onClick={() => setErrorMessage(null)} className="underline ml-2">
              Dismiss
            </button>
          </motion.div>
        )}

        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4 bg-green-500/10 border-2 border-green-500/30 rounded-2xl text-green-500 text-xs font-mono"
          >
            <CheckCircle2 size={18} className="shrink-0" />
            <span>{successMessage}</span>
          </motion.div>
        )}

        {uploadProgressMsg && (
          <div className="flex items-center gap-2 p-3 bg-accent/15 border border-accent/30 rounded-xl text-accent text-xs font-mono">
            <Sparkles size={14} className="animate-spin" />
            <span>{uploadProgressMsg}</span>
          </div>
        )}

        {/* Post Metadata Card */}
        <section className="bg-surface border-2 border-text-main/10 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent">
              Post Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. BUILDING A HOME LAB WITH RASPBERRY PI & FASTAPI"
              className="w-full text-2xl md:text-3xl font-black uppercase tracking-tight bg-background border-2 border-text-main/15 rounded-2xl p-4 text-text-main focus:border-accent focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Slug */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-muted">
                URL Slug *
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                placeholder="my-blog-post"
                className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-background border border-text-main/15 text-text-main focus:border-accent focus:outline-none"
              />
            </div>

            {/* Read Time */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-muted flex items-center gap-1">
                <Clock size={11} />
                <span>Read Time</span>
              </label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="5 min read"
                className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-background border border-text-main/15 text-text-main focus:border-accent focus:outline-none"
              />
            </div>

            {/* Tags */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-muted flex items-center gap-1">
                <Tag size={11} />
                <span>Tags (comma-separated)</span>
              </label>
              <input
                type="text"
                value={tagsStr}
                onChange={(e) => setTagsStr(e.target.value)}
                placeholder="Raspberry Pi, Python, SQLite"
                className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-background border border-text-main/15 text-text-main focus:border-accent focus:outline-none"
              />
            </div>

            {/* Featured toggle */}
            <div className="space-y-1.5 flex flex-col justify-end">
              <label className="flex items-center gap-2 text-xs font-mono font-bold uppercase cursor-pointer py-2">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-accent focus:ring-accent"
                />
                <span>Feature on Home Page</span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-muted">
              Short Description / Teaser (Displayed on Blog Cards)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of what this article covers..."
              className="w-full px-4 py-2.5 text-sm rounded-xl bg-background border border-text-main/15 text-text-main focus:border-accent focus:outline-none"
            />
          </div>

          {/* Cover Image */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-muted flex items-center gap-1">
              <ImageIcon size={11} />
              <span>Cover Image URL or File Upload</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://... or /blog/images/cover.jpg or upload below"
                className="flex-1 px-4 py-2 text-xs font-mono rounded-xl bg-background border border-text-main/15 text-text-main focus:border-accent focus:outline-none"
              />
              <button
                type="button"
                onClick={() => coverFileInputRef.current?.click()}
                disabled={uploadingImage}
                className="px-4 py-2 bg-text-main/10 hover:bg-text-main/20 text-text-main rounded-xl text-xs font-mono font-bold uppercase flex items-center gap-1.5 transition-colors"
              >
                <Upload size={13} />
                <span>Upload</span>
              </button>
              <input
                ref={coverFileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, true)}
              />
            </div>
            {coverImage && (
              <div className="mt-2 w-full max-w-xs h-24 rounded-xl overflow-hidden border border-text-main/10 bg-background/50">
                <img src={coverImage} alt="Cover preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </section>

        {/* Advanced Formatting Toolbar */}
        <section className="bg-surface border-2 border-text-main/10 rounded-2xl p-2.5 flex flex-wrap items-center gap-1 text-text-main shadow-sm sticky top-20 z-20 backdrop-blur-xl bg-surface/95">
          {/* Headings */}
          <button
            type="button"
            title="Heading 1"
            onClick={() => insertFormatting('# ', '', 'Heading 1')}
            className="p-2 hover:bg-text-main/10 rounded-lg text-text-muted hover:text-text-main transition-colors"
          >
            <Heading1 size={17} />
          </button>
          <button
            type="button"
            title="Heading 2"
            onClick={() => insertFormatting('## ', '', 'Heading 2')}
            className="p-2 hover:bg-text-main/10 rounded-lg text-text-muted hover:text-text-main transition-colors"
          >
            <Heading2 size={17} />
          </button>
          <button
            type="button"
            title="Heading 3"
            onClick={() => insertFormatting('### ', '', 'Heading 3')}
            className="p-2 hover:bg-text-main/10 rounded-lg text-text-muted hover:text-text-main transition-colors"
          >
            <Heading3 size={17} />
          </button>

          <div className="w-px h-6 bg-text-main/10 mx-1" />

          {/* Text Styling */}
          <button
            type="button"
            title="Bold (Ctrl+B)"
            onClick={() => insertFormatting('**', '**', 'bold text')}
            className="p-2 hover:bg-text-main/10 rounded-lg text-text-muted hover:text-text-main transition-colors"
          >
            <Bold size={17} />
          </button>
          <button
            type="button"
            title="Italic (Ctrl+I)"
            onClick={() => insertFormatting('*', '*', 'italic text')}
            className="p-2 hover:bg-text-main/10 rounded-lg text-text-muted hover:text-text-main transition-colors"
          >
            <Italic size={17} />
          </button>
          <button
            type="button"
            title="Strikethrough"
            onClick={() => insertFormatting('~~', '~~', 'strikethrough text')}
            className="p-2 hover:bg-text-main/10 rounded-lg text-text-muted hover:text-text-main transition-colors"
          >
            <Strikethrough size={17} />
          </button>

          <div className="w-px h-6 bg-text-main/10 mx-1" />

          {/* Code */}
          <button
            type="button"
            title="Inline Code"
            onClick={() => insertFormatting('`', '`', 'code')}
            className="p-2 hover:bg-text-main/10 rounded-lg text-text-muted hover:text-text-main transition-colors"
          >
            <Code size={17} />
          </button>
          <button
            type="button"
            title="Code Block"
            onClick={() => insertFormatting('```typescript\n', '\n```', '// code block')}
            className="p-2 hover:bg-text-main/10 rounded-lg text-text-muted hover:text-text-main transition-colors"
          >
            <FileCode size={17} />
          </button>

          <div className="w-px h-6 bg-text-main/10 mx-1" />

          {/* Quotes and Lists */}
          <button
            type="button"
            title="Blockquote"
            onClick={() => insertFormatting('> ', '', 'Quoted thought')}
            className="p-2 hover:bg-text-main/10 rounded-lg text-text-muted hover:text-text-main transition-colors"
          >
            <Quote size={17} />
          </button>
          <button
            type="button"
            title="Bullet List"
            onClick={() => insertFormatting('- ', '', 'List item')}
            className="p-2 hover:bg-text-main/10 rounded-lg text-text-muted hover:text-text-main transition-colors"
          >
            <List size={17} />
          </button>
          <button
            type="button"
            title="Numbered List"
            onClick={() => insertFormatting('1. ', '', 'First item')}
            className="p-2 hover:bg-text-main/10 rounded-lg text-text-muted hover:text-text-main transition-colors"
          >
            <ListOrdered size={17} />
          </button>
          <button
            type="button"
            title="Task List"
            onClick={() => insertFormatting('- [ ] ', '', 'Task to do')}
            className="p-2 hover:bg-text-main/10 rounded-lg text-text-muted hover:text-text-main transition-colors"
          >
            <CheckSquare size={17} />
          </button>

          <div className="w-px h-6 bg-text-main/10 mx-1" />

          {/* Table & Divider */}
          <button
            type="button"
            title="Insert Table"
            onClick={handleInsertTable}
            className="p-2 hover:bg-text-main/10 rounded-lg text-text-muted hover:text-text-main transition-colors flex items-center gap-1 font-mono text-xs"
          >
            <TableIcon size={17} />
            <span className="hidden xl:inline text-[10px]">Table</span>
          </button>
          <button
            type="button"
            title="Horizontal Divider"
            onClick={() => insertFormatting('\n---\n\n')}
            className="p-2 hover:bg-text-main/10 rounded-lg text-text-muted hover:text-text-main transition-colors"
          >
            <Minus size={17} />
          </button>

          <div className="w-px h-6 bg-text-main/10 mx-1" />

          {/* Callouts / Alerts */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              title="Callout: Note"
              onClick={() => handleInsertCallout('NOTE')}
              className="px-2 py-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 rounded-md text-[10px] font-mono font-bold flex items-center gap-1"
            >
              <Info size={12} />
              <span>Note</span>
            </button>
            <button
              type="button"
              title="Callout: Tip"
              onClick={() => handleInsertCallout('TIP')}
              className="px-2 py-1 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-md text-[10px] font-mono font-bold flex items-center gap-1"
            >
              <Lightbulb size={12} />
              <span>Tip</span>
            </button>
            <button
              type="button"
              title="Callout: Warning"
              onClick={() => handleInsertCallout('WARNING')}
              className="px-2 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 rounded-md text-[10px] font-mono font-bold flex items-center gap-1"
            >
              <AlertTriangle size={12} />
              <span>Warning</span>
            </button>
          </div>

          <div className="w-px h-6 bg-text-main/10 mx-1" />

          {/* Links and Direct Pi Image Upload */}
          <button
            type="button"
            title="Insert Link (Ctrl+K)"
            onClick={() => insertFormatting('[', '](https://example.com)', 'link description')}
            className="p-2 hover:bg-text-main/10 rounded-lg text-text-muted hover:text-text-main transition-colors"
          >
            <LinkIcon size={17} />
          </button>

          <button
            type="button"
            title="Upload image"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingImage}
            className="p-2 bg-accent/15 hover:bg-accent/25 text-accent rounded-lg transition-colors flex items-center gap-1.5 font-mono text-xs font-bold"
          >
            <Upload size={15} />
            <span className="text-[11px]">Upload Image</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileUpload(e, false)}
          />
        </section>

        {/* Main Work Area: Editor & Live Preview */}
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Textarea */}
          {(viewMode === 'editor' || viewMode === 'split') && (
            <div
              className={`space-y-2 ${
                viewMode === 'editor' ? 'lg:col-span-2' : 'lg:col-span-1'
              }`}
            >
              <div className="flex justify-between items-center px-1 text-xs font-mono text-text-muted">
                <span>MARKDOWN CONTENT</span>
                <span>
                  {content.length} chars • {content.trim().split(/\s+/).filter(Boolean).length} words
                </span>
              </div>
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={26}
                placeholder="Write your article in rich markdown..."
                className="w-full p-6 text-sm md:text-base font-mono rounded-3xl bg-surface border-2 border-text-main/15 text-text-main focus:border-accent focus:outline-none leading-relaxed resize-y shadow-inner"
              />
            </div>
          )}

          {/* Live Preview */}
          {(viewMode === 'preview' || viewMode === 'split') && (
            <div
              className={`space-y-2 ${
                viewMode === 'preview' ? 'lg:col-span-2' : 'lg:col-span-1'
              }`}
            >
              <div className="flex justify-between items-center px-1 text-xs font-mono text-text-muted">
                <span>LIVE PREVIEW</span>
                <span className="text-accent font-bold">PORTFOLIO STYLING</span>
              </div>

              <div className="p-6 md:p-8 rounded-3xl bg-surface border-2 border-text-main/15 min-h-[500px] max-h-[850px] overflow-y-auto">
                <header className="space-y-4 mb-8 pb-6 border-b border-text-main/10">
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-text-muted">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-accent" />
                      <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                    {readTime && (
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} className="text-accent" />
                        <span>{readTime}</span>
                      </div>
                    )}
                    {tagsStr && (
                      <div className="flex flex-wrap gap-1">
                        {tagsStr
                          .split(',')
                          .map((t) => t.trim())
                          .filter(Boolean)
                          .map((tag) => (
                            <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-accent/15 text-accent font-mono">
                              {tag}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>

                  <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-text-main">
                    {title || 'Untitled Post'}
                  </h1>

                  {description && (
                    <p className="text-sm md:text-base text-text-muted italic leading-relaxed">
                      {description}
                    </p>
                  )}
                </header>

                {coverImage && (
                  <div className="asym-rounded overflow-hidden border border-text-main/10 mb-8 max-h-72">
                    <img src={coverImage} alt="Cover preview" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="prose prose-zinc dark:prose-invert max-w-none text-text-main
                  prose-headings:font-black prose-headings:tracking-tight prose-headings:text-text-main
                  prose-h2:text-xl md:prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3
                  prose-h3:text-lg md:prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2
                  prose-p:text-sm md:prose-p:text-base prose-p:font-normal prose-p:leading-relaxed prose-p:opacity-85
                  prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                  prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-accent/5 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-xl
                  prose-img:rounded-2xl prose-img:border prose-img:border-text-main/10
                  prose-code:text-accent prose-code:bg-accent/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-mono
                  prose-pre:bg-background prose-pre:p-4 prose-pre:rounded-xl prose-pre:border prose-pre:border-text-main/10
                  prose-table:text-xs prose-th:font-mono prose-td:font-mono
                ">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                    components={{
                      code: ({ className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || '');
                        const isInline = !match;
                        if (isInline) {
                          return <code className="text-accent font-semibold font-mono" {...props}>{children}</code>;
                        }
                        return (
                          <div className="relative my-4">
                            <pre className="overflow-x-auto">
                              <code className={className} {...props}>{children}</code>
                            </pre>
                          </div>
                        );
                      },
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BlogEditor;

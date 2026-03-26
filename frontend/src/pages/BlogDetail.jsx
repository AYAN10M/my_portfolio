/**
 * BLOG DETAIL PAGE - Theme-adaptive glassmorphism.
 */

import { useParams, Link } from "react-router-dom";
import { useData } from "../context/index.jsx";
import { PageTransition, FadeIn, LazyImage } from "../components/UI.jsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function BlogDetail() {
  const { slug } = useParams();
  const { blogs } = useData();
  const post = blogs.find((b) => b.slug === slug);

  if (!post) {
    return (
      <div className="pt-32 text-center">
        <p className="text-5xl mb-4">📭</p>
        <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Post not found</h2>
        <Link to="/blog" className="btn-primary">Back to Blog</Link>
      </div>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <PageTransition>
      <div className="pt-24 pb-24">
        <div className="container-custom max-w-3xl">
          <FadeIn>
            <Link to="/blog"
              className="inline-flex items-center gap-2 text-sm transition-colors mb-10 group"
              style={{ color: "var(--text-muted)" }}
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              Back to Blog
            </Link>
          </FadeIn>

          <FadeIn>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (<span key={tag} className="tag">{tag}</span>))}
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="font-display text-4xl md:text-5xl font-black leading-tight mb-6" style={{ color: "var(--text-primary)" }}>
              {post.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex items-center gap-4 text-sm font-mono mb-8 pb-8"
              style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--glass-border)" }}
            >
              <span>{formattedDate}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="rounded-2xl overflow-hidden mb-12 h-64 md:h-80" style={{ border: "1px solid var(--glass-border)" }}>
              <LazyImage src={post.coverImage} alt={post.title} className="h-64 md:h-80 w-full" />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <article className="prose prose-lg max-w-none
              prose-headings:font-display prose-headings:font-bold
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline
              prose-code:font-mono prose-code:text-sm
              prose-pre:bg-transparent prose-pre:p-0">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return match ? (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        className="rounded-xl !text-sm"
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code
                        className="px-1.5 py-0.5 rounded text-sm font-mono"
                        style={{ background: "var(--code-bg)", color: "var(--text-primary)" }}
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                  h1: ({ children }) => (
                    <h1 className="font-display text-3xl font-black mt-10 mb-4" style={{ color: "var(--text-primary)" }}>{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="font-display text-2xl font-bold mt-8 mb-3" style={{ color: "var(--text-primary)" }}>{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="font-semibold text-xl mt-6 mb-2" style={{ color: "var(--text-primary)" }}>{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>{children}</p>
                  ),
                  li: ({ children }) => (
                    <li style={{ color: "var(--text-secondary)" }}>{children}</li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="pl-4 italic my-6"
                      style={{ borderLeft: "4px solid var(--accent)", color: "var(--text-secondary)" }}
                    >{children}</blockquote>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </article>
          </FadeIn>

          <div className="mt-16 pt-8" style={{ borderTop: "1px solid var(--glass-border)" }}>
            <Link to="/blog" className="btn-outline">← All Posts</Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

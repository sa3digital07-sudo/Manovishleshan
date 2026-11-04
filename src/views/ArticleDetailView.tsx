import React, { useState } from 'react';
import { PageView, Article, UserAccount } from '../types';
import { ARTICLES_DATA, COMMENTS_DATA } from '../data/mockData';
import {
  ArrowLeft,
  Share2,
  Bookmark,
  Check,
  Clock,
  Calendar,
  Send,
  MessageSquare,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface ArticleDetailViewProps {
  article: Article;
  setCurrentPage: (page: PageView) => void;
  onSelectArticle: (art: Article) => void;
  user: UserAccount;
  onToggleBookmark: (id: string) => void;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  article,
  setCurrentPage,
  onSelectArticle,
  user,
  onToggleBookmark,
}) => {
  const [copied, setCopied] = useState(false);
  const [comments, setComments] = useState(
    COMMENTS_DATA.filter((c) => c.articleId === article.id)
  );
  const [commentInput, setCommentInput] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  const isBookmarked = user.bookmarks.includes(article.id);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `वाचा: ${article.title}\nलेखक: ${article.author}\nलिंक: ${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentInput.trim()) {
      const newComment = {
        id: `com-${Date.now()}`,
        articleId: article.id,
        userName: user.isLoggedIn ? user.name : 'एक जिज्ञासू वाचक',
        comment: commentInput.trim(),
        date: 'आत्ताच',
      };
      setComments([newComment, ...comments]);
      setCommentInput('');
      setCommentSuccess(true);
      setTimeout(() => setCommentSuccess(false), 3000);
    }
  };

  const relatedArticles = ARTICLES_DATA.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Back button */}
      <div>
        <button
          onClick={() => setCurrentPage('articles')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5D6B63] hover:text-[#202A35] transition-colors p-2 rounded-lg hover:bg-black/5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>सर्व लेखांकडे परत जा</span>
        </button>
      </div>

      {/* Article Header */}
      <header className="space-y-5 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-[#5D6B63]">
          <span className="font-semibold text-[#176B68] uppercase tracking-wider">
            {article.category}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readTime}</span>
          </span>
          <span>·</span>
          <span>{article.publishedDate}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#202A35] leading-tight text-balance">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-[#5D6B63] leading-relaxed max-w-3xl">
          {article.summary}
        </p>

        {/* Author Ribbon & Actions */}
        <div className="pt-4 border-y border-[#202A35]/10 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden bg-slate-200">
              <img
                src={article.authorAvatar}
                alt={article.author}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-serif font-bold text-sm text-[#202A35]">{article.author}</p>
              <p className="text-xs text-[#5D6B63]">{article.authorTitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors min-h-[42px] ${
                isBookmarked
                  ? 'bg-[#D7B56D] border-[#D7B56D] text-[#202A35]'
                  : 'border-[#202A35]/20 text-[#202A35] hover:bg-[#E5ECE6]'
              }`}
            >
              <Bookmark className="w-4 h-4 fill-current" />
              <span>{isBookmarked ? 'जतन केले' : 'जतन करा'}</span>
            </button>

            <button
              onClick={handleWhatsAppShare}
              title="व्हॉट्सॲपवर शेअर करा"
              className="p-2.5 rounded-xl border border-emerald-600/30 text-emerald-700 hover:bg-emerald-50 transition-colors min-h-[42px] min-w-[42px] flex items-center justify-center"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={handleCopyLink}
              title="लिंक कॉपी करा"
              className="p-2.5 rounded-xl border border-[#202A35]/20 text-[#202A35] hover:bg-[#E5ECE6] transition-colors min-h-[42px] min-w-[42px] flex items-center justify-center"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Layers className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Cover Image */}
      <div className="rounded-3xl overflow-hidden shadow-lg border-4 border-white aspect-[16/9] bg-[#E5ECE6]">
        <img
          src={article.coverImage}
          alt={article.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Body Content */}
      <article className="prose prose-stone max-w-none space-y-6 text-base sm:text-lg text-[#202A35] leading-[1.85]">
        {article.content.map((para, i) => {
          if (i === 0) {
            return (
              <p
                key={i}
                className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#176B68] first-letter:float-left first-letter:mr-3 first-letter:mt-1"
              >
                {para}
              </p>
            );
          }
          return <p key={i}>{para}</p>;
        })}

        {/* Pull Quote */}
        {article.pullQuote && (
          <blockquote className="my-10 p-6 sm:p-8 rounded-2xl bg-[#E5ECE6]/60 border-y border-[#176B68]/30 text-center space-y-2">
            <p className="text-xl sm:text-2xl font-serif italic text-[#202A35] leading-relaxed">
              "{article.pullQuote}"
            </p>
          </blockquote>
        )}

        {/* Tags */}
        <div className="pt-6 border-t border-[#202A35]/10 flex flex-wrap items-center gap-2">
          <span className="text-xs text-[#5D6B63] font-semibold">टॅग्ज:</span>
          {article.tags.map((t) => (
            <span
              key={t}
              className="px-3 py-1 text-xs rounded-full bg-[#E5ECE6] text-[#176B68] font-medium"
            >
              #{t}
            </span>
          ))}
        </div>
      </article>

      {/* Comments Section */}
      <section className="pt-10 border-t border-[#202A35]/15 space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-serif font-bold text-[#202A35] flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#176B68]" />
            <span>वाचक मते व चर्चा ({comments.length})</span>
          </h3>
          <span className="text-xs text-[#5D6B63]">सभ्य व सुसंस्कृत संवाद</span>
        </div>

        {/* Add comment */}
        <form onSubmit={handleAddComment} className="p-5 rounded-2xl bg-white border border-[#202A35]/10 space-y-3">
          <textarea
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            rows={3}
            placeholder="या लेखाबद्दल आपले मत किंवा अनुभव येथे मांडा..."
            required
            className="w-full p-3 rounded-xl bg-[#F7F4EE] border border-[#202A35]/15 text-sm focus:outline-none focus:border-[#176B68]"
          />

          <div className="flex items-center justify-between">
            <span className="text-xs text-[#5D6B63]">
              {user.isLoggedIn ? `वाचक: ${user.name}` : 'अतिथी वाचक म्हणून प्रतिक्रिया'}
            </span>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#176B68] hover:bg-[#135855] text-white text-xs font-semibold transition-colors"
            >
              <span>टिप्पणी पाठवा</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          {commentSuccess && (
            <p className="text-xs font-semibold text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
              आपली टिप्पणी यशस्वीरीत्या प्रकाशित झाली आहे!
            </p>
          )}
        </form>

        {/* Comments List */}
        <div className="space-y-3">
          {comments.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-xl bg-white border border-[#202A35]/10 space-y-1"
            >
              <div className="flex items-center justify-between text-xs">
                <strong className="font-serif font-bold text-[#202A35]">{c.userName}</strong>
                <span className="text-[#5D6B63]">{c.date}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#5D6B63] leading-relaxed">{c.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Articles */}
      <section className="pt-10 border-t border-[#202A35]/15 space-y-6">
        <h3 className="text-xl font-serif font-bold text-[#202A35]">
          संबंधित इतर विचारप्रवर्तक लेख
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedArticles.map((rel) => (
            <div
              key={rel.id}
              onClick={() => {
                onSelectArticle(rel);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-5 rounded-2xl bg-white border border-[#202A35]/10 hover:border-[#176B68] transition-all cursor-pointer space-y-2 group"
            >
              <span className="text-xs font-semibold text-[#176B68] uppercase tracking-wider">
                {rel.category} · {rel.readTime}
              </span>
              <h4 className="font-serif font-bold text-base text-[#202A35] group-hover:text-[#176B68] transition-colors leading-snug">
                {rel.title}
              </h4>
              <p className="text-xs text-[#5D6B63] line-clamp-2">{rel.summary}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { PageView, Article, UserAccount } from '../types';
import { ARTICLES_DATA, COMMENTS_DATA } from '../data/mockData';
import {
  ArrowLeft,
  Share2,
  Bookmark,
  Check,
  Clock,
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
  const [shared, setShared] = useState(false);
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

  const handleShare = () => {
    if (navigator.clipboard) {
      const text = `मासिक मनोविश्लेषण लेख: ${article.title} - ${article.author}`;
      navigator.clipboard.writeText(text);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    }
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
    <div className="space-y-8 sm:space-y-10 max-w-4xl mx-auto">
      {/* Back button */}
      <div>
        <button
          onClick={() => setCurrentPage('articles')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#626D79] hover:text-[#245A91] transition-colors p-2 rounded-lg hover:bg-[#F5F7FA]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>सर्व लेखांकडे परत जा</span>
        </button>
      </div>

      {/* Article Header */}
      <header className="space-y-4 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-[#626D79]">
          <span className="font-bold text-[#245A91] uppercase tracking-wider bg-[#EBF3FA] px-2.5 py-0.5 rounded">
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

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#252D38] leading-tight text-balance">
          {article.title}
        </h1>

        <p className="text-sm sm:text-base text-[#626D79] leading-relaxed max-w-3xl">
          {article.summary}
        </p>

        {/* Author Ribbon & Actions */}
        <div className="pt-3 border-y border-[#E4E9EF] py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden bg-slate-200 border border-[#E4E9EF]">
              <img
                src={article.authorAvatar}
                alt={article.author}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-sm text-[#252D38]">{article.author}</p>
              <p className="text-xs text-[#626D79]">{article.authorTitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`p-2.5 px-3.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors min-h-[42px] ${
                isBookmarked
                  ? 'bg-[#F2C14E] border-[#F2C14E] text-[#20354D]'
                  : 'border-[#E4E9EF] text-[#252D38] hover:bg-[#F5F7FA]'
              }`}
            >
              <Bookmark className="w-4 h-4 fill-current" />
              <span>{isBookmarked ? 'जतन केले' : 'जतन करा'}</span>
            </button>

            <button
              onClick={handleShare}
              title="माहिती कॉपी करा"
              className="p-2.5 rounded-xl border border-[#E4E9EF] text-[#245A91] hover:bg-[#EBF3FA] transition-colors min-h-[42px] min-w-[42px] flex items-center justify-center"
            >
              {shared ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={handleCopyLink}
              title="लिंक कॉपी करा"
              className="p-2.5 rounded-xl border border-[#E4E9EF] text-[#252D38] hover:bg-[#F5F7FA] transition-colors min-h-[42px] min-w-[42px] flex items-center justify-center"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Layers className="w-4 h-4" />}
            </button>
          </div>
        </div>
        {(copied || shared) && (
          <span className="text-[11px] text-emerald-600 font-bold block">
            {copied ? 'लिंक क्लिपबोर्डवर कॉपी झाली!' : 'माहिती क्लिपबोर्डवर कॉपी झाली!'}
          </span>
        )}
      </header>

      {/* Main Cover Image */}
      <div className="rounded-3xl overflow-hidden shadow-xs border border-[#E4E9EF] aspect-[16/9] bg-[#F5F7FA]">
        <img
          src={article.coverImage}
          alt={article.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Body Content */}
      <article className="space-y-6 text-base sm:text-lg text-[#252D38] leading-[1.85]">
        {article.content.map((para, i) => {
          if (i === 0) {
            return (
              <p
                key={i}
                className="first-letter:text-5xl first-letter:font-bold first-letter:text-[#245A91] first-letter:float-left first-letter:mr-3 first-letter:mt-1"
              >
                {para}
              </p>
            );
          }
          return <p key={i}>{para}</p>;
        })}

        {/* Pull Quote */}
        {article.pullQuote && (
          <blockquote className="my-8 p-6 sm:p-8 rounded-2xl bg-[#F5F7FA] border-l-4 border-[#245A91] text-center space-y-2">
            <p className="text-lg sm:text-xl font-serif italic text-[#20354D] leading-relaxed">
              "{article.pullQuote}"
            </p>
          </blockquote>
        )}

        {/* Tags */}
        <div className="pt-6 border-t border-[#E4E9EF] flex flex-wrap items-center gap-2">
          <span className="text-xs text-[#626D79] font-bold">टॅग्ज:</span>
          {article.tags.map((t) => (
            <span
              key={t}
              className="px-3 py-1 text-xs rounded-full bg-[#EBF3FA] text-[#245A91] font-semibold"
            >
              #{t}
            </span>
          ))}
        </div>
      </article>

      {/* Comments Section */}
      <section className="pt-8 border-t border-[#E4E9EF] space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-[#252D38] flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#245A91]" />
            <span>वाचक मते व चर्चा ({comments.length})</span>
          </h3>
          <span className="text-xs text-[#626D79]">सभ्य व सुसंस्कृत संवाद</span>
        </div>

        {/* Add comment */}
        <form onSubmit={handleAddComment} className="p-5 rounded-2xl bg-[#F5F7FA] border border-[#E4E9EF] space-y-3">
          <textarea
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            rows={3}
            placeholder="या लेखाविषयी आपले मत किंवा प्रश्न येथे लिहा..."
            required
            className="w-full p-3 rounded-xl bg-white border border-[#E4E9EF] text-sm text-[#252D38] focus:outline-none focus:border-[#245A91]"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#626D79]">
              {user.isLoggedIn ? `वाचक: ${user.name}` : 'अतिथी वाचक म्हणून प्रतिक्रिया'}
            </span>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#245A91] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-colors shadow-xs"
            >
              <span>प्रतिक्रिया नोंदवा</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
          {commentSuccess && (
            <p className="text-xs font-bold text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
              आपली प्रतिक्रिया यशस्वीरीत्या जोडली गेली आहे!
            </p>
          )}
        </form>

        {/* Comments List */}
        <div className="space-y-3">
          {comments.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-xl bg-white border border-[#E4E9EF] space-y-1.5 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#252D38]">{c.userName}</span>
                <span className="text-[11px] text-[#626D79]">{c.date}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#626D79] leading-relaxed">{c.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Articles */}
      <section className="pt-8 border-t border-[#E4E9EF] space-y-4">
        <h3 className="text-lg font-bold text-[#252D38]">संबंधित आणखी लेख</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {relatedArticles.map((rel) => (
            <div
              key={rel.id}
              onClick={() => onSelectArticle(rel)}
              className="p-4 rounded-xl bg-white border border-[#E4E9EF] hover:border-[#245A91] transition-all cursor-pointer flex items-center justify-between gap-4 group shadow-xs"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#245A91]">{rel.category}</span>
                <h4 className="font-bold text-sm text-[#252D38] group-hover:text-[#245A91] line-clamp-1">
                  {rel.title}
                </h4>
                <p className="text-xs text-[#626D79]">{rel.author}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#626D79] group-hover:translate-x-1 group-hover:text-[#245A91] transition-all shrink-0" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

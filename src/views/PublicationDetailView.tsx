import React, { useState } from 'react';
import { PageView, Publication, UserAccount } from '../types';
import { REVIEWS_DATA } from '../data/mockData';
import {
  ArrowLeft,
  BookOpen,
  Share2,
  Bookmark,
  Check,
  Star,
  MessageSquare,
  Sparkles,
  Calendar,
  Clock,
  Layers,
  Send,
} from 'lucide-react';

interface PublicationDetailViewProps {
  publication: Publication;
  setCurrentPage: (page: PageView) => void;
  user: UserAccount;
  onToggleBookmark: (id: string) => void;
  onOpenReader: () => void;
  onOpenAccount: () => void;
}

export const PublicationDetailView: React.FC<PublicationDetailViewProps> = ({
  publication,
  setCurrentPage,
  user,
  onToggleBookmark,
  onOpenReader,
  onOpenAccount,
}) => {
  const [copied, setCopied] = useState(false);
  const [ratingInput, setRatingInput] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [userReviews, setUserReviews] = useState(
    REVIEWS_DATA.filter((r) => r.publicationId === publication.id)
  );
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const isBookmarked = user.bookmarks.includes(publication.id);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `वाचा: ${publication.title} - ${publication.subtitle}\nलिंक: ${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewText.trim()) {
      const newReview = {
        id: `rev-${Date.now()}`,
        publicationId: publication.id,
        userName: user.isLoggedIn ? user.name : 'एक जागरूक वाचक',
        rating: ratingInput,
        comment: reviewText.trim(),
        date: 'आत्ताच',
      };
      setUserReviews([newReview, ...userReviews]);
      setReviewText('');
      setReviewSubmitted(true);
      setTimeout(() => setReviewSubmitted(false), 3000);
    }
  };

  return (
    <div className="space-y-12">
      {/* Back button */}
      <div>
        <button
          onClick={() => setCurrentPage('publications')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5D6B63] hover:text-[#202A35] transition-colors p-2 rounded-lg hover:bg-black/5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>सर्व प्रकाशनांकडे परत जा</span>
        </button>
      </div>

      {/* Main Publication Overview Hero */}
      <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-white border border-[#202A35]/10 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Cover Art (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-[#F7F4EE] aspect-[3/4] w-full max-w-[280px]">
              <img
                src={publication.coverImage}
                alt={publication.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-5 w-full max-w-[280px] flex items-center justify-between gap-2">
              <button
                onClick={() => onToggleBookmark(publication.id)}
                className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors min-h-[44px] ${
                  isBookmarked
                    ? 'bg-[#D7B56D] border-[#D7B56D] text-[#202A35]'
                    : 'border-[#202A35]/20 text-[#202A35] hover:bg-[#E5ECE6]'
                }`}
              >
                <Bookmark className="w-4 h-4 fill-current" />
                <span>{isBookmarked ? 'जतन केले' : 'बुकमार्क करा'}</span>
              </button>

              <button
                onClick={handleWhatsAppShare}
                title="व्हॉट्सॲपवर शेअर करा"
                className="p-2.5 rounded-xl border border-emerald-600/30 text-emerald-700 hover:bg-emerald-50 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={handleCopyLink}
                title="लिंक कॉपी करा"
                className="p-2.5 rounded-xl border border-[#202A35]/20 text-[#202A35] hover:bg-[#E5ECE6] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Layers className="w-4 h-4" />}
              </button>
            </div>
            {copied && (
              <span className="text-[11px] text-emerald-600 font-semibold mt-1">
                लिंक कॉपी झाली!
              </span>
            )}
          </div>

          {/* Details & Metadata (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#5D6B63]">
                <span className="font-semibold text-[#176B68] uppercase tracking-wider">
                  {publication.category}
                </span>
                <span>·</span>
                <span>{publication.editionMonth}</span>
                <span>·</span>
                <span>प्रकाशित: {publication.publishedDate}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#202A35] leading-tight">
                {publication.title}
              </h1>

              <p className="text-base sm:text-lg text-[#A64F35] font-serif italic">
                {publication.subtitle}
              </p>

              <p className="text-xs text-[#5D6B63]">
                लेखक / संपादन: <strong>{publication.author}</strong>
              </p>
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#F7F4EE] border border-[#202A35]/10 text-xs">
              <div>
                <span className="text-[#5D6B63] block">एकूण पाने</span>
                <strong className="text-sm font-serif text-[#202A35]">{publication.pages} पाने</strong>
              </div>
              <div>
                <span className="text-[#5D6B63] block">वाचन वेळ</span>
                <strong className="text-sm font-serif text-[#202A35]">{publication.readTime}</strong>
              </div>
              <div>
                <span className="text-[#5D6B63] block">प्रकरणे संख्या</span>
                <strong className="text-sm font-serif text-[#202A35]">{publication.chaptersCount} प्रकरणे</strong>
              </div>
              <div>
                <span className="text-[#5D6B63] block">वाचक गुणांकन</span>
                <strong className="text-sm font-serif text-[#202A35] flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#D7B56D] text-[#D7B56D]" />
                  <span>{publication.rating} / ५</span>
                </strong>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-lg text-[#202A35]">
                अंकाविषयी थोडक्यात
              </h3>
              <p className="text-sm sm:text-base text-[#5D6B63] leading-relaxed">
                {publication.description}
              </p>
            </div>

            {/* Summary Highlights */}
            {publication.summaryPoints && (
              <div className="space-y-2.5">
                <h4 className="font-serif font-bold text-sm text-[#176B68]">
                  या प्रकाशनातील प्रमुख विषय:
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-[#202A35]">
                  {publication.summaryPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#176B68] mt-2 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Primary Action Button */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenReader}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#176B68] hover:bg-[#135855] text-white font-semibold text-base transition-colors shadow-md min-h-[48px]"
              >
                <BookOpen className="w-5 h-5" />
                <span>ऑनलाईन वाचा (Read Online)</span>
              </button>

              <span className="text-xs text-[#5D6B63]">
                डिजिटल वाचन अनुभव · मोबाईल व लॅपटॉप अनुकूल
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Ratings and Reviews Section */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#202A35]/10 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <h3 className="text-2xl font-serif font-bold text-[#202A35]">
              वाचक प्रतिक्रिया आणि परीक्षणे
            </h3>
            <p className="text-xs text-[#5D6B63] mt-1">
              एकूण {userReviews.length} वाचकांनी आपले मत नोंदवले आहे.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#F7F4EE] px-4 py-2 rounded-xl">
            <span className="text-2xl font-serif font-bold text-[#202A35]">
              {publication.rating}
            </span>
            <div className="flex text-[#D7B56D]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
          </div>
        </div>

        {/* Add Review Form */}
        <form onSubmit={handleAddReview} className="p-5 rounded-2xl bg-[#F7F4EE] space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#176B68] block">
            आपले परीक्षण नोंदवा (Review Demonstration)
          </span>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#202A35]">गुणांकन द्या:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRatingInput(star)}
                  className="p-1 focus:outline-none"
                >
                  <Star
                    className={`w-5 h-5 transition-colors ${
                      star <= ratingInput
                        ? 'fill-[#D7B56D] text-[#D7B56D]'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows={3}
            placeholder="या अंकाविषयी आपले विचार आणि अनुभव येथे लिहा..."
            required
            className="w-full p-3 rounded-xl bg-white border border-[#202A35]/15 text-sm focus:outline-none focus:border-[#176B68]"
          />

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#5D6B63]">
              {user.isLoggedIn ? `नोंदणी: ${user.name}` : 'अतिथी वाचक म्हणून प्रतिक्रिया'}
            </span>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#176B68] hover:bg-[#135855] text-white text-xs font-semibold transition-colors"
            >
              <span>प्रतिक्रिया पाठवा</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          {reviewSubmitted && (
            <p className="text-xs font-semibold text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
              आपली प्रतिक्रिया यशस्वीरीत्या जोडली गेली आहे!
            </p>
          )}
        </form>

        {/* Reviews List */}
        <div className="space-y-4">
          {userReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-white border border-[#202A35]/10 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <strong className="font-serif font-bold text-sm text-[#202A35]">
                    {rev.userName}
                  </strong>
                  <span className="text-[11px] text-[#5D6B63]">· {rev.date}</span>
                </div>
                <div className="flex text-[#D7B56D]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#5D6B63] leading-relaxed">
                {rev.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

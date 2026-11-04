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
}) => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
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

  const handleShare = () => {
    if (navigator.clipboard) {
      const text = `मासिक मनोविश्लेषण: ${publication.title} - ${publication.subtitle}`;
      navigator.clipboard.writeText(text);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    }
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
    <div className="space-y-8 sm:space-y-10">
      {/* Back button */}
      <div>
        <button
          onClick={() => setCurrentPage('publications')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#626D79] hover:text-[#245A91] transition-colors p-2 rounded-lg hover:bg-[#F5F7FA]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>सर्व प्रकाशनांकडे परत जा</span>
        </button>
      </div>

      {/* Main Publication Overview Hero */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#E4E9EF] shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Cover Art (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-[#F5F7FA] aspect-[3/4] w-full max-w-[280px] p-2 flex items-center justify-center">
              <img
                src={publication.coverImage}
                alt={publication.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="mt-5 w-full max-w-[280px] flex items-center justify-between gap-2">
              <button
                onClick={() => onToggleBookmark(publication.id)}
                className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors min-h-[44px] ${
                  isBookmarked
                    ? 'bg-[#F2C14E] border-[#F2C14E] text-[#20354D]'
                    : 'border-[#E4E9EF] text-[#252D38] hover:bg-[#F5F7FA]'
                }`}
              >
                <Bookmark className="w-4 h-4 fill-current" />
                <span>{isBookmarked ? 'जतन केले' : 'बुकमार्क करा'}</span>
              </button>

              <button
                onClick={handleShare}
                title="माहिती कॉपी करा"
                className="p-2.5 rounded-xl border border-[#E4E9EF] text-[#252D38] hover:bg-[#F5F7FA] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                {shared ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              </button>

              <button
                onClick={handleCopyLink}
                title="लिंक कॉपी करा"
                className="p-2.5 rounded-xl border border-[#E4E9EF] text-[#252D38] hover:bg-[#F5F7FA] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Layers className="w-4 h-4" />}
              </button>
            </div>
            {(copied || shared) && (
              <span className="text-[11px] text-emerald-600 font-bold mt-1.5">
                {copied ? 'लिंक क्लिपबोर्डवर कॉपी झाली!' : 'माहिती क्लिपबोर्डवर कॉपी झाली!'}
              </span>
            )}
          </div>

          {/* Details & Metadata (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#626D79]">
                <span className="font-bold text-[#245A91] uppercase tracking-wider bg-[#EBF3FA] px-2 py-0.5 rounded">
                  {publication.category}
                </span>
                <span>·</span>
                <span>{publication.editionMonth}</span>
                <span>·</span>
                <span>प्रकाशित: {publication.publishedDate}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-[#252D38] leading-tight">
                {publication.title}
              </h1>

              <p className="text-sm sm:text-base text-[#D97706] font-semibold">
                {publication.subtitle}
              </p>

              <p className="text-xs text-[#626D79]">
                लेखक / संपादन: <strong className="text-[#252D38]">{publication.author}</strong>
              </p>
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#F5F7FA] border border-[#E4E9EF] text-xs">
              <div>
                <span className="text-[#626D79] block">एकूण पाने</span>
                <strong className="text-sm text-[#252D38]">{publication.pages} पाने</strong>
              </div>
              <div>
                <span className="text-[#626D79] block">वाचन वेळ</span>
                <strong className="text-sm text-[#252D38]">{publication.readTime}</strong>
              </div>
              <div>
                <span className="text-[#626D79] block">प्रकरणे संख्या</span>
                <strong className="text-sm text-[#252D38]">{publication.chaptersCount} प्रकरणे</strong>
              </div>
              <div>
                <span className="text-[#626D79] block">वाचक गुणांकन</span>
                <strong className="text-sm text-[#252D38] flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#F2C14E] text-[#F2C14E]" />
                  <span>{publication.rating} / ५</span>
                </strong>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-bold text-base text-[#252D38]">
                अंकाविषयी थोडक्यात
              </h3>
              <p className="text-xs sm:text-sm text-[#626D79] leading-relaxed">
                {publication.description}
              </p>
            </div>

            {/* Summary Highlights */}
            {publication.summaryPoints && (
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#245A91]">
                  या प्रकाशनातील प्रमुख विषय:
                </h4>
                <ul className="space-y-1.5 text-xs text-[#252D38]">
                  {publication.summaryPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#245A91] mt-1.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Primary Action Button */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenReader}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#245A91] hover:bg-[#1E3A8A] text-white font-bold text-sm transition-all shadow-xs min-h-[46px]"
              >
                <BookOpen className="w-4 h-4" />
                <span>ऑनलाईन वाचा (Read Online)</span>
              </button>

              <span className="text-xs text-[#626D79]">
                डिजिटल वाचन अनुभव · मोबाईल व लॅपटॉप अनुकूल
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Ratings and Reviews Section */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#E4E9EF] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4E9EF]">
          <div>
            <h3 className="text-xl font-bold text-[#252D38]">
              वाचक प्रतिक्रिया आणि परीक्षणे
            </h3>
            <p className="text-xs text-[#626D79] mt-1">
              एकूण {userReviews.length} वाचकांनी आपले मत नोंदवले आहे.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#F5F7FA] border border-[#E4E9EF] px-4 py-2 rounded-xl">
            <span className="text-2xl font-bold text-[#252D38]">
              {publication.rating}
            </span>
            <div className="flex text-[#F2C14E]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
          </div>
        </div>

        {/* Add Review Form */}
        <form onSubmit={handleAddReview} className="p-5 rounded-2xl bg-[#F5F7FA] border border-[#E4E9EF] space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#245A91] block">
            आपले परीक्षण नोंदवा (Review Demonstration)
          </span>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#252D38]">गुणांकन द्या:</span>
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
                        ? 'fill-[#F2C14E] text-[#F2C14E]'
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
            className="w-full p-3 rounded-xl bg-white border border-[#E4E9EF] text-sm text-[#252D38] focus:outline-none focus:border-[#245A91]"
          />

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-[#626D79]">
              {user.isLoggedIn ? `नोंदणी: ${user.name}` : 'अतिथी वाचक म्हणून प्रतिक्रिया'}
            </span>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#245A91] hover:bg-[#1E3A8A] text-white text-xs font-bold transition-colors shadow-xs"
            >
              <span>प्रतिक्रिया पाठवा</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          {reviewSubmitted && (
            <p className="text-xs font-bold text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
              आपली प्रतिक्रिया यशस्वीरीत्या जोडली गेली आहे!
            </p>
          )}
        </form>

        {/* Reviews List */}
        <div className="space-y-3">
          {userReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-4 sm:p-5 rounded-2xl bg-[#F5F7FA] border border-[#E4E9EF] space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <strong className="font-bold text-sm text-[#252D38]">
                    {rev.userName}
                  </strong>
                  <span className="text-[11px] text-[#626D79]">· {rev.date}</span>
                </div>
                <div className="flex text-[#F2C14E]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#626D79] leading-relaxed">
                {rev.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

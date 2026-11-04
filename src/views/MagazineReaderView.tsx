import React, { useState } from 'react';
import { PageView, UserAccount } from '../types';
import { CURRENT_EDITION_CHAPTERS, PUBLICATIONS_DATA, CURRENT_EDITION_ID } from '../data/mockData';
import { AdvertisementBanner } from '../components/AdvertisementBanner';
import { evaluateAssessment, AssessmentResult } from '../utils/magazineLogic';
import {
  BookOpen,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Share2,
  Bookmark,
  Check,
  Menu,
  X,
  Sparkles,
  Clock,
  RotateCcw,
} from 'lucide-react';

interface MagazineReaderViewProps {
  setCurrentPage: (page: PageView) => void;
  user: UserAccount;
  onToggleBookmark: (id: string) => void;
  onOpenAccount: () => void;
}

export const MagazineReaderView: React.FC<MagazineReaderViewProps> = ({
  setCurrentPage,
  user,
  onToggleBookmark,
}) => {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  // Self-assessment state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 1,
  });
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);

  const currentPub =
    PUBLICATIONS_DATA.find((p) => p.id === CURRENT_EDITION_ID) || PUBLICATIONS_DATA[0];

  const chapters = CURRENT_EDITION_CHAPTERS;
  const chapter = chapters[currentChapterIndex] || chapters[0];

  const progressPercent = Math.round(((currentChapterIndex + 1) / chapters.length) * 100);

  const handleNextChapter = () => {
    if (currentChapterIndex < chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCopyShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`मासिक मनोविश्लेषण - ${chapter.title}`);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    }
  };

  const isBookmarked = user.bookmarks.includes(currentPub.id);

  const handleCalculateQuiz = () => {
    const res = evaluateAssessment(quizAnswers);
    setAssessmentResult(res);
  };

  const fontClasses = {
    normal: 'text-base sm:text-lg leading-[1.8]',
    large: 'text-lg sm:text-xl leading-[1.85]',
    xlarge: 'text-xl sm:text-2xl leading-[1.9]',
  };

  return (
    <div className="min-h-screen pb-16 bg-white">
      {/* Top Utility Sticky Reading Ribbon */}
      <div className="sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-[#E4E9EF] px-2.5 sm:px-4 py-2 sm:py-2.5 shadow-xs">
        <div className="max-w-4xl mx-auto flex flex-col gap-1.5 sm:gap-2">
          {/* Primary Controls Row */}
          <div className="flex items-center justify-between gap-1.5 sm:gap-4">
            {/* Left: Back & Table of Contents Drawer Trigger */}
            <div className="flex items-center gap-1 sm:gap-2 min-w-0 shrink">
              <button
                onClick={() => setCurrentPage('home')}
                aria-label="मुख्यपृष्ठावर परत जा"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#626D79] hover:text-[#245A91] transition-colors p-1.5 rounded-lg hover:bg-[#F5F7FA] shrink-0"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">मुख्यपृष्ठ</span>
              </button>

              <button
                onClick={() => setSidebarOpen(true)}
                aria-label="अंकाची अनुक्रमणिका उघडा"
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#EBF3FA] text-[#245A91] text-xs font-bold hover:bg-[#dbe9f6] transition-colors min-h-[36px] max-w-[170px] sm:max-w-[220px]"
              >
                <Menu className="w-4 h-4 shrink-0" />
                <span className="truncate">
                  अनुक्रमणिका ({currentChapterIndex + 1}/{chapters.length})
                </span>
              </button>
            </div>

            {/* Middle: Desktop Progress Indicator (md:flex) */}
            <div className="hidden md:flex items-center gap-3 flex-1 max-w-xs mx-3">
              <div className="w-full bg-[#E4E9EF] rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#245A91] h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-[11px] font-mono font-bold text-[#626D79] whitespace-nowrap">
                {progressPercent}%
              </span>
            </div>

            {/* Right: Font adjuster on tablet/desktop, plus Bookmark & Share */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* Senior-friendly Font size adjuster (Desktop / sm+ inline) */}
              <div className="hidden sm:flex items-center bg-[#F5F7FA] border border-[#E4E9EF] rounded-lg p-0.5 text-xs font-semibold">
                <button
                  onClick={() => setFontSize('normal')}
                  title="सामान्य आकार"
                  className={`px-2 py-1 rounded transition-colors ${
                    fontSize === 'normal' ? 'bg-white text-[#245A91] shadow-xs font-bold' : 'text-[#626D79]'
                  }`}
                >
                  अ
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  title="मोठा आकार"
                  className={`px-2 py-1 rounded transition-colors ${
                    fontSize === 'large' ? 'bg-white text-[#245A91] shadow-xs font-bold' : 'text-[#626D79]'
                  }`}
                >
                  अ+
                </button>
                <button
                  onClick={() => setFontSize('xlarge')}
                  title="अति मोठा आकार"
                  className={`px-2 py-1 rounded transition-colors ${
                    fontSize === 'xlarge' ? 'bg-white text-[#245A91] shadow-xs font-bold' : 'text-[#626D79]'
                  }`}
                >
                  अ++
                </button>
              </div>

              {/* Bookmark button */}
              <button
                onClick={() => onToggleBookmark(currentPub.id)}
                aria-label={isBookmarked ? 'अंक जतन केला आहे' : 'अंक जतन करा'}
                className={`p-1.5 sm:p-2 rounded-lg transition-colors border ${
                  isBookmarked
                    ? 'bg-[#F2C14E] text-[#20354D] border-[#F2C14E]'
                    : 'border-[#E4E9EF] text-[#626D79] hover:bg-[#F5F7FA]'
                }`}
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>

              {/* Share button */}
              <button
                onClick={handleCopyShare}
                aria-label="शेअर लिंक कॉपी करा"
                className="p-1.5 sm:p-2 rounded-lg border border-[#E4E9EF] text-[#245A91] hover:bg-[#EBF3FA] transition-colors flex items-center justify-center min-w-[34px] sm:min-w-[36px]"
              >
                {shareCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Mobile Secondary Utility Row: Font Size Adjuster + Reading Progress Bar */}
          <div className="flex sm:hidden items-center justify-between gap-2.5 pt-1.5 border-t border-[#E4E9EF]/60">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[11px] font-semibold text-[#626D79]">फॉन्ट:</span>
              <div className="flex items-center bg-[#F5F7FA] border border-[#E4E9EF] rounded-lg p-0.5 text-xs font-semibold">
                <button
                  onClick={() => setFontSize('normal')}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    fontSize === 'normal' ? 'bg-white text-[#245A91] shadow-xs font-bold' : 'text-[#626D79]'
                  }`}
                >
                  अ
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    fontSize === 'large' ? 'bg-white text-[#245A91] shadow-xs font-bold' : 'text-[#626D79]'
                  }`}
                >
                  अ+
                </button>
                <button
                  onClick={() => setFontSize('xlarge')}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    fontSize === 'xlarge' ? 'bg-white text-[#245A91] shadow-xs font-bold' : 'text-[#626D79]'
                  }`}
                >
                  अ++
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-1 max-w-[150px]">
              <div className="w-full bg-[#E4E9EF] rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#245A91] h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-[10px] font-mono font-bold text-[#626D79] whitespace-nowrap">
                {progressPercent}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Reading Frame */}
      <div className="w-full max-w-3xl mx-auto px-3.5 sm:px-6 pt-6 sm:pt-10">
        {/* Chapter Header */}
        <div className="space-y-3 pb-6 border-b border-[#E4E9EF] text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-[#626D79]">
            <span className="font-bold text-[#245A91] uppercase tracking-wider bg-[#EBF3FA] px-2 py-0.5 rounded">
              {chapter.category}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>वाचन वेळ: {chapter.readTime}</span>
            </span>
            <span>·</span>
            <span>{currentPub.editionMonth}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#252D38] leading-tight break-words">
            {chapter.title}
          </h1>

          {chapter.subtitle && (
            <p className="text-sm sm:text-base text-[#D97706] font-semibold break-words">
              {chapter.subtitle}
            </p>
          )}

          <div className="flex items-center justify-center sm:justify-start gap-3 pt-1 text-xs text-[#626D79]">
            <span className="font-bold text-[#252D38]">{chapter.author}</span>
            <span>·</span>
            <span>{chapter.authorRole}</span>
          </div>
        </div>

        {/* Chapter Content Prose */}
        <article className="py-6 sm:py-8 space-y-6 w-full max-w-full overflow-hidden">
          {/* Drop Cap & Opening Paragraphs */}
          {chapter.content.map((paragraph, idx) => {
            if (idx === 0) {
              return (
                <p
                  key={idx}
                  className={`${fontClasses[fontSize]} text-[#252D38] break-words first-letter:text-5xl first-letter:font-bold first-letter:text-[#245A91] first-letter:float-left first-letter:mr-3 first-letter:mt-1`}
                >
                  {paragraph}
                </p>
              );
            }
            return (
              <p key={idx} className={`${fontClasses[fontSize]} text-[#252D38] break-words`}>
                {paragraph}
              </p>
            );
          })}

          {/* Pull Quote */}
          {chapter.pullQuote && (
            <blockquote className="my-6 sm:my-8 p-4 sm:p-8 rounded-2xl bg-[#F5F7FA] border-l-4 border-[#245A91] text-center space-y-2">
              <p className="text-base sm:text-xl italic font-serif text-[#20354D] leading-relaxed break-words">
                "{chapter.pullQuote}"
              </p>
            </blockquote>
          )}

          {/* Bullet points */}
          {chapter.bulletPoints && (
            <div className="my-6 p-4 sm:p-6 rounded-2xl bg-[#F5F7FA] border border-[#E4E9EF] space-y-3">
              <h4 className="font-bold text-base text-[#245A91]">
                महत्त्वाचे मुख्य मुद्दे:
              </h4>
              <ul className="space-y-2 text-sm sm:text-base text-[#252D38]">
                {chapter.bulletPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#245A91] mt-2 shrink-0" />
                    <span className="break-words">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* INTERACTIVE SELF-ASSESSMENT COMPONENT (Chapter 10) */}
          {chapter.id === 'self-assessment' && (
            <div className="my-6 sm:my-8 p-4 sm:p-8 rounded-2xl bg-white border-2 border-[#245A91]/30 shadow-md space-y-5">
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-[#245A91] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>संवादात्मक स्व-मूल्यमापन चाचणी</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#252D38]">
                  भावनिक लवचिकता व तणाव मोजणी (Resilience Scale)
                </h3>
                <p className="text-xs text-[#626D79]">
                  प्रत्येक विधानासाठी ० (कधीच नाही) ते ३ (नेहमी) यापैकी स्वतःला सर्वात जवळचा पर्याय निवडा.
                </p>
              </div>

              {/* Questions */}
              <div className="space-y-4 pt-2">
                {[
                  {
                    id: 1,
                    text: '१. कठीण किंवा अनपेक्षित प्रसंग घडल्यावर मी लगेच धीर न सोडता स्वतःला सावरू शकतो/शकते.',
                  },
                  {
                    id: 2,
                    text: '२. कामाचा किंवा कुटुंबाचा ताण असताना मी डोक्यात विचारांचा कल्लोळ न करता शांतपणे विचार करतो/करते.',
                  },
                  {
                    id: 3,
                    text: '३. माझ्या चुकांमधून मी स्वतःला दोष देण्याऐवजी नवीन शिकण्याची संधी शोधतो/शोधते.',
                  },
                  {
                    id: 4,
                    text: '४. संकटात सापडल्यावर जवळच्या व्यक्ती किंवा तज्ज्ञांची मदत घेण्यास मला संकोच वाटत नाही.',
                  },
                  {
                    id: 5,
                    text: '५. दिवसभरात स्वतःच्या विश्रांती आणि छंदासाठी मी किमान १५-२० मिनिटे शांत वेळ काढतो/काढते.',
                  },
                ].map((q) => (
                  <div key={q.id} className="p-3 sm:p-4 rounded-xl bg-[#F5F7FA] border border-[#E4E9EF] space-y-2.5">
                    <p className="text-sm font-semibold text-[#252D38]">{q.text}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 text-[11px] sm:text-xs">
                      {[
                        { label: 'कधीच नाही (०)', val: 0 },
                        { label: 'कधीकधी (१)', val: 1 },
                        { label: 'बऱ्याचदा (२)', val: 2 },
                        { label: 'नेहमी (३)', val: 3 },
                      ].map((opt) => (
                        <button
                          key={opt.val}
                          type="button"
                          onClick={() => setQuizAnswers({ ...quizAnswers, [q.id]: opt.val })}
                          className={`py-2 px-1.5 sm:px-2.5 rounded-lg border text-center transition-colors font-semibold truncate ${
                            quizAnswers[q.id] === opt.val
                              ? 'bg-[#245A91] text-white border-[#245A91] shadow-xs'
                              : 'bg-white text-[#252D38] border-[#E4E9EF] hover:border-[#245A91]'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Calculate Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={handleCalculateQuiz}
                  className="w-full sm:w-auto px-5 sm:px-6 py-2.5 rounded-xl bg-[#245A91] hover:bg-[#1E3A8A] text-white font-bold text-xs sm:text-sm transition-colors shadow-xs"
                >
                  माझा भावनिक स्कोअर व निष्कर्ष पहा
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setQuizAnswers({ 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 });
                    setAssessmentResult(null);
                  }}
                  className="text-xs text-[#626D79] hover:text-[#252D38] inline-flex items-center justify-center gap-1 font-semibold py-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>चाचणी पूर्ववत करा</span>
                </button>
              </div>

              {/* Result Card */}
              {assessmentResult && (
                <div className="p-4 sm:p-5 rounded-xl bg-[#EBF3FA] border border-[#245A91]/40 space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#245A91]">
                      आपला निष्कर्ष (Score: {assessmentResult.score} / {assessmentResult.maxScore})
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#245A91] text-white">
                      {assessmentResult.level}
                    </span>
                  </div>
                  <h4 className="font-bold text-base sm:text-lg text-[#20354D]">
                    {assessmentResult.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#252D38] leading-relaxed">
                    {assessmentResult.recommendation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Chapter Break Advertisement */}
          {(currentChapterIndex === 2 || currentChapterIndex === 6) && (
            <AdvertisementBanner placement="magazine-break" />
          )}
        </article>

        {/* Chapter Navigation Bottom Bar */}
        <div className="py-6 border-t border-[#E4E9EF] flex items-center justify-between gap-2 sm:gap-4">
          <button
            onClick={handlePrevChapter}
            disabled={currentChapterIndex === 0}
            className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-colors min-h-[44px] shrink-0 ${
              currentChapterIndex === 0
                ? 'opacity-40 cursor-not-allowed border-[#E4E9EF] text-[#626D79]'
                : 'border-[#E4E9EF] text-[#252D38] hover:bg-[#F5F7FA]'
            }`}
          >
            <ChevronLeft className="w-4 h-4 shrink-0" />
            <span>मागील</span>
            <span className="hidden xs:inline sm:inline"> प्रकरण</span>
          </button>

          <span className="text-xs text-[#626D79] font-semibold text-center truncate px-1">
            {currentChapterIndex + 1} / {chapters.length}
          </span>

          <button
            onClick={handleNextChapter}
            disabled={currentChapterIndex === chapters.length - 1}
            className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors min-h-[44px] shrink-0 ${
              currentChapterIndex === chapters.length - 1
                ? 'opacity-40 cursor-not-allowed bg-slate-200 text-[#626D79]'
                : 'bg-[#245A91] hover:bg-[#1E3A8A] text-white shadow-xs'
            }`}
          >
            <span>पुढील</span>
            <span className="hidden xs:inline sm:inline"> प्रकरण</span>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>

      {/* Chapter Sidebar / Drawer */}
      {sidebarOpen && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSidebarOpen(false);
          }}
          className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-fadeIn"
        >
          <div className="bg-white w-[88vw] max-w-sm sm:max-w-md h-full shadow-2xl flex flex-col border-l border-[#E4E9EF]">
            <div className="p-5 border-b border-[#E4E9EF] flex items-center justify-between bg-white">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#245A91]" />
                <h3 className="font-bold text-lg text-[#252D38]">
                  अंकाची अनुक्रमणिका
                </h3>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                aria-label="सूची बंद करा"
                className="p-1.5 rounded-lg hover:bg-[#F5F7FA] text-[#626D79]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-1.5">
              {chapters.map((ch, idx) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    setCurrentChapterIndex(idx);
                    setSidebarOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full text-left p-3 rounded-xl transition-colors flex items-start gap-3 min-h-[44px] ${
                    currentChapterIndex === idx
                      ? 'bg-[#245A91] text-white font-bold shadow-xs'
                      : 'hover:bg-[#F5F7FA] text-[#252D38]'
                  }`}
                >
                  <span
                    className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                      currentChapterIndex === idx ? 'bg-white/20 text-white' : 'text-[#626D79]'
                    }`}
                  >
                    {idx + 1 < 10 ? `०${idx + 1}` : idx + 1}
                  </span>
                  <div className="space-y-0.5 flex-1">
                    <p className="text-sm font-bold leading-snug line-clamp-1">{ch.title}</p>
                    <p
                      className={`text-[11px] ${
                        currentChapterIndex === idx ? 'text-white/80' : 'text-[#626D79]'
                      }`}
                    >
                      {ch.category} · {ch.readTime}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <div className="p-4 border-t border-[#E4E9EF] bg-[#F5F7FA] space-y-2">
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  onToggleBookmark(currentPub.id);
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-[#245A91] text-[#245A91] font-bold text-xs hover:bg-[#245A91] hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <Bookmark className="w-4 h-4" />
                <span>{isBookmarked ? 'अंक जतन केला आहे' : 'हा संपूर्ण अंक जतन करा'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

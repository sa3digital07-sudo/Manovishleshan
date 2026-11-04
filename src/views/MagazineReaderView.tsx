import React, { useState, useEffect } from 'react';
import { PageView, UserAccount, Chapter } from '../types';
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
  Type,
  Menu,
  X,
  Sparkles,
  HelpCircle,
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
  onOpenAccount,
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

  // Calculate progress %
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
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `मासिक मनोविश्लेषण - नोव्हेंबर २०२६ अंक: ${chapter.title}\nयेथे वाचा: ${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const isBookmarked = user.bookmarks.includes(currentPub.id);

  const handleCalculateQuiz = () => {
    const res = evaluateAssessment(quizAnswers);
    setAssessmentResult(res);
  };

  // Font size classes
  const fontClasses = {
    normal: 'text-base sm:text-lg leading-[1.8]',
    large: 'text-lg sm:text-xl leading-[1.85]',
    xlarge: 'text-xl sm:text-2xl leading-[1.9]',
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Top Utility Sticky Reading Ribbon */}
      <div className="sticky top-18 z-30 bg-[#F7F4EE]/95 backdrop-blur-md border-b border-[#202A35]/10 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          {/* Back & Chapter Drawer Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage('home')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5D6B63] hover:text-[#202A35] transition-colors p-1.5 rounded-lg hover:bg-black/5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">मुख्यपृष्ठ</span>
            </button>

            <button
              onClick={() => setSidebarOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#E5ECE6] text-[#176B68] text-xs font-semibold hover:bg-[#d5e0d7] transition-colors min-h-[38px]"
            >
              <Menu className="w-4 h-4" />
              <span className="max-w-[150px] sm:max-w-[200px] truncate">
                सूची: {currentChapterIndex + 1}/{chapters.length}
              </span>
            </button>
          </div>

          {/* Reading Progress Indicator */}
          <div className="hidden md:flex items-center gap-3 flex-1 max-w-xs">
            <div className="w-full bg-[#202A35]/10 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#176B68] h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-[#5D6B63] whitespace-nowrap">
              {progressPercent}%
            </span>
          </div>

          {/* Accessibility Font Size & Actions */}
          <div className="flex items-center gap-2">
            {/* Font Adjuster for Older Readers */}
            <div className="flex items-center bg-[#E5ECE6] rounded-lg p-0.5 text-xs font-semibold">
              <button
                onClick={() => setFontSize('normal')}
                title="सामान्य अक्षर आकार"
                className={`px-2 py-1 rounded transition-colors ${
                  fontSize === 'normal' ? 'bg-white text-[#176B68] shadow-sm' : 'text-[#5D6B63]'
                }`}
              >
                अ
              </button>
              <button
                onClick={() => setFontSize('large')}
                title="मोठा अक्षर आकार"
                className={`px-2 py-1 rounded transition-colors ${
                  fontSize === 'large' ? 'bg-white text-[#176B68] shadow-sm' : 'text-[#5D6B63]'
                }`}
              >
                अ+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                title="अति मोठा आकार (ज्येष्ठ वाचकांसाठी)"
                className={`px-2 py-1 rounded transition-colors ${
                  fontSize === 'xlarge' ? 'bg-white text-[#176B68] shadow-sm' : 'text-[#5D6B63]'
                }`}
              >
                अ++
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(currentPub.id)}
              aria-label={isBookmarked ? 'अंक जतन केला आहे' : 'अंक जतन करा'}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked
                  ? 'bg-[#D7B56D] text-[#202A35]'
                  : 'text-[#5D6B63] hover:bg-black/5'
              }`}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            {/* Share Menu */}
            <button
              onClick={handleWhatsAppShare}
              aria-label="व्हॉट्सॲपवर शेअर करा"
              className="p-2 rounded-lg text-[#176B68] hover:bg-[#176B68]/10 transition-colors hidden sm:inline-flex"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile thin reading progress line */}
        <div className="md:hidden w-full bg-[#202A35]/10 h-1 mt-2">
          <div
            className="bg-[#176B68] h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Reading Frame */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        {/* Chapter Header */}
        <div className="space-y-4 pb-8 border-b border-[#202A35]/15 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-[#5D6B63]">
            <span className="font-semibold text-[#176B68] uppercase tracking-wider">
              {chapter.category}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>वाचन वेळ: {chapter.readTime}</span>
            </span>
            <span>·</span>
            <span>नोव्हेंबर २०२६ विशेषांक</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#202A35] leading-[1.25]">
            {chapter.title}
          </h1>

          {chapter.subtitle && (
            <p className="text-base sm:text-lg text-[#5D6B63] italic font-serif">
              {chapter.subtitle}
            </p>
          )}

          <div className="flex items-center justify-center sm:justify-start gap-3 pt-2 text-xs text-[#5D6B63]">
            <span className="font-semibold text-[#202A35]">{chapter.author}</span>
            <span>·</span>
            <span>{chapter.authorRole}</span>
          </div>
        </div>

        {/* Chapter Content Prose */}
        <article className="py-8 sm:py-12 space-y-6">
          {/* Drop Cap & Opening Paragraphs */}
          {chapter.content.map((paragraph, idx) => {
            if (idx === 0) {
              return (
                <p
                  key={idx}
                  className={`${fontClasses[fontSize]} text-[#202A35] first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#176B68] first-letter:float-left first-letter:mr-3 first-letter:mt-1`}
                >
                  {paragraph}
                </p>
              );
            }
            return (
              <p key={idx} className={`${fontClasses[fontSize]} text-[#202A35]`}>
                {paragraph}
              </p>
            );
          })}

          {/* Pull Quote if available */}
          {chapter.pullQuote && (
            <blockquote className="my-10 p-6 sm:p-8 rounded-2xl bg-[#E5ECE6]/60 border-y border-[#176B68]/30 text-center space-y-2">
              <p className="text-xl sm:text-2xl font-serif italic text-[#202A35] leading-relaxed">
                "{chapter.pullQuote}"
              </p>
            </blockquote>
          )}

          {/* Bullet points if available */}
          {chapter.bulletPoints && (
            <div className="my-6 p-6 rounded-2xl bg-white border border-[#202A35]/10 space-y-3">
              <h4 className="font-serif font-bold text-base text-[#176B68]">
                महत्त्वाचे मुख्य मुद्दे:
              </h4>
              <ul className="space-y-2 text-sm sm:text-base text-[#202A35]">
                {chapter.bulletPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#176B68] mt-2 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* INTERACTIVE SELF-ASSESSMENT COMPONENT (Chapter 10) */}
          {chapter.id === 'self-assessment' && (
            <div className="my-10 p-6 sm:p-8 rounded-2xl bg-white border-2 border-[#176B68]/30 shadow-md space-y-6">
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#176B68] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>संवादात्मक स्व-मूल्यमापन चाचणी</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#202A35]">
                  भावनिक लवचिकता व तणाव मोजणी (Resilience Scale)
                </h3>
                <p className="text-xs text-[#5D6B63]">
                  प्रत्येक विधानासाठी ० (कधीच नाही) ते ३ (नेहमी) यापैकी स्वतःला सर्वात जवळचा पर्याय निवडा.
                </p>
              </div>

              {/* Questions */}
              <div className="space-y-5 pt-2">
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
                  <div key={q.id} className="p-4 rounded-xl bg-[#F7F4EE] space-y-2.5">
                    <p className="text-sm sm:text-base font-semibold text-[#202A35]">{q.text}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
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
                          className={`py-2 px-2.5 rounded-lg border text-center transition-colors font-medium ${
                            quizAnswers[q.id] === opt.val
                              ? 'bg-[#176B68] text-white border-[#176B68] shadow-sm'
                              : 'bg-white text-[#202A35] border-slate-200 hover:border-[#176B68]'
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
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleCalculateQuiz}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#176B68] hover:bg-[#135855] text-white font-semibold text-sm transition-colors shadow-sm"
                >
                  माझा भावनिक स्कोअर व निष्कर्ष पहा
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setQuizAnswers({ 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 });
                    setAssessmentResult(null);
                  }}
                  className="text-xs text-[#5D6B63] hover:text-[#202A35] inline-flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>चाचणी पूर्ववत करा</span>
                </button>
              </div>

              {/* Result Card */}
              {assessmentResult && (
                <div className="p-5 rounded-xl bg-[#E5ECE6] border border-[#176B68]/30 space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#176B68]">
                      आपला निष्कर्ष (Score: {assessmentResult.score} / {assessmentResult.maxScore})
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#176B68] text-white">
                      {assessmentResult.level}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-lg text-[#202A35]">
                    {assessmentResult.title}
                  </h4>
                  <p className="text-sm text-[#202A35] leading-relaxed">
                    {assessmentResult.recommendation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Chapter Break Advertisement (Critical Requirement B) */}
          {(currentChapterIndex === 2 || currentChapterIndex === 6) && (
            <AdvertisementBanner placement="magazine-break" />
          )}
        </article>

        {/* Chapter Navigation Bottom Bar */}
        <div className="py-8 border-t border-[#202A35]/15 flex items-center justify-between gap-4">
          <button
            onClick={handlePrevChapter}
            disabled={currentChapterIndex === 0}
            className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-colors min-h-[46px] ${
              currentChapterIndex === 0
                ? 'opacity-40 cursor-not-allowed border-slate-200 text-[#5D6B63]'
                : 'border-[#202A35]/20 text-[#202A35] hover:bg-[#E5ECE6]'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>मागील प्रकरण</span>
          </button>

          <span className="text-xs text-[#5D6B63] font-medium hidden sm:inline">
            प्रकरण {currentChapterIndex + 1} पैकी {chapters.length}
          </span>

          <button
            onClick={handleNextChapter}
            disabled={currentChapterIndex === chapters.length - 1}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-colors min-h-[46px] ${
              currentChapterIndex === chapters.length - 1
                ? 'opacity-40 cursor-not-allowed bg-slate-200 text-[#5D6B63]'
                : 'bg-[#176B68] hover:bg-[#135855] text-white shadow-sm'
            }`}
          >
            <span>पुढील प्रकरण</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chapter Sidebar / Drawer */}
      {sidebarOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm"
        >
          <div className="bg-[#F7F4EE] w-full max-w-md h-full shadow-2xl flex flex-col border-l border-[#202A35]/15 animate-fadeIn">
            <div className="p-5 border-b border-[#202A35]/10 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#176B68]" />
                <h3 className="font-serif font-bold text-lg text-[#202A35]">
                  अंकाची अनुक्रमणिका
                </h3>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                aria-label="सूची बंद करा"
                className="p-1.5 rounded-lg hover:bg-black/5 text-[#5D6B63]"
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
                  className={`w-full text-left p-3 rounded-xl transition-colors flex items-start gap-3 min-h-[46px] ${
                    currentChapterIndex === idx
                      ? 'bg-[#176B68] text-white font-semibold shadow-sm'
                      : 'hover:bg-[#E5ECE6] text-[#202A35]'
                  }`}
                >
                  <span
                    className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                      currentChapterIndex === idx ? 'bg-white/20 text-white' : 'text-[#5D6B63]'
                    }`}
                  >
                    {idx + 1 < 10 ? `०${idx + 1}` : idx + 1}
                  </span>
                  <div className="space-y-0.5 flex-1">
                    <p className="text-sm font-serif leading-snug line-clamp-1">{ch.title}</p>
                    <p
                      className={`text-[11px] ${
                        currentChapterIndex === idx ? 'text-white/80' : 'text-[#5D6B63]'
                      }`}
                    >
                      {ch.category} · {ch.readTime}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <div className="p-4 border-t border-[#202A35]/10 bg-white space-y-2">
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  onToggleBookmark(currentPub.id);
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-[#176B68] text-[#176B68] font-semibold text-xs hover:bg-[#176B68] hover:text-white transition-colors flex items-center justify-center gap-2"
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

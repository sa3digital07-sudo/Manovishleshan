import React, { useState } from 'react';
import { PageView, UserAccount, Publication } from '../types';
import { Menu, X, Search, Bookmark, User, BookOpen, ChevronRight, Phone, Mail } from 'lucide-react';

interface HeaderProps {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  user: UserAccount;
  onOpenAccount: () => void;
  onOpenSearch: () => void;
  onRequestRead?: (pub?: Publication) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  user,
  onOpenAccount,
  onOpenSearch,
  onRequestRead,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageView) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCurrentActive = (page: PageView) => {
    if (page === 'home' && currentPage === 'home') return true;
    if (page === 'publications' && (currentPage === 'publications' || currentPage === 'publication-detail')) return true;
    if (page === 'articles' && (currentPage === 'articles' || currentPage === 'article-detail')) return true;
    if (page === 'directory' && (currentPage === 'directory' || currentPage === 'experts')) return true;
    if (page === 'qa' && currentPage === 'qa') return true;
    if (page === 'about' && (currentPage === 'about' || currentPage === 'authors' || currentPage === 'faq')) return true;
    if (page === 'contact' && currentPage === 'contact') return true;
    return false;
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E4E9EF] shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4 h-16 sm:h-20">
            {/* Zone 1: Brand Wordmark with Emblem Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 sm:gap-3 text-left focus-visible:outline-2 focus-visible:outline-[#245A91] group shrink-0 min-w-0"
              aria-label="मासिक मनोविश्लेषण मुख्यपृष्ठ"
            >
              <img
                src="/assets/aistudio/Logo_5109781a.jpeg"
                alt="मासिक मनोविश्लेषण बोधचिन्ह"
                onError={(e) => {
                  // Fallback alias if path differs
                  const target = e.currentTarget;
                  if (!target.src.includes('logo.jpeg')) {
                    target.src = '/logo.jpeg';
                  }
                }}
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover border border-[#E4E9EF] shadow-xs shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] sm:text-xs font-semibold text-[#626D79] leading-none tracking-wide">
                  मासिक
                </span>
                <span className="text-lg sm:text-2xl font-bold tracking-tight text-[#245A91] group-hover:text-[#1D4875] leading-tight truncate">
                  मनोविश्लेषण
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#718096] leading-none hidden sm:block">
                  मानवी मनाचा शोध घेणारे
                </span>
              </div>
            </button>

            {/* Zone 2: Desktop Navigation Links (Website A Editorial Simplicity) */}
            <nav
              aria-label="मुख्य सूची"
              className="hidden lg:flex items-center gap-5 xl:gap-7 text-[15px] font-medium text-[#4A5568]"
            >
              <button
                onClick={() => handleNavClick('home')}
                className={`py-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-[#245A91] ${
                  isCurrentActive('home')
                    ? 'text-[#245A91] font-bold border-b-2 border-[#245A91]'
                    : ''
                }`}
              >
                मुख्यपृष्ठ
              </button>

              <button
                onClick={() => handleNavClick('publications')}
                className={`py-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-[#245A91] ${
                  isCurrentActive('publications')
                    ? 'text-[#245A91] font-bold border-b-2 border-[#245A91]'
                    : ''
                }`}
              >
                मासिक अंक
              </button>

              <button
                onClick={() => handleNavClick('articles')}
                className={`py-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-[#245A91] ${
                  isCurrentActive('articles')
                    ? 'text-[#245A91] font-bold border-b-2 border-[#245A91]'
                    : ''
                }`}
              >
                लेख
              </button>

              <button
                onClick={() => handleNavClick('directory')}
                className={`py-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-[#245A91] ${
                  isCurrentActive('directory')
                    ? 'text-[#245A91] font-bold border-b-2 border-[#245A91]'
                    : ''
                }`}
              >
                तज्ज्ञ
              </button>

              <button
                onClick={() => handleNavClick('qa')}
                className={`py-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-[#245A91] ${
                  isCurrentActive('qa')
                    ? 'text-[#245A91] font-bold border-b-2 border-[#245A91]'
                    : ''
                }`}
              >
                प्रश्नोत्तरे
              </button>

              <button
                onClick={() => handleNavClick('about')}
                className={`py-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-[#245A91] ${
                  isCurrentActive('about')
                    ? 'text-[#245A91] font-bold border-b-2 border-[#245A91]'
                    : ''
                }`}
              >
                आमच्याविषयी
              </button>

              <button
                onClick={() => handleNavClick('contact')}
                className={`py-1.5 transition-colors whitespace-nowrap shrink-0 hover:text-[#245A91] ${
                  isCurrentActive('contact')
                    ? 'text-[#245A91] font-bold border-b-2 border-[#245A91]'
                    : ''
                }`}
              >
                संपर्क
              </button>
            </nav>

            {/* Zone 3: Actions (Search, Reader CTA, Account, Hamburger) */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              {/* Search Button (Retained on all screen sizes per requirement) */}
              <button
                type="button"
                onClick={onOpenSearch}
                aria-label="शोध"
                className="p-2 sm:p-2.5 text-[#4A5568] hover:text-[#245A91] hover:bg-[#F5F7FA] rounded-full transition-colors flex items-center justify-center min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] focus-visible:outline-2 focus-visible:outline-[#245A91]"
              >
                <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>

              {/* Website A's Prominent Yellow Primary CTA (Shown on md+ screens to preserve mobile header space) */}
              <button
                type="button"
                onClick={() => onRequestRead?.()}
                className="hidden md:inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-[#F2C14E] hover:bg-[#E5B542] text-[#20354D] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-xs hover:shadow-sm border border-[#E5B542]/60 min-h-[38px] sm:min-h-[40px] shrink-0"
              >
                <BookOpen className="w-4 h-4 text-[#20354D]" />
                <span>सध्याचा अंक वाचा</span>
              </button>

              {/* User Account / Bookmarks */}
              <button
                type="button"
                onClick={onOpenAccount}
                aria-label="खाते आणि जतन केलेले लेख"
                className="p-2 sm:px-2.5 py-2 text-[#4A5568] hover:text-[#245A91] hover:bg-[#F5F7FA] rounded-full border border-[#E4E9EF] transition-colors flex items-center justify-center gap-1.5 min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] focus-visible:outline-2 focus-visible:outline-[#245A91]"
              >
                <User className="w-4 h-4" />
                {user.bookmarks.length > 0 && (
                  <span className="px-1.5 py-0.2 text-[10px] bg-[#245A91] text-white rounded-full font-bold">
                    {user.bookmarks.length}
                  </span>
                )}
              </button>

              {/* Mobile Menu Trigger (Retained on mobile per requirement) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'मेनू बंद करा' : 'मेनू उघडा'}
                className="lg:hidden p-2 text-[#20354D] hover:bg-[#F5F7FA] rounded-lg min-h-[36px] min-w-[36px] sm:min-h-[40px] sm:min-w-[40px] flex items-center justify-center border border-[#E4E9EF] focus-visible:outline-2 focus-visible:outline-[#245A91]"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#E4E9EF] px-4 pt-3 pb-6 space-y-4 shadow-xl animate-fadeIn max-h-[85vh] overflow-y-auto">
            {/* Prominent CTA in Mobile Menu */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestRead?.();
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#F2C14E] hover:bg-[#E5B542] text-[#20354D] font-bold text-sm tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 border border-[#E5B542]/60"
              >
                <BookOpen className="w-4 h-4 text-[#20354D]" />
                <span>सध्याचा अंक वाचा (Read Latest Issue)</span>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1">
              <button
                onClick={() => handleNavClick('home')}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium min-h-[44px] flex items-center justify-between ${
                  currentPage === 'home' ? 'bg-[#EBF3FA] text-[#245A91] font-bold' : 'text-[#252D38]'
                }`}
              >
                <span>मुख्यपृष्ठ</span>
                <ChevronRight className="w-4 h-4 opacity-40" />
              </button>
              <button
                onClick={() => handleNavClick('publications')}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium min-h-[44px] flex items-center justify-between ${
                  currentPage === 'publications' || currentPage === 'publication-detail'
                    ? 'bg-[#EBF3FA] text-[#245A91] font-bold'
                    : 'text-[#252D38]'
                }`}
              >
                <span>मासिक अंक व विशेषांक</span>
                <ChevronRight className="w-4 h-4 opacity-40" />
              </button>
              <button
                onClick={() => handleNavClick('articles')}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium min-h-[44px] flex items-center justify-between ${
                  currentPage === 'articles' || currentPage === 'article-detail'
                    ? 'bg-[#EBF3FA] text-[#245A91] font-bold'
                    : 'text-[#252D38]'
                }`}
              >
                <span>मानसशास्त्र लेख व संशोधन</span>
                <ChevronRight className="w-4 h-4 opacity-40" />
              </button>
              <button
                onClick={() => handleNavClick('directory')}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium min-h-[44px] flex items-center justify-between ${
                  currentPage === 'directory' ? 'bg-[#EBF3FA] text-[#245A91] font-bold' : 'text-[#252D38]'
                }`}
              >
                <span>तज्ज्ञ निर्देशिका (Directory)</span>
                <ChevronRight className="w-4 h-4 opacity-40" />
              </button>
              <button
                onClick={() => handleNavClick('experts')}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium min-h-[44px] flex items-center justify-between ${
                  currentPage === 'experts' ? 'bg-[#EBF3FA] text-[#245A91] font-bold' : 'text-[#252D38]'
                }`}
              >
                <span>तज्ज्ञ मंडळ (Expert Panel)</span>
                <ChevronRight className="w-4 h-4 opacity-40" />
              </button>
              <button
                onClick={() => handleNavClick('qa')}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium min-h-[44px] flex items-center justify-between ${
                  currentPage === 'qa' ? 'bg-[#EBF3FA] text-[#245A91] font-bold' : 'text-[#252D38]'
                }`}
              >
                <span>वाचक प्रश्नोत्तरे</span>
                <ChevronRight className="w-4 h-4 opacity-40" />
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium min-h-[44px] flex items-center justify-between ${
                  currentPage === 'about' ? 'bg-[#EBF3FA] text-[#245A91] font-bold' : 'text-[#252D38]'
                }`}
              >
                <span>आमच्याविषयी (About Us)</span>
                <ChevronRight className="w-4 h-4 opacity-40" />
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium min-h-[44px] flex items-center justify-between ${
                  currentPage === 'contact' ? 'bg-[#EBF3FA] text-[#245A91] font-bold' : 'text-[#252D38]'
                }`}
              >
                <span>संपर्क आणि नोंदणी</span>
                <ChevronRight className="w-4 h-4 opacity-40" />
              </button>
            </div>

            {/* Quick Contacts inside Drawer */}
            <div className="pt-2 border-t border-[#E4E9EF] text-xs text-[#626D79] space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#245A91]" />
                <span>+९१ ९८५०८८१२८६ / +९१ ९८५०९५७७५७</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#245A91]" />
                <span>manovishleshanjalna@gmail.com</span>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

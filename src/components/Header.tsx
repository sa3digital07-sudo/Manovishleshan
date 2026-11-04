import React, { useState } from 'react';
import { PageView, UserAccount } from '../types';
import { Menu, X, Search, Bookmark, User, BookOpen } from 'lucide-react';

interface HeaderProps {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  user: UserAccount;
  onOpenAccount: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  user,
  onOpenAccount,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageView) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F7F4EE]/95 backdrop-blur-md border-b border-[#202A35]/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6 h-18">
            {/* Zone 1: Brand Wordmark with Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#176B68] hover:text-[#135855] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#176B68]"
            >
              <img
                src="/assets/aistudio/Logo_5109781a.jpeg"
                alt="मासिक मनोविश्लेषण बोधचिन्ह"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-[#176B68]/20 shadow-xs shrink-0"
              />
              <span className="truncate">मासिक मनोविश्लेषण</span>
            </button>

            {/* Zone 2: 5 Concise Single-Line Navigation Links */}
            <nav
              aria-label="मुख्य सूची"
              className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-[#202A35]"
            >
              <button
                onClick={() => handleNavClick('publications')}
                className={`py-1 transition-colors whitespace-nowrap shrink-0 hover:text-[#176B68] relative ${
                  currentPage === 'publications' || currentPage === 'publication-detail' || currentPage === 'reader'
                    ? 'text-[#176B68] font-semibold border-b-2 border-[#176B68]'
                    : ''
                }`}
              >
                प्रकाशने
              </button>

              <button
                onClick={() => handleNavClick('articles')}
                className={`py-1 transition-colors whitespace-nowrap shrink-0 hover:text-[#176B68] relative ${
                  currentPage === 'articles' || currentPage === 'article-detail'
                    ? 'text-[#176B68] font-semibold border-b-2 border-[#176B68]'
                    : ''
                }`}
              >
                लेख संग्रह
              </button>

              <button
                onClick={() => handleNavClick('directory')}
                className={`py-1 transition-colors whitespace-nowrap shrink-0 hover:text-[#176B68] relative ${
                  currentPage === 'directory'
                    ? 'text-[#176B68] font-semibold border-b-2 border-[#176B68]'
                    : ''
                }`}
              >
                तज्ज्ञ मार्गदर्शिका
              </button>

              <button
                onClick={() => handleNavClick('qa')}
                className={`py-1 transition-colors whitespace-nowrap shrink-0 hover:text-[#176B68] relative ${
                  currentPage === 'qa'
                    ? 'text-[#176B68] font-semibold border-b-2 border-[#176B68]'
                    : ''
                }`}
              >
                प्रश्नोत्तरे
              </button>

              <button
                onClick={() => handleNavClick('about')}
                className={`py-1 transition-colors whitespace-nowrap shrink-0 hover:text-[#176B68] relative ${
                  currentPage === 'about'
                    ? 'text-[#176B68] font-semibold border-b-2 border-[#176B68]'
                    : ''
                }`}
              >
                आमच्याबद्दल
              </button>
            </nav>

            {/* Zone 3: 1 Primary Action & Utilities */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={onOpenSearch}
                aria-label="शोधा"
                className="p-2 sm:px-3 sm:py-2 text-sm text-[#202A35] hover:text-[#176B68] hover:bg-[#E5ECE6]/60 rounded-lg transition-colors flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#176B68] min-h-[40px] min-w-[40px] justify-center"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline text-xs font-medium">शोधा</span>
              </button>

              <button
                type="button"
                onClick={onOpenAccount}
                className="inline-flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#176B68] hover:bg-[#135855] rounded-lg transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-[#202A35] min-h-[40px] whitespace-nowrap shrink-0"
              >
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">
                  {user.isLoggedIn ? user.name.split(' ')[0] : 'खाते / लॉगिन'}
                </span>
                <span className="sm:hidden">खाते</span>
                {user.bookmarks.length > 0 && (
                  <span className="ml-0.5 px-1.5 py-0.2 text-[10px] bg-[#D7B56D] text-[#202A35] rounded-full font-bold">
                    {user.bookmarks.length}
                  </span>
                )}
              </button>

              {/* Mobile Menu Trigger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'मेनू बंद करा' : 'मेनू उघडा'}
                className="lg:hidden p-2 text-[#202A35] hover:bg-[#E5ECE6]/60 rounded-lg min-h-[40px] min-w-[40px] flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[#176B68]"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F7F4EE] border-b border-[#202A35]/10 px-4 pt-3 pb-6 space-y-2 animate-fadeIn shadow-lg">
            <div className="space-y-1">
              <button
                onClick={() => handleNavClick('home')}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium min-h-[46px] flex items-center justify-between ${
                  currentPage === 'home' ? 'bg-[#E5ECE6] text-[#176B68] font-bold' : 'text-[#202A35]'
                }`}
              >
                <span>मुखपृष्ठ</span>
              </button>
              <button
                onClick={() => handleNavClick('publications')}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium min-h-[46px] flex items-center justify-between ${
                  currentPage === 'publications' ? 'bg-[#E5ECE6] text-[#176B68] font-bold' : 'text-[#202A35]'
                }`}
              >
                <span>प्रकाशने व विशेषांक</span>
                <BookOpen className="w-4 h-4 text-[#5D6B63]" />
              </button>
              <button
                onClick={() => handleNavClick('articles')}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium min-h-[46px] flex items-center justify-between ${
                  currentPage === 'articles' ? 'bg-[#E5ECE6] text-[#176B68] font-bold' : 'text-[#202A35]'
                }`}
              >
                <span>लेख संग्रह</span>
              </button>
              <button
                onClick={() => handleNavClick('directory')}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium min-h-[46px] flex items-center justify-between ${
                  currentPage === 'directory' ? 'bg-[#E5ECE6] text-[#176B68] font-bold' : 'text-[#202A35]'
                }`}
              >
                <span>तज्ज्ञ मार्गदर्शिका</span>
              </button>
              <button
                onClick={() => handleNavClick('qa')}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium min-h-[46px] flex items-center justify-between ${
                  currentPage === 'qa' ? 'bg-[#E5ECE6] text-[#176B68] font-bold' : 'text-[#202A35]'
                }`}
              >
                <span>वाचक प्रश्नोत्तरे</span>
              </button>
              <button
                onClick={() => handleNavClick('authors')}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium min-h-[46px] flex items-center justify-between ${
                  currentPage === 'authors' ? 'bg-[#E5ECE6] text-[#176B68] font-bold' : 'text-[#202A35]'
                }`}
              >
                <span>लेखक व संशोधक</span>
              </button>
              <button
                onClick={() => handleNavClick('experts')}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium min-h-[46px] flex items-center justify-between ${
                  currentPage === 'experts' ? 'bg-[#E5ECE6] text-[#176B68] font-bold' : 'text-[#202A35]'
                }`}
              >
                <span>तज्ज्ञ मंडळ</span>
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium min-h-[46px] flex items-center justify-between ${
                  currentPage === 'about' ? 'bg-[#E5ECE6] text-[#176B68] font-bold' : 'text-[#202A35]'
                }`}
              >
                <span>आमच्याबद्दल</span>
              </button>
              <button
                onClick={() => handleNavClick('faq')}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium min-h-[46px] flex items-center justify-between ${
                  currentPage === 'faq' ? 'bg-[#E5ECE6] text-[#176B68] font-bold' : 'text-[#202A35]'
                }`}
              >
                <span>वारंवार विचारले जाणारे प्रश्न (FAQ)</span>
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium min-h-[46px] flex items-center justify-between ${
                  currentPage === 'contact' ? 'bg-[#E5ECE6] text-[#176B68] font-bold' : 'text-[#202A35]'
                }`}
              >
                <span>संपर्क व लेख योगदान</span>
              </button>
            </div>

            <div className="pt-3 border-t border-[#202A35]/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-[#202A35]/20 text-sm font-medium text-[#202A35] min-h-[46px]"
              >
                <Search className="w-4 h-4" />
                <span>लेख व अंक शोधा</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAccount();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#176B68] text-white text-sm font-semibold min-h-[46px]"
              >
                <Bookmark className="w-4 h-4" />
                <span>माझे जतन केलेले लेख ({user.bookmarks.length})</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

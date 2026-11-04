/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageView, Publication, Article, UserAccount } from './types';
import { PUBLICATIONS_DATA, ARTICLES_DATA } from './data/mockData';
import { toggleBookmark } from './utils/magazineLogic';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { AccountModal } from './components/AccountModal';

// Views
import { HomeView } from './views/HomeView';
import { PublicationsView } from './views/PublicationsView';
import { PublicationDetailView } from './views/PublicationDetailView';
import { MagazineReaderView } from './views/MagazineReaderView';
import { ArticlesView } from './views/ArticlesView';
import { ArticleDetailView } from './views/ArticleDetailView';
import { AuthorsView } from './views/AuthorsView';
import { ExpertsView } from './views/ExpertsView';
import { DirectoryView } from './views/DirectoryView';
import { QuestionsView } from './views/QuestionsView';
import { AboutView } from './views/AboutView';
import { FaqView } from './views/FaqView';
import { ContactView } from './views/ContactView';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedPublication, setSelectedPublication] = useState<Publication>(PUBLICATIONS_DATA[0]);
  const [selectedArticle, setSelectedArticle] = useState<Article>(ARTICLES_DATA[0]);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  // Publication reader gate state
  const [pendingPublication, setPendingPublication] = useState<Publication | null>(null);
  const [gateNotice, setGateNotice] = useState<string | null>(null);

  // User account state (starts logged out per requirements so gating works as expected)
  const [user, setUser] = useState<UserAccount>({
    isLoggedIn: false,
    name: 'अनिकेत देशमुख',
    email: 'aniket.deshmukh@example.com',
    memberSince: '२०२६',
    bookmarks: ['edition-stones-balance', 'art-1'],
  });

  const handleToggleBookmark = (id: string) => {
    setUser((prev) => ({
      ...prev,
      bookmarks: toggleBookmark(prev.bookmarks, id),
    }));
  };

  const handleSelectPublication = (pub: Publication) => {
    setSelectedPublication(pub);
    setCurrentPage('publication-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (art: Article) => {
    setSelectedArticle(art);
    setCurrentPage('article-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Direct Reader Gate Handler
  const handleRequestRead = (pub?: Publication) => {
    const target = pub || selectedPublication || PUBLICATIONS_DATA[0];

    if (user.isLoggedIn) {
      setSelectedPublication(target);
      setCurrentPage('reader');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // User is logged out: preserve selected publication and open account modal with notice
      setPendingPublication(target);
      setGateNotice(`अंक "${target.title}" वाचण्यासाठी कृपया लॉगिन करा किंवा नवीन नोंदणी करा.`);
      setAccountModalOpen(true);
    }
  };

  // Called when login or registration succeeds
  const handleLoginSuccess = () => {
    setAccountModalOpen(false);
    if (pendingPublication) {
      const target = pendingPublication;
      setPendingPublication(null);
      setGateNotice(null);
      setSelectedPublication(target);
      setCurrentPage('reader');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#252D38] flex flex-col font-sans selection:bg-[#245A91] selection:text-white">
      {/* Top Header adhering to Website A Design Direction & Requirements */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        user={user}
        onOpenAccount={() => {
          setGateNotice(null);
          setAccountModalOpen(true);
        }}
        onOpenSearch={() => setSearchModalOpen(true)}
        onRequestRead={() => handleRequestRead(selectedPublication)}
      />

      {/* Main Container */}
      <main className={`flex-1 w-full ${currentPage === 'reader' ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8'}`}>
        {currentPage === 'home' && (
          <HomeView
            setCurrentPage={setCurrentPage}
            onSelectPublication={handleSelectPublication}
            onSelectArticle={handleSelectArticle}
            onOpenReader={() => handleRequestRead(selectedPublication)}
            onRequestRead={handleRequestRead}
          />
        )}

        {currentPage === 'publications' && (
          <PublicationsView
            setCurrentPage={setCurrentPage}
            onSelectPublication={handleSelectPublication}
            onRequestRead={handleRequestRead}
          />
        )}

        {currentPage === 'publication-detail' && (
          <PublicationDetailView
            publication={selectedPublication}
            setCurrentPage={setCurrentPage}
            user={user}
            onToggleBookmark={handleToggleBookmark}
            onOpenReader={() => handleRequestRead(selectedPublication)}
            onOpenAccount={() => {
              setGateNotice(null);
              setAccountModalOpen(true);
            }}
          />
        )}

        {currentPage === 'reader' && (
          <MagazineReaderView
            setCurrentPage={setCurrentPage}
            user={user}
            onToggleBookmark={handleToggleBookmark}
            onOpenAccount={() => {
              setGateNotice(null);
              setAccountModalOpen(true);
            }}
          />
        )}

        {currentPage === 'articles' && (
          <ArticlesView
            setCurrentPage={setCurrentPage}
            onSelectArticle={handleSelectArticle}
          />
        )}

        {currentPage === 'article-detail' && (
          <ArticleDetailView
            article={selectedArticle}
            setCurrentPage={setCurrentPage}
            onSelectArticle={handleSelectArticle}
            user={user}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {currentPage === 'authors' && <AuthorsView setCurrentPage={setCurrentPage} />}

        {currentPage === 'experts' && <ExpertsView setCurrentPage={setCurrentPage} />}

        {currentPage === 'directory' && <DirectoryView setCurrentPage={setCurrentPage} />}

        {currentPage === 'qa' && <QuestionsView setCurrentPage={setCurrentPage} />}

        {currentPage === 'about' && <AboutView setCurrentPage={setCurrentPage} />}

        {currentPage === 'faq' && <FaqView setCurrentPage={setCurrentPage} />}

        {currentPage === 'contact' && <ContactView setCurrentPage={setCurrentPage} />}
      </main>

      {/* Editorial Footer */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectPublication={handleSelectPublication}
        onSelectArticle={handleSelectArticle}
        setCurrentPage={setCurrentPage}
      />

      {/* Account / Bookmarks Modal with 2-Option Login & 5-Field Mandatory Registration */}
      <AccountModal
        isOpen={accountModalOpen}
        onClose={() => {
          setAccountModalOpen(false);
          setGateNotice(null);
        }}
        user={user}
        setUser={setUser}
        onOpenPublication={handleSelectPublication}
        onOpenArticle={handleSelectArticle}
        gateNotice={gateNotice}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

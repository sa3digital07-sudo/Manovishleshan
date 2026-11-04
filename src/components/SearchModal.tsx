import React, { useState, useEffect, useRef } from 'react';
import { PageView, Publication, Article } from '../types';
import { PUBLICATIONS_DATA, ARTICLES_DATA, PROFESSIONALS_DIRECTORY } from '../data/mockData';
import { Search, X, BookOpen, FileText, UserCheck, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPublication: (pub: Publication) => void;
  onSelectArticle: (article: Article) => void;
  setCurrentPage: (page: PageView) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPublication,
  onSelectArticle,
  setCurrentPage,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const normalizedQuery = query.trim().toLowerCase();

  const matchedPubs = normalizedQuery
    ? PUBLICATIONS_DATA.filter(
        (p) =>
          p.title.toLowerCase().includes(normalizedQuery) ||
          p.subtitle.toLowerCase().includes(normalizedQuery) ||
          p.description.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const matchedArticles = normalizedQuery
    ? ARTICLES_DATA.filter(
        (a) =>
          a.title.toLowerCase().includes(normalizedQuery) ||
          a.summary.toLowerCase().includes(normalizedQuery) ||
          a.author.toLowerCase().includes(normalizedQuery) ||
          a.tags.some((t) => t.toLowerCase().includes(normalizedQuery))
      )
    : [];

  const matchedProfessionals = normalizedQuery
    ? PROFESSIONALS_DIRECTORY.filter(
        (p) =>
          p.name.toLowerCase().includes(normalizedQuery) ||
          p.city.toLowerCase().includes(normalizedQuery) ||
          p.specialization.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const totalResults =
    matchedPubs.length + matchedArticles.length + matchedProfessionals.length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-xs animate-fadeIn"
    >
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#E4E9EF] overflow-hidden flex flex-col max-h-[80vh]">
        {/* Header Search Input */}
        <div className="p-4 sm:p-5 border-b border-[#E4E9EF] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#245A91] shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="अंक, लेख, विषय किंवा तज्ज्ञ शोधा (उदा. ताणतणाव, मन, ध्यान)..."
            className="flex-1 bg-transparent text-[#252D38] text-base placeholder-[#626D79]/60 focus:outline-none"
          />
          <button
            onClick={onClose}
            aria-label="शोध बंद करा"
            className="p-1.5 rounded-lg hover:bg-[#F5F7FA] text-[#626D79] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {!query.trim() ? (
            <div className="text-center py-8 space-y-3">
              <p className="text-sm text-[#626D79]">
                मासिक अंक, संशोधनात्मक लेख किंवा मानसिक स्वास्थ्य तज्ज्ञ शोधण्यासाठी वरील चौकटीत टाईप करा.
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {['लवचिकता', 'अतिविचार', 'नातेसंबंध', 'ध्यान', 'पालकत्व'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1 text-xs rounded-full bg-[#EBF3FA] text-[#245A91] font-semibold hover:bg-[#245A91] hover:text-white transition-colors"
                  >
                    #{term}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-8">
              <p className="text-[#252D38] font-bold text-lg">काहीही आढळले नाही</p>
              <p className="text-xs text-[#626D79] mt-1">
                "{query}" या शब्दासाठी कोणतीही माहिती उपलब्ध नाही. इतर शब्द वापरून पहा.
              </p>
            </div>
          ) : (
            <>
              {/* Matched Publications */}
              {matchedPubs.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#245A91] flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>मासिक अंक व पुस्तके ({matchedPubs.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {matchedPubs.map((pub) => (
                      <button
                        key={pub.id}
                        onClick={() => {
                          onSelectPublication(pub);
                          onClose();
                        }}
                        className="w-full text-left p-3.5 rounded-xl bg-[#F5F7FA] hover:bg-[#EBF3FA] border border-[#E4E9EF] flex items-center justify-between gap-4 transition-colors group"
                      >
                        <div className="space-y-0.5">
                          <p className="font-bold text-sm text-[#252D38] group-hover:text-[#245A91]">
                            {pub.title}
                          </p>
                          <p className="text-xs text-[#626D79] line-clamp-1">{pub.subtitle}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#626D79] group-hover:translate-x-1 group-hover:text-[#245A91] transition-all shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Articles */}
              {matchedArticles.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D97706] flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>लेख ({matchedArticles.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {matchedArticles.map((art) => (
                      <button
                        key={art.id}
                        onClick={() => {
                          onSelectArticle(art);
                          onClose();
                        }}
                        className="w-full text-left p-3.5 rounded-xl bg-[#F5F7FA] hover:bg-[#EBF3FA] border border-[#E4E9EF] flex items-center justify-between gap-4 transition-colors group"
                      >
                        <div className="space-y-0.5">
                          <p className="font-bold text-sm text-[#252D38] group-hover:text-[#245A91]">
                            {art.title}
                          </p>
                          <p className="text-xs text-[#626D79]">
                            {art.author} · {art.readTime}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#626D79] group-hover:translate-x-1 group-hover:text-[#245A91] transition-all shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Professionals */}
              {matchedProfessionals.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#245A91] flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>तज्ज्ञ मार्गदर्शिका ({matchedProfessionals.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {matchedProfessionals.map((prof) => (
                      <button
                        key={prof.id}
                        onClick={() => {
                          setCurrentPage('directory');
                          onClose();
                        }}
                        className="w-full text-left p-3.5 rounded-xl bg-[#F5F7FA] hover:bg-[#EBF3FA] border border-[#E4E9EF] flex items-center justify-between gap-4 transition-colors group"
                      >
                        <div className="space-y-0.5">
                          <p className="font-bold text-sm text-[#252D38] group-hover:text-[#245A91]">
                            {prof.name}
                          </p>
                          <p className="text-xs text-[#626D79]">
                            {prof.role} · {prof.city} ({prof.area})
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#626D79] group-hover:translate-x-1 group-hover:text-[#245A91] transition-all shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

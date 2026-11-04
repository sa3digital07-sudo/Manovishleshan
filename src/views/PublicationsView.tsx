import React, { useState } from 'react';
import { PageView, Publication } from '../types';
import { PUBLICATIONS_DATA } from '../data/mockData';
import { filterPublications } from '../utils/magazineLogic';
import { AdvertisementBanner } from '../components/AdvertisementBanner';
import {
  Search,
  Calendar,
  Star,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface PublicationsViewProps {
  setCurrentPage: (page: PageView) => void;
  onSelectPublication: (pub: Publication) => void;
  onRequestRead?: (pub: Publication) => void;
}

export const PublicationsView: React.FC<PublicationsViewProps> = ({
  setCurrentPage,
  onSelectPublication,
  onRequestRead,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('सर्व');
  const [selectedYear, setSelectedYear] = useState<string>('सर्व');

  const filteredPublications = filterPublications(
    PUBLICATIONS_DATA,
    searchQuery,
    selectedCategory,
    selectedYear
  );

  const categories = ['सर्व', 'मासिक अंक', 'ई-पुस्तके', 'विशेष विशेषांक'];
  const years = ['सर्व', '2026', '2025'];

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Header Banner */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="h-0.5 w-6 bg-[#245A91]" />
          <span className="text-xs font-bold text-[#245A91] tracking-wider uppercase">
            ग्रंथालय व विशेषांक संग्रह
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#252D38] leading-tight">
          डिजिटल मासिक अंक आणि ई-पुस्तके
        </h1>
        <p className="text-sm sm:text-base text-[#626D79] leading-relaxed">
          मानसशास्त्र, आत्मसंवाद, पालकत्व आणि मानसिक स्वास्थ्य शिक्षणावरील आमची सर्व अधिकृत प्रकाशने येथे एकाच ठिकाणी उपलब्ध आहेत.
        </p>
      </div>

      {/* Filter and Search Ribbon */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E4E9EF] shadow-xs space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#626D79] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="अंकाचे नाव, विषय किंवा लेखक शोधा (उदा. लवचिकता, संवाद)..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#F5F7FA] border border-[#E4E9EF] text-sm text-[#252D38] placeholder-[#626D79]/60 focus:outline-none focus:border-[#245A91]"
          />
        </div>

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F5F7FA] rounded-xl text-xs font-semibold border border-[#E4E9EF]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#245A91] text-white shadow-xs font-bold'
                    : 'text-[#626D79] hover:text-[#252D38]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Year Filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#626D79] font-bold flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>वर्ष:</span>
            </span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-[#F5F7FA] border border-[#E4E9EF] text-xs text-[#252D38] font-semibold focus:outline-none focus:border-[#245A91]"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y === 'सर्व' ? 'सर्व वर्षे' : y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Publications Listing Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs text-[#626D79]">
          <span>
            उपलब्ध प्रकाशने: <strong className="text-[#252D38]">{filteredPublications.length}</strong>
          </span>
          {(searchQuery || selectedCategory !== 'सर्व' || selectedYear !== 'सर्व') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('सर्व');
                setSelectedYear('सर्व');
              }}
              className="text-[#DC2626] font-semibold hover:underline"
            >
              फिल्टर्स पूर्ववत करा
            </button>
          )}
        </div>

        {filteredPublications.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white border border-[#E4E9EF] space-y-3">
            <p className="font-bold text-lg text-[#252D38]">
              कोणतेही प्रकाशन आढळले नाही
            </p>
            <p className="text-xs text-[#626D79] max-w-sm mx-auto">
              आपण निवडलेल्या निकषांशी जुळणारे कोणतेही मासिक अंक किंवा ई-पुस्तक उपलब्ध नाही. कृपया इतर शब्द किंवा वर्गवारी निवडा.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPublications.map((pub) => (
              <div
                key={pub.id}
                onClick={() => onSelectPublication(pub)}
                className="bg-white rounded-2xl border border-[#E4E9EF] overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col cursor-pointer"
              >
                {/* Cover Image Container */}
                <div className="aspect-[4/3] bg-[#F5F7FA] overflow-hidden relative flex items-center justify-center p-3">
                  <img
                    src={pub.coverImage}
                    alt={pub.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 text-[11px] font-bold bg-white/95 text-[#245A91] rounded-md shadow-xs border border-[#E4E9EF]">
                      {pub.category}
                    </span>
                    {pub.featured && (
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-[#D97706] text-white rounded-md flex items-center gap-1 shadow-xs">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>विशेष</span>
                      </span>
                    )}
                  </div>
                  <span className="absolute bottom-3 right-3 px-2.5 py-0.5 text-[11px] font-semibold bg-[#20354D]/90 text-white rounded-md">
                    {pub.editionMonth}
                  </span>
                </div>

                {/* Content Box */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-lg text-[#252D38] group-hover:text-[#245A91] transition-colors leading-snug">
                      {pub.title}
                    </h3>
                    <p className="text-xs text-[#D97706] font-semibold">{pub.subtitle}</p>
                    <p className="text-xs text-[#626D79] line-clamp-3 leading-relaxed">
                      {pub.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E4E9EF] flex items-center justify-between text-xs text-[#626D79]">
                    <span className="flex items-center gap-1 text-[#F2C14E]">
                      <Star className="w-3.5 h-3.5 fill-[#F2C14E]" />
                      <strong className="text-[#252D38]">{pub.rating}</strong> ({pub.reviewsCount} परीक्षणे)
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onRequestRead) {
                            onRequestRead(pub);
                          } else {
                            onSelectPublication(pub);
                          }
                        }}
                        className="px-2.5 py-1 rounded-md bg-[#245A91] hover:bg-[#1E3A8A] text-white font-bold text-[11px] shadow-2xs transition-colors"
                      >
                        अंक वाचा
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AdvertisementBanner placement="publications" />
    </div>
  );
};

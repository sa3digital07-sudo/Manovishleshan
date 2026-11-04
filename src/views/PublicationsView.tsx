import React, { useState } from 'react';
import { PageView, Publication } from '../types';
import { PUBLICATIONS_DATA } from '../data/mockData';
import { filterPublications } from '../utils/magazineLogic';
import { AdvertisementBanner } from '../components/AdvertisementBanner';
import {
  Search,
  BookOpen,
  Filter,
  Calendar,
  Star,
  ArrowRight,
  BookMarked,
  Sparkles,
} from 'lucide-react';

interface PublicationsViewProps {
  setCurrentPage: (page: PageView) => void;
  onSelectPublication: (pub: Publication) => void;
}

export const PublicationsView: React.FC<PublicationsViewProps> = ({
  setCurrentPage,
  onSelectPublication,
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
    <div className="space-y-12">
      {/* Header Banner */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#176B68]">
          ग्रंथालय व विशेषांक संग्रह
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#202A35] leading-tight">
          डिजिटल मासिक अंक आणि ई-पुस्तके
        </h1>
        <p className="text-base sm:text-lg text-[#5D6B63] leading-relaxed">
          मानसशास्त्र, आत्मसंवाद, पालकत्व आणि मानसिक स्वास्थ्य शिक्षणावरील आमची सर्व अधिकृत प्रकाशने येथे एकाच ठिकाणी उपलब्ध आहेत.
        </p>
      </div>

      {/* Filter and Search Ribbon */}
      <div className="p-4 sm:p-6 rounded-2xl bg-white border border-[#202A35]/10 shadow-sm space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#5D6B63] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="अंकाचे नाव, विषय किंवा लेखक शोधा (उदा. लवचिकता, संवाद)..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#F7F4EE] border border-[#202A35]/15 text-sm sm:text-base text-[#202A35] placeholder-[#5D6B63]/60 focus:outline-none focus:border-[#176B68]"
          />
        </div>

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F7F4EE] rounded-xl text-xs font-semibold">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#176B68] text-white shadow-sm'
                    : 'text-[#5D6B63] hover:text-[#202A35]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Year Filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#5D6B63] font-semibold flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>वर्ष:</span>
            </span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-[#F7F4EE] border border-[#202A35]/15 text-xs text-[#202A35] font-semibold focus:outline-none focus:border-[#176B68]"
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
        <div className="flex items-center justify-between text-xs text-[#5D6B63]">
          <span>
            उपलब्ध प्रकाशने: <strong>{filteredPublications.length}</strong>
          </span>
          {(searchQuery || selectedCategory !== 'सर्व' || selectedYear !== 'सर्व') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('सर्व');
                setSelectedYear('सर्व');
              }}
              className="text-[#A64F35] font-semibold hover:underline"
            >
              फिल्टर्स पूर्ववत करा
            </button>
          )}
        </div>

        {filteredPublications.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white border border-[#202A35]/10 space-y-3">
            <p className="font-serif font-bold text-lg text-[#202A35]">
              कोणतेही प्रकाशन आढळले नाही
            </p>
            <p className="text-xs text-[#5D6B63] max-w-sm mx-auto">
              आपण निवडलेल्या निकषांशी जुळणारे कोणतेही मासिक अंक किंवा ई-पुस्तक उपलब्ध नाही. कृपया इतर शब्द किंवा वर्गवारी निवडा.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPublications.map((pub) => (
              <div
                key={pub.id}
                onClick={() => onSelectPublication(pub)}
                className="bg-white rounded-2xl border border-[#202A35]/10 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col cursor-pointer"
              >
                {/* Cover Image Container */}
                <div className="aspect-[4/3] bg-[#E5ECE6] overflow-hidden relative">
                  <img
                    src={pub.coverImage}
                    alt={pub.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 text-[11px] font-semibold bg-white/95 text-[#202A35] rounded-md shadow-sm">
                      {pub.category}
                    </span>
                    {pub.featured && (
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-[#A64F35] text-white rounded-md flex items-center gap-1 shadow-sm">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>विशेष</span>
                      </span>
                    )}
                  </div>
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 text-[11px] font-semibold bg-black/70 text-white rounded-md">
                    {pub.editionMonth}
                  </span>
                </div>

                {/* Content Box */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-xl text-[#202A35] group-hover:text-[#176B68] transition-colors leading-snug">
                      {pub.title}
                    </h3>
                    <p className="text-xs font-serif italic text-[#A64F35]">{pub.subtitle}</p>
                    <p className="text-xs text-[#5D6B63] line-clamp-3 leading-relaxed">
                      {pub.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#5D6B63]">
                    <span className="flex items-center gap-1 text-[#D7B56D]">
                      <Star className="w-3.5 h-3.5 fill-[#D7B56D]" />
                      <strong className="text-[#202A35]">{pub.rating}</strong> ({pub.reviewsCount} परीक्षणे)
                    </span>
                    <span className="font-semibold text-[#176B68] group-hover:underline inline-flex items-center gap-1">
                      <span>वाचा व तपशील</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Critical Requirement B: Publications Advertisement Placement */}
      <AdvertisementBanner placement="publications" />
    </div>
  );
};

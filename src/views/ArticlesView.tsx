import React, { useState } from 'react';
import { PageView, Article } from '../types';
import { ARTICLES_DATA } from '../data/mockData';
import { filterArticles } from '../utils/magazineLogic';
import { AdvertisementBanner } from '../components/AdvertisementBanner';
import { Search, Clock, ArrowRight, Tag, BookMarked } from 'lucide-react';

interface ArticlesViewProps {
  setCurrentPage: (page: PageView) => void;
  onSelectArticle: (art: Article) => void;
}

export const ArticlesView: React.FC<ArticlesViewProps> = ({
  setCurrentPage,
  onSelectArticle,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('सर्व');

  const categories = [
    'सर्व',
    'मानसिक स्वास्थ्य',
    'नातेसंबंध',
    'पालकत्व व मुले',
    'मानसशास्त्र विचार',
  ];

  const filteredArticles = filterArticles(ARTICLES_DATA, searchQuery, selectedCategory);
  const featuredArticle = ARTICLES_DATA.find((a) => a.featured) || ARTICLES_DATA[0];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#A64F35]">
          संशोधन व विचार लेख
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#202A35] leading-tight">
          मानसशास्त्र आणि जीवनशैली लेख संग्रह
        </h1>
        <p className="text-base sm:text-lg text-[#5D6B63] leading-relaxed">
          मानवी मन, भावना, नातेसंबंध आणि मेंदूच्या कार्यावर प्रकाश टाकणारे शास्त्रीय व विचारप्रवर्तक मराठी लेख.
        </p>
      </div>

      {/* Featured Big Article Showcase */}
      {featuredArticle && !searchQuery && selectedCategory === 'सर्व' && (
        <div
          onClick={() => onSelectArticle(featuredArticle)}
          className="rounded-3xl bg-white border border-[#202A35]/10 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden bg-[#E5ECE6]">
              <img
                src={featuredArticle.coverImage}
                alt={featuredArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#176B68]">
                  <span>संपादक निवड लेख</span>
                  <span>·</span>
                  <span>{featuredArticle.readTime}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#202A35] group-hover:text-[#176B68] transition-colors leading-snug">
                  {featuredArticle.title}
                </h2>
                <p className="text-sm text-[#5D6B63] leading-relaxed line-clamp-3">
                  {featuredArticle.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-[#5D6B63]">
                  <p className="font-semibold text-[#202A35]">{featuredArticle.author}</p>
                  <p className="text-[11px]">{featuredArticle.authorTitle}</p>
                </div>
                <span className="text-xs font-semibold text-[#176B68] group-hover:underline inline-flex items-center gap-1">
                  <span>वाचा</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search & Category Filter Ribbon */}
      <div className="p-4 sm:p-6 rounded-2xl bg-white border border-[#202A35]/10 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-[#5D6B63] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="लेख, लेखक किंवा विषय शोधा (उदा. अतिविचार, नातेसंबंध)..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#F7F4EE] border border-[#202A35]/15 text-sm sm:text-base text-[#202A35] placeholder-[#5D6B63]/60 focus:outline-none focus:border-[#176B68]"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F7F4EE] rounded-xl text-xs font-semibold">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#176B68] text-white shadow-sm'
                  : 'text-[#5D6B63] hover:text-[#202A35]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs text-[#5D6B63]">
          <span>
            एकूण उपलब्ध लेख: <strong>{filteredArticles.length}</strong>
          </span>
          {(searchQuery || selectedCategory !== 'सर्व') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('सर्व');
              }}
              className="text-[#A64F35] font-semibold hover:underline"
            >
              फिल्टर्स पूर्ववत करा
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((art) => (
            <article
              key={art.id}
              onClick={() => onSelectArticle(art)}
              className="bg-white rounded-2xl border border-[#202A35]/10 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col cursor-pointer"
            >
              <div className="aspect-[16/10] bg-[#E5ECE6] overflow-hidden relative">
                <img
                  src={art.coverImage}
                  alt={art.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-semibold bg-white/95 text-[#202A35] rounded-md shadow-sm">
                  {art.category}
                </span>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 text-[10px] font-medium bg-black/60 text-white rounded">
                  {art.readTime}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-[#202A35] group-hover:text-[#176B68] transition-colors leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-[#5D6B63] line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#5D6B63]">
                  <div>
                    <span className="font-semibold text-[#202A35] block">{art.author}</span>
                    <span className="text-[11px]">{art.publishedDate}</span>
                  </div>
                  <span className="font-semibold text-[#176B68] group-hover:underline inline-flex items-center gap-1">
                    <span>वाचा</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Critical Requirement B: Article Page Advertisement Placement */}
      <AdvertisementBanner placement="article" />
    </div>
  );
};

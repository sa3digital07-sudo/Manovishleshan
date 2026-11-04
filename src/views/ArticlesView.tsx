import React, { useState } from 'react';
import { PageView, Article } from '../types';
import { ARTICLES_DATA } from '../data/mockData';
import { filterArticles } from '../utils/magazineLogic';
import { AdvertisementBanner } from '../components/AdvertisementBanner';
import { Search, ArrowRight } from 'lucide-react';

interface ArticlesViewProps {
  setCurrentPage: (page: PageView) => void;
  onSelectArticle: (art: Article) => void;
}

export const ArticlesView: React.FC<ArticlesViewProps> = ({
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
    <div className="space-y-10 sm:space-y-12">
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="h-0.5 w-6 bg-[#245A91]" />
          <span className="text-xs font-bold text-[#245A91] tracking-wider uppercase">
            संशोधन व विचार लेख
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#252D38] leading-tight">
          मानसशास्त्र आणि जीवनशैली लेख संग्रह
        </h1>
        <p className="text-sm sm:text-base text-[#626D79] leading-relaxed">
          मानवी मन, भावना, नातेसंबंध आणि मेंदूच्या कार्यावर प्रकाश टाकणारे शास्त्रीय व विचारप्रवर्तक मराठी लेख.
        </p>
      </div>

      {/* Featured Big Article Showcase */}
      {featuredArticle && !searchQuery && selectedCategory === 'सर्व' && (
        <div
          onClick={() => onSelectArticle(featuredArticle)}
          className="rounded-3xl bg-white border border-[#E4E9EF] overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden bg-[#F5F7FA]">
              <img
                src={featuredArticle.coverImage}
                alt={featuredArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#245A91]">
                  <span>संपादक निवड लेख</span>
                  <span>·</span>
                  <span>{featuredArticle.readTime}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#252D38] group-hover:text-[#245A91] transition-colors leading-snug">
                  {featuredArticle.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#626D79] leading-relaxed line-clamp-3">
                  {featuredArticle.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E4E9EF] flex items-center justify-between">
                <div className="text-xs text-[#626D79]">
                  <p className="font-bold text-[#252D38]">{featuredArticle.author}</p>
                  <p className="text-[11px]">{featuredArticle.authorTitle}</p>
                </div>
                <span className="text-xs font-bold text-[#245A91] group-hover:underline inline-flex items-center gap-1">
                  <span>वाचा</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search & Category Filter Ribbon */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E4E9EF] shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-[#626D79] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="लेख, लेखक किंवा विषय शोधा (उदा. अतिविचार, नातेसंबंध)..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#F5F7FA] border border-[#E4E9EF] text-sm text-[#252D38] placeholder-[#626D79]/60 focus:outline-none focus:border-[#245A91]"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F5F7FA] rounded-xl text-xs font-semibold border border-[#E4E9EF]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#245A91] text-white shadow-xs font-bold'
                  : 'text-[#626D79] hover:text-[#252D38]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs text-[#626D79]">
          <span>
            एकूण उपलब्ध लेख: <strong className="text-[#252D38]">{filteredArticles.length}</strong>
          </span>
          {(searchQuery || selectedCategory !== 'सर्व') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('सर्व');
              }}
              className="text-[#DC2626] font-semibold hover:underline"
            >
              फिल्टर्स पूर्ववत करा
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArticles.map((art) => (
            <article
              key={art.id}
              onClick={() => onSelectArticle(art)}
              className="bg-white rounded-2xl border border-[#E4E9EF] overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col cursor-pointer"
            >
              <div className="aspect-[16/10] bg-[#F5F7FA] overflow-hidden relative">
                <img
                  src={art.coverImage}
                  alt={art.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 text-[11px] font-bold bg-white/95 text-[#245A91] rounded-md shadow-xs border border-[#E4E9EF]">
                  {art.category}
                </span>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 text-[10px] font-semibold bg-[#20354D]/80 text-white rounded">
                  {art.readTime}
                </span>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-[#252D38] group-hover:text-[#245A91] transition-colors leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-[#626D79] line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E4E9EF] flex items-center justify-between text-xs text-[#626D79]">
                  <div>
                    <span className="font-bold text-[#252D38] block">{art.author}</span>
                    <span className="text-[11px]">{art.publishedDate}</span>
                  </div>
                  <span className="font-bold text-[#245A91] group-hover:underline inline-flex items-center gap-1">
                    <span>वाचा</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <AdvertisementBanner placement="article" />
    </div>
  );
};

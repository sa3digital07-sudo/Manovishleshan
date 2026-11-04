import React from 'react';
import { PageView, Publication, Article } from '../types';
import {
  PUBLICATIONS_DATA,
  ARTICLES_DATA,
  EXPERTS_DATA,
  QA_DATA,
  CURRENT_EDITION_ID,
} from '../data/mockData';
import { AdvertisementBanner } from '../components/AdvertisementBanner';
import {
  BookOpen,
  ArrowRight,
  Brain,
  Sparkles,
  Heart,
  Compass,
  Users,
  Search,
  CheckCircle,
  HelpCircle,
  Feather,
  Calendar,
  Clock,
  Star,
  Quote,
} from 'lucide-react';

interface HomeViewProps {
  setCurrentPage: (page: PageView) => void;
  onSelectPublication: (pub: Publication) => void;
  onSelectArticle: (article: Article) => void;
  onOpenReader: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setCurrentPage,
  onSelectPublication,
  onSelectArticle,
  onOpenReader,
}) => {
  const currentEdition =
    PUBLICATIONS_DATA.find((p) => p.id === CURRENT_EDITION_ID) || PUBLICATIONS_DATA[0];

  const featuredArticles = ARTICLES_DATA.slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 9.2 Hero Section - Curatorial Magazine Cover Aesthetic */}
      <section className="pt-6 sm:pt-10">
        <div className="rounded-3xl bg-[#E5ECE6]/60 border border-[#202A35]/10 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-semibold uppercase tracking-wider text-[#176B68]">
                <span>{currentEdition.editionMonth}</span>
                <span className="text-[#5D6B63]/60 hidden sm:inline" aria-hidden="true">·</span>
                <span>{currentEdition.title}</span>
                <span className="text-[#5D6B63]/60 hidden sm:inline" aria-hidden="true">·</span>
                <span>मानवी मनाचा शोध घेणारे</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#202A35] leading-[1.25] text-balance">
                मनाचा ठाव, विचारांची दिशा आणि आंतरिक शांततेचा शोध.
              </h1>

              <p className="text-base sm:text-lg text-[#5D6B63] leading-relaxed max-w-xl">
                महाराष्ट्र आणि जगभरातील मराठी वाचकांसाठी शास्त्रीय मानसशास्त्र, भावनिक संतुलन आणि मानवी वर्तनाचे सखोल विश्लेषण करणारे मासिक.
              </p>

              <div className="p-4 rounded-xl bg-white/80 border border-[#202A35]/10 space-y-2 max-w-lg">
                <span className="text-xs font-semibold text-[#A64F35] uppercase tracking-wider block">
                  या अंकातील प्रमुख आकर्षण
                </span>
                <p className="font-serif font-semibold text-base text-[#202A35]">
                  {currentEdition.subtitle}
                </p>
                <div className="flex items-center gap-3 text-xs text-[#5D6B63]">
                  <span>{currentEdition.pages} पाने</span>
                  <span>·</span>
                  <span>वाचन वेळ: {currentEdition.readTime}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-[#D7B56D]">
                    <Star className="w-3.5 h-3.5 fill-[#D7B56D]" />
                    <strong className="text-[#202A35]">{currentEdition.rating}</strong> ({currentEdition.reviewsCount} वाचक परीक्षणे)
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onOpenReader}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#176B68] hover:bg-[#135855] text-white font-semibold text-base transition-all shadow-md hover:shadow-lg focus-visible:outline-2 focus-visible:outline-[#202A35] min-h-[48px]"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>{currentEdition.title} वाचा</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentPage('publications')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-[#F7F4EE] text-[#202A35] font-semibold text-sm border border-[#202A35]/20 transition-all min-h-[48px]"
                >
                  <span>सर्व अंक व प्रकाशने</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Editorial Magazine Cover Art */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group cursor-pointer" onClick={onOpenReader}>
                <div className="absolute -inset-2 bg-gradient-to-r from-[#176B68]/20 to-[#D7B56D]/30 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] max-w-[340px] transform group-hover:scale-[1.02] transition-transform">
                  <img
                    src={currentEdition.coverImage}
                    alt={currentEdition.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-end text-white">
                    <span className="text-xs uppercase tracking-widest text-[#D7B56D] font-bold">
                      विशेष आवृत्ती
                    </span>
                    <h3 className="text-lg font-serif font-bold leading-snug">
                      {currentEdition.title}
                    </h3>
                    <p className="text-xs text-white/80 mt-1 line-clamp-2">
                      {currentEdition.subtitle}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#D7B56D]">
                      <span>वाचनासाठी येथे क्लिक करा</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9.3 Editorial Note & 9.4 Monthly Theme Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* 9.3 Editorial Note (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[#202A35]/10 flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#176B68] flex items-center gap-1.5">
                <Quote className="w-3.5 h-3.5" />
                <span>संपादकीय मनोगत</span>
              </span>
              <span className="text-xs text-[#5D6B63]">डॉ. प्रकाश देशमुख</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#202A35]">
              वादळातील स्थिर दीपगृह: संकटात मनाचा तोल कसा सांभाळाल?
            </h2>

            <p className="text-[#5D6B63] leading-relaxed text-base">
              "जेव्हा समुद्रात वादळ उठते, तेव्हा दीपगृह वादळाला अडवत नाही; उलट ते आपल्या जागेवर स्थिर राहून दिशा दाखवण्याचे कार्य करते. आपल्या दैनंदिन जीवनातील विवंचना, स्पर्धा आणि अनपेक्षित आव्हानांमध्ये आपले मनही अशाच दीपगृहासारखे स्थिर राखण्याची कला म्हणजेच मानसिक लवचिकता..."
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
            <span className="text-xs text-[#5D6B63]">
              मुख्य संपादक · मानसोपचारतज्ज्ञ (एम.डी.)
            </span>
            <button
              onClick={onOpenReader}
              className="text-xs font-bold text-[#176B68] hover:text-[#135855] inline-flex items-center gap-1"
            >
              <span>पूर्ण संपादकीय वाचा</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 9.4 Current Monthly Theme (5 cols) */}
        <div className="lg:col-span-5 bg-[#F4F1EA] rounded-2xl p-6 sm:p-8 border border-[#202A35]/10 flex flex-col justify-between shadow-sm">
          <div className="space-y-4">
            <div className="aspect-[16/9] rounded-xl overflow-hidden border border-black/5 shadow-sm">
              <img
                src="/assets/images/theme_contemplation_1793724774513.jpg"
                alt="मासिक संकल्पना छायाचित्र"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A64F35] block">
              मासिक संकल्पना (Monthly Theme)
            </span>
            <h3 className="text-xl font-serif font-bold text-[#202A35]">
              आंतरिक शांती आणि मानसिक लवचिकता
            </h3>
            <p className="text-sm text-[#5D6B63] leading-relaxed">
              स्वतःच्या त्रुटी स्वीकारून कठीण प्रसंगातून पुन्हा फिनिक्स पक्षासारखे भरारी घेण्याची आंतरिक क्षमता समजून घेणारा विशेष अभ्यास.
            </p>
          </div>

          <button
            onClick={onOpenReader}
            className="mt-6 w-full py-2.5 px-4 rounded-xl bg-[#202A35] hover:bg-[#176B68] text-white text-xs font-semibold text-center transition-colors"
          >
            संकल्पनेवरील सर्व लेख पहा
          </button>
        </div>
      </section>

      {/* 9.5 What Readers Will Learn */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#202A35]/10 shadow-sm space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#176B68]">
            अंकाची फलश्रुती
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#202A35] mt-1">
            या अंकातून वाचक काय शिकतील?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 rounded-xl bg-[#F7F4EE] border border-[#202A35]/10 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#176B68]/10 text-[#176B68] flex items-center justify-center font-bold text-sm">
              १
            </div>
            <h4 className="font-serif font-bold text-base text-[#202A35]">
              न्यूरोप्लास्टिसिटीची जादू
            </h4>
            <p className="text-xs text-[#5D6B63] leading-relaxed">
              मेंदूचे विचार करण्याचे मार्ग कसे नव्याने बदलता येतात आणि जुन्या नकारात्मक सवयी कशा मोडायच्या याचे विज्ञान.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F7F4EE] border border-[#202A35]/10 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#A64F35]/10 text-[#A64F35] flex items-center justify-center font-bold text-sm">
              २
            </div>
            <h4 className="font-serif font-bold text-base text-[#202A35]">
              ग्राउंडिंग तंत्र (५-४-३-२-१)
            </h4>
            <p className="text-xs text-[#5D6B63] leading-relaxed">
              अचानक येणाऱ्या भीती आणि चिंतेच्या क्षणी अवघ्या २ मिनिटांत मन पुन्हा वर्तमानात स्थिर करण्याची साधी पद्धत.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F7F4EE] border border-[#202A35]/10 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#D7B56D]/20 text-[#202A35] flex items-center justify-center font-bold text-sm">
              ३
            </div>
            <h4 className="font-serif font-bold text-base text-[#202A35]">
              नातेसंबंधातील सक्रिय श्रवण
            </h4>
            <p className="text-xs text-[#5D6B63] leading-relaxed">
              उत्तर देण्यासाठी न ऐकता जोडीदाराचे मन समजून घेऊन कौटुंबिक गैरसमज आणि कटुता कायमची कशी मिटवावी.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F7F4EE] border border-[#202A35]/10 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#176B68]/10 text-[#176B68] flex items-center justify-center font-bold text-sm">
              ४
            </div>
            <h4 className="font-serif font-bold text-base text-[#202A35]">
              लवचिकता स्व-चाचणी
            </h4>
            <p className="text-xs text-[#5D6B63] leading-relaxed">
              तुमची भावनिक प्रतिकारशक्ती किती आहे हे ५ सोप्या संवादात्मक प्रश्नांद्वारे तपासण्याचा विनामूल्य मार्ग.
            </p>
          </div>
        </div>
      </section>

      {/* Critical Requirement B: Homepage Advertisement Placement */}
      <AdvertisementBanner placement="homepage" />

      {/* 9.6 Featured Publications & 9.7 Latest Publications */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#176B68]">
              वाचनालय व विशेषांक
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#202A35] mt-1">
              मासिक अंक आणि डिजिटल ई-पुस्तके
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('publications')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#176B68] hover:text-[#135855]"
          >
            <span>सर्व प्रकाशने पहा ({PUBLICATIONS_DATA.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PUBLICATIONS_DATA.map((pub) => (
            <div
              key={pub.id}
              onClick={() => onSelectPublication(pub)}
              className="bg-white rounded-2xl border border-[#202A35]/10 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col cursor-pointer"
            >
              <div className="aspect-[16/10] bg-[#E5ECE6] overflow-hidden relative">
                <img
                  src={pub.coverImage}
                  alt={pub.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-semibold bg-white/90 text-[#202A35] rounded-md shadow-sm">
                  {pub.category}
                </span>
                <span className="absolute top-3 right-3 px-2.5 py-1 text-[11px] font-semibold bg-[#202A35]/80 text-white rounded-md">
                  {pub.editionMonth}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="font-serif font-bold text-lg text-[#202A35] group-hover:text-[#176B68] transition-colors leading-snug">
                    {pub.title}
                  </h3>
                  <p className="text-xs text-[#5D6B63] line-clamp-2 leading-relaxed">
                    {pub.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#5D6B63]">
                  <span className="flex items-center gap-1 text-[#D7B56D]">
                    <Star className="w-3.5 h-3.5 fill-[#D7B56D]" />
                    <strong className="text-[#202A35]">{pub.rating}</strong> ({pub.reviewsCount})
                  </span>
                  <span className="font-semibold text-[#176B68] group-hover:underline inline-flex items-center gap-1">
                    <span>तपशील पहा</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9.8 Featured Articles */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A64F35]">
              संशोधन व लेख
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#202A35] mt-1">
              महत्त्वाचे मानसशास्त्रीय लेख
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('articles')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#176B68] hover:text-[#135855]"
          >
            <span>सर्व लेख संग्रह</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredArticles.map((art) => (
            <article
              key={art.id}
              onClick={() => onSelectArticle(art)}
              className="bg-white rounded-2xl border border-[#202A35]/10 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col cursor-pointer"
            >
              <div className="aspect-[4/3] bg-[#E5ECE6] overflow-hidden">
                <img
                  src={art.coverImage}
                  alt={art.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#5D6B63]">
                    <span className="font-semibold text-[#176B68]">{art.category}</span>
                    <span>·</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#202A35] group-hover:text-[#176B68] transition-colors leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-[#5D6B63] line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#5D6B63]">
                  <span>{art.author}</span>
                  <span>{art.publishedDate}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 9.9 Core Learning & 9.10 Human Life Sections */}
      <section className="bg-[#E5ECE6]/40 rounded-3xl p-6 sm:p-10 border border-[#202A35]/10 space-y-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#176B68]">
            स्तंभ व विभाग
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#202A35] mt-1">
            मानवी जीवन, मेंदू आणि मानसिक स्वास्थ्य
          </h2>
          <p className="text-sm text-[#5D6B63] mt-1">
            वेगवेगळ्या वयोगटातील वाचकांसाठी शास्त्रीय माहिती आणि व्यावहारिक मार्गदर्शन.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            onClick={onOpenReader}
            className="p-5 rounded-2xl bg-white border border-[#202A35]/10 hover:border-[#176B68] transition-all cursor-pointer space-y-2 group"
          >
            <div className="flex items-center gap-2 text-[#176B68]">
              <Brain className="w-5 h-5" />
              <h4 className="font-serif font-bold text-base group-hover:text-[#176B68]">
                मानसशास्त्र उलगडताना (Psychology Explained)
              </h4>
            </div>
            <p className="text-xs text-[#5D6B63] leading-relaxed">
              न्यूरोसायन्स, मेंदूतील रसायने आणि वर्तणुकीचे शास्त्र सोप्या मराठी भाषेत.
            </p>
          </div>

          <div
            onClick={onOpenReader}
            className="p-5 rounded-2xl bg-white border border-[#202A35]/10 hover:border-[#176B68] transition-all cursor-pointer space-y-2 group"
          >
            <div className="flex items-center gap-2 text-[#A64F35]">
              <Users className="w-5 h-5" />
              <h4 className="font-serif font-bold text-base group-hover:text-[#A64F35]">
                नातेसंबंध कट्टा (Relationships Corner)
              </h4>
            </div>
            <p className="text-xs text-[#5D6B63] leading-relaxed">
              जोडीदार, पालक, मुले आणि सहकाऱ्यांमधील संवादाची वीण घट्ट करणारी सूत्रे.
            </p>
          </div>

          <div
            onClick={onOpenReader}
            className="p-5 rounded-2xl bg-white border border-[#202A35]/10 hover:border-[#176B68] transition-all cursor-pointer space-y-2 group"
          >
            <div className="flex items-center gap-2 text-[#176B68]">
              <Sparkles className="w-5 h-5" />
              <h4 className="font-serif font-bold text-base group-hover:text-[#176B68]">
                युवा कॉर्नर (Youth & Social Dynamics)
              </h4>
            </div>
            <p className="text-xs text-[#5D6B63] leading-relaxed">
              सोशल मीडिया, फोमो (FOMO), करिअरचे दडपण आणि स्वतःच्या अस्तित्त्वाची ओळख.
            </p>
          </div>

          <div
            onClick={onOpenReader}
            className="p-5 rounded-2xl bg-white border border-[#202A35]/10 hover:border-[#176B68] transition-all cursor-pointer space-y-2 group"
          >
            <div className="flex items-center gap-2 text-[#D7B56D]">
              <Compass className="w-5 h-5" />
              <h4 className="font-serif font-bold text-base text-[#202A35]">
                आत्मविकास प्रयोगशाळा (Self-Improvement Lab)
              </h4>
            </div>
            <p className="text-xs text-[#5D6B63] leading-relaxed">
              सवयींचे व्यवस्थापन, जर्नल रायटिंग आणि विचार नियंत्रणाचे प्रायोगिक सराव.
            </p>
          </div>

          <div
            onClick={onOpenReader}
            className="p-5 rounded-2xl bg-white border border-[#202A35]/10 hover:border-[#176B68] transition-all cursor-pointer space-y-2 group"
          >
            <div className="flex items-center gap-2 text-[#176B68]">
              <Heart className="w-5 h-5" />
              <h4 className="font-serif font-bold text-base group-hover:text-[#176B68]">
                माइंडफुलनेस आणि वेलनेस (Mindfulness)
              </h4>
            </div>
            <p className="text-xs text-[#5D6B63] leading-relaxed">
              दररोज १० मिनिटे ध्यान, श्वासोच्छ्वास आणि वर्तमान क्षणात जगण्याचा सराव.
            </p>
          </div>

          <div
            onClick={onOpenReader}
            className="p-5 rounded-2xl bg-white border border-[#202A35]/10 hover:border-[#176B68] transition-all cursor-pointer space-y-2 group"
          >
            <div className="flex items-center gap-2 text-[#A64F35]">
              <Feather className="w-5 h-5" />
              <h4 className="font-serif font-bold text-base group-hover:text-[#A64F35]">
                केस स्टडीज (Real Case Studies)
              </h4>
            </div>
            <p className="text-xs text-[#5D6B63] leading-relaxed">
              बर्नआउट, डिप्रेशन आणि नातेसंबंधांच्या आव्हानांवर मात करणाऱ्या सत्य कथा.
            </p>
          </div>
        </div>
      </section>

      {/* 9.11 Experts & 9.12 Professional Directory Preview */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#202A35]/10 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#176B68]">
              तज्ज्ञ मंडळ व मार्गदर्शिका
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#202A35] mt-1">
              अनुभवी मानसोपचारतज्ज्ञ आणि समुपदेशक
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('directory')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#176B68] text-white text-xs font-semibold hover:bg-[#135855] transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>तज्ज्ञ मार्गदर्शिकेत शोधा</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {EXPERTS_DATA.map((exp) => (
            <div
              key={exp.id}
              onClick={() => setCurrentPage('experts')}
              className="p-4 rounded-xl bg-[#F7F4EE] border border-[#202A35]/10 space-y-3 cursor-pointer hover:border-[#176B68] transition-colors group"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200 border-2 border-white shadow-sm">
                <img
                  src={exp.avatar}
                  alt={exp.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-serif font-bold text-base text-[#202A35] group-hover:text-[#176B68]">
                  {exp.name}
                </h4>
                <p className="text-xs text-[#A64F35] font-semibold">{exp.qualification}</p>
                <p className="text-[11px] text-[#5D6B63]">{exp.specialization}</p>
              </div>
              <div className="pt-2 border-t border-[#202A35]/10 text-[11px] text-[#5D6B63] flex justify-between">
                <span>{exp.experienceYears} वर्षे अनुभव</span>
                <span className="text-[#176B68] font-semibold">प्रोफाईल पहा</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9.13 Reader Questions & Answers Preview */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#176B68]">
              मार्गदर्शन
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#202A35] mt-1">
              वाचक प्रश्न आणि तज्ज्ञांचे उत्तर
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('qa')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#176B68] hover:text-[#135855]"
          >
            <span>सर्व प्रश्नोत्तरे पहा</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {QA_DATA.slice(0, 2).map((item) => (
            <div
              key={item.id}
              onClick={() => setCurrentPage('qa')}
              className="p-6 rounded-2xl bg-white border border-[#202A35]/10 shadow-sm hover:border-[#176B68] transition-all cursor-pointer space-y-4"
            >
              <div className="flex items-center justify-between text-xs text-[#5D6B63]">
                <span className="font-semibold text-[#A64F35]">{item.category}</span>
                <span>{item.askedBy}</span>
              </div>
              <h3 className="font-serif font-bold text-lg text-[#202A35] leading-snug">
                "{item.question}"
              </h3>
              <p className="text-sm text-[#5D6B63] line-clamp-3 leading-relaxed">
                {item.expertAnswer}
              </p>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-[#176B68]">
                  मार्गदर्शन: {item.expertName}
                </span>
                <span className="text-[#5D6B63]">{item.helpfulCount} वाचकांना उपयुक्त</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9.14 Next Month Preview & 9.16 Contribute to Manovishleshan */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Next Month Preview (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-[#F2ECE1] p-6 sm:p-8 border border-[#E0D5C3] space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A64F35]">
            <Calendar className="w-4 h-4" />
            <span>पुढील अंकाची पूर्वझलक (डिसेंबर २०२६)</span>
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#202A35]">
            विशेषांक: डिजिटल युगातील ताणतणाव आणि डिजिटल डिटॉक्स
          </h3>
          <p className="text-sm text-[#5D6B63] leading-relaxed">
            सतत चालू असणाऱ्या नोटिफिकेशन्स, सोशल मीडियाची तुलना आणि डोपामाइन रश यामुळे होणाऱ्या मानसिक त्रासावर शास्त्रीय उपाय. खऱ्या मानवी संवादाची पुनर्स्थापना कशी करावी?
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs px-3 py-1 rounded-full bg-white/70 text-[#202A35] font-medium">
              #डिजिटलडिटॉक्स
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-white/70 text-[#202A35] font-medium">
              #डोपामाइन
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-white/70 text-[#202A35] font-medium">
              #स्क्रीनटाईम
            </span>
          </div>
        </div>

        {/* Contribute Box (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-white p-6 sm:p-8 border border-[#202A35]/10 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#176B68] flex items-center gap-1.5">
              <Feather className="w-3.5 h-3.5" />
              <span>लेखक व तज्ज्ञांसाठी आवाहन</span>
            </span>
            <h3 className="text-xl font-serif font-bold text-[#202A35]">
              आपला लेख मनोविश्लेषणमध्ये प्रसिद्ध करा
            </h3>
            <p className="text-xs text-[#5D6B63] leading-relaxed">
              आपण मानसोपचार, समुपदेशन किंवा मानसशास्त्र संशोधक आहात का? आपले विचारप्रवर्तक लेख आमच्या संपादक मंडळाकडे पाठवा.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('contact')}
            className="w-full py-2.5 px-4 rounded-xl border border-[#176B68] text-[#176B68] hover:bg-[#176B68] hover:text-white transition-colors text-xs font-semibold"
          >
            लेख पाठवण्याचे नियम व संपर्क पहा
          </button>
        </div>
      </section>
    </div>
  );
};

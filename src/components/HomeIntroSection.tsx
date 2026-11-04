import React from 'react';
import { Sparkles, Brain, Heart, BookOpen, Compass, ArrowRight } from 'lucide-react';
import { Publication, PageView } from '../types';

interface HomeIntroSectionProps {
  onReadLatest: () => void;
  onExploreMore: () => void;
}

export const HomeIntroSection: React.FC<HomeIntroSectionProps> = ({
  onReadLatest,
  onExploreMore,
}) => {
  const pillars = [
    { title: 'मानसशास्त्रीय ज्ञान', icon: Brain, color: 'text-[#245A91] bg-[#EBF3FA]' },
    { title: 'मानसिक आरोग्य जागरूकता', icon: Heart, color: 'text-[#0D9488] bg-[#CCFBF1]' },
    { title: 'संशोधन आणि तज्ज्ञांचे विचार', icon: Sparkles, color: 'text-[#D97706] bg-[#FEF3C7]' },
    { title: 'व्यक्तिमत्त्व आणि जीवनविकास', icon: Compass, color: 'text-[#6366F1] bg-[#EEF2FF]' },
  ];

  return (
    <section aria-label="मासिक मनोविश्लेषण परिचय" className="pt-1 pb-4 sm:pb-6">
      <div className="rounded-3xl bg-gradient-to-br from-white via-[#F5F7FA] to-[#EBF3FA]/50 border border-[#E4E9EF] p-5 sm:p-8 lg:p-10 shadow-xs relative overflow-hidden">
        {/* Subtle decorative background watermarks */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-[#245A91]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-8 w-64 h-64 bg-[#F2C14E]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
          {/* Left Column: Text Content (Stacks First on Mobile) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            {/* Title Eyebrow */}
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-6 bg-[#245A91]" />
              <span className="text-xs sm:text-sm font-bold text-[#245A91] tracking-wider uppercase">
                मासिक मनोविश्लेषण
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#20354D] leading-tight tracking-tight">
              मन समजून घेऊया, स्वतःला अधिक जाणून घेऊया.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg font-semibold text-[#245A91] leading-snug">
              मानवी मन, विचार, भावना आणि वर्तन यांचा अभ्यासपूर्ण वेध.
            </p>

            {/* Narrative */}
            <p className="text-sm sm:text-base text-[#4A5568] leading-relaxed">
              मानसशास्त्र म्हणजे केवळ मनाचा अभ्यास नाही, तर स्वतःला, इतरांना आणि आपल्या सभोवतालच्या जगाला अधिक चांगल्या प्रकारे समजून घेण्याचा एक दृष्टिकोन आहे. मासिक मनोविश्लेषण हे मराठी डिजिटल व्यासपीठ सर्वसामान्य वाचकांपासून ते अभ्यासकांपर्यंत सर्वांसाठी शास्त्रीय, विश्वासार्ह आणि दैनंदिन जीवनाला मार्गदर्शक ठरेल अशा मानसशास्त्रीय ज्ञानाचा प्रसार करण्यासाठी समर्पित आहे.
            </p>

            {/* Pillars: आमचे विषय */}
            <div className="pt-2 space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#626D79] block">
                आमचे विषय :
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {pillars.map((pillar, idx) => {
                  const IconComp = pillar.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-[#E4E9EF] shadow-2xs hover:border-[#245A91]/40 transition-colors"
                    >
                      <div className={`w-8 h-8 rounded-lg ${pillar.color} flex items-center justify-center shrink-0`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-[#252D38]">
                        {pillar.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Kicker */}
            <div className="p-3.5 rounded-xl bg-[#EBF3FA] border-l-4 border-[#245A91] text-xs sm:text-sm font-semibold text-[#20354D] leading-snug">
              ज्ञानातून जाणीव, जाणिवेतून विकास. मनाचा शोध घेणाऱ्या प्रत्येक जिज्ञासू वाचकासाठी.
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onReadLatest}
                className="px-5 py-2.5 rounded-full bg-[#F2C14E] hover:bg-[#E5B542] text-[#20354D] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-xs flex items-center gap-2 border border-[#E5B542]/60"
              >
                <BookOpen className="w-4 h-4 text-[#20354D]" />
                <span>सध्याचा अंक वाचा</span>
              </button>
              <button
                type="button"
                onClick={onExploreMore}
                className="px-4 py-2.5 rounded-full bg-white hover:bg-[#F5F7FA] text-[#245A91] font-bold text-xs sm:text-sm transition-all border border-[#E4E9EF] flex items-center gap-1.5"
              >
                <span>मासिकाविषयी अधिक</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Psychology Illustration (Stacks After Text on Mobile) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[380px] rounded-2xl bg-white p-3 sm:p-4 border border-[#E4E9EF] shadow-md group">
              {/* Illustration container */}
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] sm:aspect-[1/1] bg-slate-100">
                <img
                  src="/assets/images/theme_contemplation_1793724774513.jpg"
                  alt="मानवी मनाचे चिंतन आणि भावनिक संतुलन"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('Logo.jpeg')) {
                      target.src = '/assets/aistudio/Logo_5109781a.jpeg';
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#20354D]/85 via-[#20354D]/25 to-transparent flex flex-col justify-end p-4 text-white">
                  <span className="text-[11px] font-bold text-[#F2C14E] tracking-wider uppercase">
                    शास्त्रीय दृष्टिकोन · मराठी भाषा
                  </span>
                  <p className="text-sm sm:text-base font-bold leading-snug">
                    मानवी मन, विचार आणि वर्तनाचे सखोल विश्लेषण
                  </p>
                </div>
              </div>

              {/* Editorial Caption Tag */}
              <div className="mt-3 flex items-center justify-between text-xs text-[#626D79] px-1">
                <span className="flex items-center gap-1 font-medium">
                  <span className="text-[#245A91] font-bold text-sm">Ψ</span>
                  <span>मानसशास्त्र अभ्यास मंडळ</span>
                </span>
                <span className="text-[11px] font-semibold text-[#245A91] bg-[#EBF3FA] px-2 py-0.5 rounded-full">
                  जालना सायकॉलॉजिकल असोसिएशन
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

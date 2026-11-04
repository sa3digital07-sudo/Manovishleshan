import React, { useState } from 'react';
import { PageView } from '../types';
import { FAQ_DATA } from '../data/mockData';
import { ChevronDown, ArrowRight } from 'lucide-react';

interface FaqViewProps {
  setCurrentPage: (page: PageView) => void;
}

export const FaqView: React.FC<FaqViewProps> = ({ setCurrentPage }) => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    '0-0': true,
  });

  const toggleItem = (catIdx: number, itemIdx: number) => {
    const key = `${catIdx}-${itemIdx}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-10 sm:space-y-12 max-w-4xl mx-auto">
      <div className="space-y-3 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <span className="h-0.5 w-6 bg-[#245A91]" />
          <span className="text-xs font-bold text-[#245A91] tracking-wider uppercase">
            मदत व माहिती
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#252D38] leading-tight">
          वारंवार विचारले जाणारे प्रश्न (FAQ)
        </h1>
        <p className="text-sm sm:text-base text-[#626D79] leading-relaxed">
          मासिक मनोविश्लेषणचे डिजिटल अंक, वाचन पद्धती, मार्गदर्शिका आणि लेखक सहभागाविषयीच्या सर्व प्रश्नांची उत्तरे.
        </p>
      </div>

      <div className="space-y-8">
        {FAQ_DATA.map((group, catIdx) => (
          <div key={group.category} className="space-y-3">
            <h3 className="font-bold text-lg sm:text-xl text-[#252D38] pb-2 border-b border-[#E4E9EF]">
              {group.category}
            </h3>

            <div className="space-y-2.5">
              {group.items.map((item, itemIdx) => {
                const key = `${catIdx}-${itemIdx}`;
                const isOpen = !!openItems[key];

                return (
                  <div
                    key={item.q}
                    className="rounded-2xl bg-white border border-[#E4E9EF] overflow-hidden shadow-xs transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(catIdx, itemIdx)}
                      aria-expanded={isOpen}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#252D38] hover:text-[#245A91] transition-colors"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#626D79] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#245A91]' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-[#626D79] leading-relaxed border-t border-[#E4E9EF] pt-3">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Still have questions */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#F5F7FA] border border-[#E4E9EF] text-center space-y-3 shadow-xs">
        <h3 className="font-bold text-lg sm:text-xl text-[#252D38]">
          आपल्या मनात आणखी काही प्रश्न आहेत का?
        </h3>
        <p className="text-xs sm:text-sm text-[#626D79] max-w-md mx-auto">
          आमच्या संपादकीय टीमशी थेट संपर्क साधा किंवा वाचक प्रश्नोत्तरे विभागात आपला प्रश्न पाठवा.
        </p>
        <button
          onClick={() => setCurrentPage('contact')}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#245A91] text-white text-xs sm:text-sm font-bold hover:bg-[#1E3A8A] transition-colors shadow-xs"
        >
          <span>आमच्याशी संपर्क साधा</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

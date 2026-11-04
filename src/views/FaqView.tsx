import React, { useState } from 'react';
import { PageView } from '../types';
import { FAQ_DATA } from '../data/mockData';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';

interface FaqViewProps {
  setCurrentPage: (page: PageView) => void;
}

export const FaqView: React.FC<FaqViewProps> = ({ setCurrentPage }) => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    '0-0': true, // First open by default
  });

  const toggleItem = (catIdx: number, itemIdx: number) => {
    const key = `${catIdx}-${itemIdx}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      <div className="space-y-4 text-center sm:text-left">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#176B68]">
          मदत व माहिती
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#202A35] leading-tight">
          वारंवार विचारले जाणारे प्रश्न (FAQ)
        </h1>
        <p className="text-base sm:text-lg text-[#5D6B63] leading-relaxed">
          मासिक मनोविश्लेषणचे डिजिटल अंक, वाचन पद्धती, मार्गदर्शिका आणि लेखक सहभागाविषयीच्या सर्व प्रश्नांची उत्तरे.
        </p>
      </div>

      <div className="space-y-10">
        {FAQ_DATA.map((group, catIdx) => (
          <div key={group.category} className="space-y-4">
            <h3 className="font-serif font-bold text-xl text-[#202A35] pb-2 border-b border-[#202A35]/10">
              {group.category}
            </h3>

            <div className="space-y-3">
              {group.items.map((item, itemIdx) => {
                const key = `${catIdx}-${itemIdx}`;
                const isOpen = !!openItems[key];

                return (
                  <div
                    key={item.q}
                    className="rounded-2xl bg-white border border-[#202A35]/10 overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(catIdx, itemIdx)}
                      aria-expanded={isOpen}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-base text-[#202A35] hover:text-[#176B68] transition-colors"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#5D6B63] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#176B68]' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 text-sm text-[#5D6B63] leading-relaxed border-t border-slate-100 pt-3">
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
      <div className="p-8 rounded-3xl bg-[#E5ECE6]/60 border border-[#202A35]/10 text-center space-y-4">
        <h3 className="font-serif font-bold text-xl text-[#202A35]">
          आपल्या मनात आणखी काही प्रश्न आहेत का?
        </h3>
        <p className="text-xs sm:text-sm text-[#5D6B63] max-w-md mx-auto">
          आमच्या संपादकीय टीमशी थेट संपर्क साधा किंवा वाचक प्रश्नोत्तरे विभागात आपला प्रश्न पाठवा.
        </p>
        <button
          onClick={() => setCurrentPage('contact')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#176B68] text-white text-xs sm:text-sm font-semibold hover:bg-[#135855] transition-colors"
        >
          <span>आमच्याशी संपर्क साधा</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

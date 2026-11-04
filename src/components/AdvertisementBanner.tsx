import React from 'react';
import { ExternalLink } from 'lucide-react';

interface AdProps {
  placement: 'homepage' | 'publications' | 'article' | 'magazine-break';
  className?: string;
}

export const AdvertisementBanner: React.FC<AdProps> = ({ placement, className = '' }) => {
  // Sample ethical/literary/cultural advertisements relevant to Marathi intellectual audience
  const adVariants = {
    homepage: {
      tag: 'जाहिरात • सांस्कृतिक उपक्रम',
      title: 'पुणे आंतरराष्ट्रीय साहित्य व मानसशास्त्र परिषद २०२६',
      desc: 'मराठी व आंतरराष्ट्रीय विचारवंतांची उपस्थिती. नोंदणी सुरू आहे. मर्यादित जागा.',
      cta: 'माहिती पहा',
      sponsor: 'महाराष्ट्र साहित्य व संस्कृती मंडळ सहयोगी',
      bg: 'bg-[#F2ECE1] border-[#E0D5C3]',
    },
    publications: {
      tag: 'जाहिरात • पुस्तक विशेष',
      title: 'मराठी मानसशास्त्र ग्रंथमाला: विशेष सवलत संच',
      desc: 'मनाची शक्ती, पालकत्व आणि ध्यान या विषयांवरील ५ सर्वोत्कृष्ट पुस्तकांचा संच घरपोच मिळवा.',
      cta: 'ऑर्डर करा',
      sponsor: 'सह्याद्री प्रकाशन, पुणे',
      bg: 'bg-[#E5ECE6] border-[#D0DED2]',
    },
    article: {
      tag: 'जाहिरात • कार्यशाळा',
      title: 'माइंडफुलनेस आणि ताणतणाव मुक्ती: २ दिवसांचे ऑनलाईन शिबिर',
      desc: 'तज्ज्ञ सायकॉलॉजिस्टच्या प्रत्यक्ष मार्गदर्शनाखाली दैनंदिन श्वासोच्छ्वास व ध्यान सत्रे.',
      cta: 'तपशील जाणून घ्या',
      sponsor: 'आत्मबोधिनी वेलनेस सेंटर',
      bg: 'bg-[#F4F1EA] border-[#DDD5C5]',
    },
    'magazine-break': {
      tag: 'जाहिरात • विश्रांती क्षण',
      title: 'श्रव्यभारती: मराठी ऑडिओबुक्स व मनोविकास पॉडकास्ट',
      desc: 'प्रवास करताना किंवा विश्रांती घेताना ऐका विचारप्रवर्तक मराठी पुस्तके आणि जीवनगाथा.',
      cta: 'मोफत ऐका',
      sponsor: 'श्रव्यभारती डिजिटल',
      bg: 'bg-[#EBF2F0] border-[#D4E3E0]',
    },
  };

  const ad = adVariants[placement];

  return (
    <aside
      aria-label="जाहिरात विभाग"
      className={`relative my-8 rounded-xl border p-4 sm:p-5 transition-all ${ad.bg} ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-black/5 text-[#5D6B63]">
              {ad.tag}
            </span>
            <span className="text-xs text-[#5D6B63]/80">· {ad.sponsor}</span>
          </div>
          <h4 className="text-base sm:text-lg font-serif font-bold text-[#202A35] leading-snug">
            {ad.title}
          </h4>
          <p className="text-sm text-[#5D6B63] max-w-2xl leading-relaxed">
            {ad.desc}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            alert('ही केवळ प्रात्यक्षिक जाहिरात (Demo Advertisement Creative) आहे. प्रत्यक्ष सेवेशी जोडलेली नाही.');
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#202A35] text-[#F7F4EE] hover:bg-[#176B68] transition-colors shrink-0 shadow-sm"
        >
          <span>{ad.cta}</span>
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-2 text-[10px] text-[#5D6B63]/70 text-right">
        जाहिरात प्रायोजकत्व वाचकांच्या स्वतंत्र वाचन अनुभवास बाधा न आणता प्रदर्शित केले जाते
      </div>
    </aside>
  );
};

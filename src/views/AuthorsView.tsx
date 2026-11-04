import React from 'react';
import { PageView, Author } from '../types';
import { AUTHORS_DATA } from '../data/mockData';
import { MapPin, BookOpen, ArrowRight } from 'lucide-react';

interface AuthorsViewProps {
  setCurrentPage: (page: PageView) => void;
}

export const AuthorsView: React.FC<AuthorsViewProps> = ({ setCurrentPage }) => {
  return (
    <div className="space-y-12">
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#176B68]">
          संपादक व लेखक मंडळ
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#202A35] leading-tight">
          विचारवंत, संशोधक आणि स्तंभलेखक
        </h1>
        <p className="text-base sm:text-lg text-[#5D6B63] leading-relaxed">
          मासिक मनोविश्लेषणसाठी सातत्याने लेखन करणारे मान्यवर मानसोपचारतज्ज्ञ, मानसशास्त्रज्ञ आणि संशोधक.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {AUTHORS_DATA.map((author) => (
          <div
            key={author.id}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-[#202A35]/10 shadow-sm flex flex-col sm:flex-row gap-6 items-start"
          >
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-200 shrink-0 border-2 border-white shadow-md">
              <img
                src={author.avatar}
                alt={author.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3 flex-1">
              <div>
                <h3 className="font-serif font-bold text-xl text-[#202A35]">{author.name}</h3>
                <p className="text-xs text-[#176B68] font-semibold">{author.role}</p>
                <p className="text-xs text-[#5D6B63] flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" />
                  <span>{author.location}</span>
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#5D6B63] leading-relaxed">
                {author.bio}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-[#A64F35]">
                  विशेष: {author.specialization}
                </span>
                <span className="text-[#5D6B63] font-mono">
                  {author.articleCount} लेख प्रकाशित
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

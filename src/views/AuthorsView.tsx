import React from 'react';
import { PageView } from '../types';
import { AUTHORS_DATA } from '../data/mockData';
import { MapPin } from 'lucide-react';

interface AuthorsViewProps {
  setCurrentPage: (page: PageView) => void;
}

export const AuthorsView: React.FC<AuthorsViewProps> = () => {
  return (
    <div className="space-y-10 sm:space-y-12">
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="h-0.5 w-6 bg-[#245A91]" />
          <span className="text-xs font-bold text-[#245A91] tracking-wider uppercase">
            संपादक व लेखक मंडळ
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#252D38] leading-tight">
          विचारवंत, संशोधक आणि स्तंभलेखक
        </h1>
        <p className="text-sm sm:text-base text-[#626D79] leading-relaxed">
          मासिक मनोविश्लेषणसाठी सातत्याने लेखन करणारे मान्यवर मानसोपचार अभ्यासक, मानसशास्त्रज्ञ आणि संशोधक.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {AUTHORS_DATA.map((author) => (
          <div
            key={author.id}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E4E9EF] shadow-xs flex flex-col sm:flex-row gap-6 items-start"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border-2 border-white shadow-xs">
              <img
                src={author.avatar}
                alt={author.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3 flex-1">
              <div>
                <h3 className="font-bold text-lg sm:text-xl text-[#252D38]">{author.name}</h3>
                <p className="text-xs text-[#245A91] font-bold">{author.role}</p>
                <p className="text-xs text-[#626D79] flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#245A91]" />
                  <span>{author.location}</span>
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#626D79] leading-relaxed">
                {author.bio}
              </p>

              <div className="pt-2 border-t border-[#E4E9EF] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#D97706]">
                  विशेष: {author.specialization}
                </span>
                <span className="text-[#626D79] font-mono">
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

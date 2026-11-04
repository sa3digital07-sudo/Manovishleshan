import React from 'react';
import { PageView } from '../types';
import { EXPERTS_DATA } from '../data/mockData';
import { Award, BookOpen, MessageSquare, Mic, ArrowRight } from 'lucide-react';

interface ExpertsViewProps {
  setCurrentPage: (page: PageView) => void;
}

export const ExpertsView: React.FC<ExpertsViewProps> = ({ setCurrentPage }) => {
  return (
    <div className="space-y-12">
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#176B68]">
          सल्लागार परिषद
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#202A35] leading-tight">
          तज्ज्ञ सल्लागार मंडळ (Editorial & Clinical Experts)
        </h1>
        <p className="text-base sm:text-lg text-[#5D6B63] leading-relaxed">
          मासिक मनोविश्लेषणच्या प्रत्येक अंकाची शास्त्रीय तपासणी आणि वाचकांच्या प्रश्नांना अचूक मार्गदर्शन करणारे महाराष्ट्रातील अग्रगण्य तज्ज्ञ.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {EXPERTS_DATA.map((expert) => (
          <div
            key={expert.id}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-[#202A35]/10 shadow-sm flex flex-col justify-between space-y-6"
          >
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-200 shrink-0 border-2 border-white shadow-md">
                <img
                  src={expert.avatar}
                  alt={expert.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1 flex-1">
                <h3 className="font-serif font-bold text-xl text-[#202A35]">{expert.name}</h3>
                <p className="text-xs font-semibold text-[#A64F35] flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-[#D7B56D]" />
                  <span>{expert.qualification}</span>
                </p>
                <p className="text-xs text-[#176B68] font-medium">{expert.title}</p>
                <p className="text-[11px] text-[#5D6B63]">{expert.experienceYears} वर्षे रुग्णसेवा अनुभव</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#5D6B63] leading-relaxed">
              {expert.bio}
            </p>

            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#F7F4EE] border border-[#202A35]/10 text-center text-xs">
              <div>
                <span className="text-[11px] text-[#5D6B63] block">लेख</span>
                <strong className="text-sm font-serif text-[#202A35]">
                  {expert.contributions.articles}
                </strong>
              </div>
              <div>
                <span className="text-[11px] text-[#5D6B63] block">मुलाखती</span>
                <strong className="text-sm font-serif text-[#202A35]">
                  {expert.contributions.interviews}
                </strong>
              </div>
              <div>
                <span className="text-[11px] text-[#5D6B63] block">उत्तरित प्रश्न</span>
                <strong className="text-sm font-serif text-[#202A35]">
                  {expert.contributions.answersGiven}
                </strong>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-[#5D6B63]">
                विशेष प्रावीण्य: <strong>{expert.specialization}</strong>
              </span>
              <button
                onClick={() => setCurrentPage('qa')}
                className="text-xs font-semibold text-[#176B68] hover:text-[#135855] inline-flex items-center gap-1"
              >
                <span>यांचे मार्गदर्शन पहा</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

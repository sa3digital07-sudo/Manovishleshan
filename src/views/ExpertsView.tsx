import React from 'react';
import { PageView } from '../types';
import { EXPERTS_DATA } from '../data/mockData';
import { Award, ArrowRight } from 'lucide-react';

interface ExpertsViewProps {
  setCurrentPage: (page: PageView) => void;
}

export const ExpertsView: React.FC<ExpertsViewProps> = ({ setCurrentPage }) => {
  return (
    <div className="space-y-10 sm:space-y-12">
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="h-0.5 w-6 bg-[#245A91]" />
          <span className="text-xs font-bold text-[#245A91] tracking-wider uppercase">
            सल्लागार परिषद
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#252D38] leading-tight">
          तज्ज्ञ सल्लागार मंडळ (Editorial & Clinical Experts)
        </h1>
        <p className="text-sm sm:text-base text-[#626D79] leading-relaxed">
          मासिक मनोविश्लेषणच्या प्रत्येक अंकाची शास्त्रीय तपासणी आणि वाचकांच्या प्रश्नांना अचूक मार्गदर्शन करणारे महाराष्ट्रातील अग्रगण्य मानसोपचार अभ्यासक व समुपदेशक.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {EXPERTS_DATA.map((expert) => (
          <div
            key={expert.id}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E4E9EF] shadow-xs flex flex-col justify-between space-y-6"
          >
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border-2 border-white shadow-xs">
                <img
                  src={expert.avatar}
                  alt={expert.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1 flex-1">
                <h3 className="font-bold text-xl text-[#252D38]">{expert.name}</h3>
                <p className="text-xs font-semibold text-[#D97706] flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-[#F2C14E]" />
                  <span>{expert.qualification}</span>
                </p>
                <p className="text-xs text-[#245A91] font-bold">{expert.title}</p>
                <p className="text-[11px] text-[#626D79]">{expert.experienceYears} वर्षे रुग्णसेवा अनुभव</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#626D79] leading-relaxed">
              {expert.bio}
            </p>

            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#F5F7FA] border border-[#E4E9EF] text-center text-xs">
              <div>
                <span className="text-[11px] text-[#626D79] block">लेख</span>
                <strong className="text-sm font-bold text-[#252D38]">
                  {expert.contributions.articles}
                </strong>
              </div>
              <div>
                <span className="text-[11px] text-[#626D79] block">मुलाखती</span>
                <strong className="text-sm font-bold text-[#252D38]">
                  {expert.contributions.interviews}
                </strong>
              </div>
              <div>
                <span className="text-[11px] text-[#626D79] block">उत्तरित प्रश्न</span>
                <strong className="text-sm font-bold text-[#252D38]">
                  {expert.contributions.answersGiven}
                </strong>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-[#E4E9EF]">
              <span className="text-xs text-[#626D79]">
                विशेष प्रावीण्य: <strong className="text-[#252D38]">{expert.specialization}</strong>
              </span>
              <button
                onClick={() => setCurrentPage('qa')}
                className="text-xs font-bold text-[#245A91] hover:underline inline-flex items-center gap-1"
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

import React, { useState } from 'react';
import { PageView, Professional } from '../types';
import { PROFESSIONALS_DIRECTORY } from '../data/mockData';
import { filterProfessionals } from '../utils/magazineLogic';
import {
  Search,
  MapPin,
  Phone,
  ShieldCheck,
  CheckCircle,
  Building,
  Languages,
  Award,
  AlertCircle,
} from 'lucide-react';

interface DirectoryViewProps {
  setCurrentPage: (page: PageView) => void;
}

export const DirectoryView: React.FC<DirectoryViewProps> = ({ setCurrentPage }) => {
  const [selectedRole, setSelectedRole] = useState('सर्व');
  const [selectedCity, setSelectedCity] = useState('सर्व');
  const [searchKeyword, setSearchKeyword] = useState('');

  const roles = [
    'सर्व',
    'मानसोपचारतज्ज्ञ',
    'क्लिनिकल सायकॉलॉजिस्ट',
    'मानसोपचार समुपदेशक',
  ];

  const cities = ['सर्व', 'पुणे', 'मुंबई', 'नाशिक', 'नागपूर'];

  const filteredProfessionals = filterProfessionals(
    PROFESSIONALS_DIRECTORY,
    selectedRole,
    selectedCity,
    searchKeyword
  );

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#176B68]">
          मानसिक आरोग्य सहाय्य
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#202A35] leading-tight">
          तज्ज्ञ मानसोपचारतज्ज्ञ व समुपदेशक मार्गदर्शिका
        </h1>
        <p className="text-base sm:text-lg text-[#5D6B63] leading-relaxed">
          महाराष्ट्रातील प्रमुख शहरांमधील नोंदणीकृत, अनुभवी मानसोपचारतज्ज्ञ (Psychiatrists), क्लिनिकल सायकॉलॉजिस्ट आणि समुपदेशकांची अधिकृत माहिती.
        </p>
      </div>

      {/* Demo Advisory Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-semibold block">प्रात्यक्षिक मार्गदर्शिका सूचना (Demo UI Notice):</strong>
          <p className="leading-relaxed">
            या पृष्ठावरील सर्व प्रोफाईल्स, नोंदणी क्रमांक आणि संपर्क माहिती केवळ फ्रंटएंड डिझाइन प्रात्यक्षिकासाठी (Fictional Demo Profiles) तयार केली आहे. येथे थेट अपॉइंटमेंट बुकिंग किंवा प्रत्यक्ष डॉक्टर तपासणी सुविधा कार्यान्वित नाही.
          </p>
        </div>
      </div>

      {/* Filter and Search Box */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#202A35]/10 shadow-sm space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#5D6B63] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="नाव, परिसर किंवा पिनकोड शोधा (उदा. कोथरूड, दादर, ४११००५)..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#F7F4EE] border border-[#202A35]/15 text-sm sm:text-base text-[#202A35] placeholder-[#5D6B63]/60 focus:outline-none focus:border-[#176B68]"
          />
        </div>

        {/* Roles & City Filters */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Role Tabs (8 cols) */}
          <div className="md:col-span-8 flex flex-wrap items-center gap-1.5 p-1 bg-[#F7F4EE] rounded-xl text-xs font-semibold">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRole(r)}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  selectedRole === r
                    ? 'bg-[#176B68] text-white shadow-sm'
                    : 'text-[#5D6B63] hover:text-[#202A35]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* City Dropdown (4 cols) */}
          <div className="md:col-span-4 flex items-center gap-2 justify-end text-xs">
            <span className="text-[#5D6B63] font-semibold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>शहर निवडा:</span>
            </span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3 py-2 rounded-lg bg-[#F7F4EE] border border-[#202A35]/15 text-xs text-[#202A35] font-semibold focus:outline-none focus:border-[#176B68]"
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c === 'सर्व' ? 'सर्व शहरे' : c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Directory Cards Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs text-[#5D6B63]">
          <span>
            उपलब्ध तज्ज्ञ: <strong>{filteredProfessionals.length}</strong>
          </span>
          {(searchKeyword || selectedRole !== 'सर्व' || selectedCity !== 'सर्व') && (
            <button
              onClick={() => {
                setSearchKeyword('');
                setSelectedRole('सर्व');
                setSelectedCity('सर्व');
              }}
              className="text-[#A64F35] font-semibold hover:underline"
            >
              फिल्टर्स पूर्ववत करा
            </button>
          )}
        </div>

        {filteredProfessionals.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white border border-[#202A35]/10 space-y-2">
            <p className="font-serif font-bold text-lg text-[#202A35]">
              या निकषांशी जुळणारे तज्ज्ञ आढळले नाहीत
            </p>
            <p className="text-xs text-[#5D6B63]">
              कृपया शहर किंवा परिसराचा शब्द बदलून पुन्हा प्रयत्न करा.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessionals.map((prof) => (
              <div
                key={prof.id}
                className="p-6 rounded-2xl bg-white border border-[#202A35]/10 shadow-sm hover:border-[#176B68] transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Top verified badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-[#202A35] leading-snug">
                        {prof.name}
                      </h3>
                      <p className="text-xs text-[#176B68] font-semibold">{prof.role}</p>
                    </div>
                    {prof.isVerified && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200 shrink-0">
                        <CheckCircle className="w-3 h-3" />
                        <span>सत्यापित</span>
                      </span>
                    )}
                  </div>

                  {/* Qualifications & Reg */}
                  <div className="space-y-1 text-xs text-[#5D6B63]">
                    <p className="flex items-center gap-1.5 font-medium text-[#202A35]">
                      <Award className="w-3.5 h-3.5 text-[#D7B56D]" />
                      <span>{prof.qualification}</span>
                    </p>
                    <p className="text-[11px]">नोंदणी: {prof.regNumber}</p>
                    <p className="text-[11px]">अनुभव: {prof.experience}</p>
                  </div>

                  {/* Specialization */}
                  <div className="p-2.5 rounded-xl bg-[#F7F4EE] text-xs text-[#202A35]">
                    <span className="font-semibold text-[#A64F35] block mb-0.5">
                      विशेष प्रावीण्य:
                    </span>
                    <span className="leading-relaxed">{prof.specialization}</span>
                  </div>

                  {/* Address & Mode */}
                  <div className="space-y-1.5 text-xs text-[#5D6B63]">
                    <p className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#176B68] shrink-0 mt-0.5" />
                      <span>{prof.address}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-[#5D6B63] shrink-0" />
                      <span>पद्धत: {prof.consultationType}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Languages className="w-3.5 h-3.5 text-[#5D6B63] shrink-0" />
                      <span>भाषा: {prof.languages.join(', ')}</span>
                    </p>
                  </div>
                </div>

                {/* Footer contact & action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-mono text-[#5D6B63]">{prof.phone}</span>
                  <button
                    onClick={() => {
                      alert(`सल्लागार माहिती:\nनाव: ${prof.name}\nपत्ता: ${prof.address}\n\n(ही प्रात्यक्षिक माहिती आहे, थेट बुकिंग सध्या उपलब्ध नाही)`);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-[#E5ECE6] hover:bg-[#176B68] hover:text-white text-[#176B68] text-xs font-semibold transition-colors"
                  >
                    तपशील पहा
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

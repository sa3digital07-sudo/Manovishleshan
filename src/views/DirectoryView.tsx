import React, { useState } from 'react';
import { PageView, Professional } from '../types';
import { PROFESSIONALS_DIRECTORY } from '../data/mockData';
import { filterProfessionals } from '../utils/magazineLogic';
import {
  Search,
  MapPin,
  Building,
  Languages,
  Award,
  AlertCircle,
  CheckCircle,
  X,
  Phone,
} from 'lucide-react';

interface DirectoryViewProps {
  setCurrentPage: (page: PageView) => void;
}

export const DirectoryView: React.FC<DirectoryViewProps> = ({ setCurrentPage }) => {
  const [selectedRole, setSelectedRole] = useState('सर्व');
  const [selectedCity, setSelectedCity] = useState('सर्व');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedProfModal, setSelectedProfModal] = useState<Professional | null>(null);

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
    <div className="space-y-10 sm:space-y-12">
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="h-0.5 w-6 bg-[#245A91]" />
          <span className="text-xs font-bold text-[#245A91] tracking-wider uppercase">
            मानसिक आरोग्य सहाय्य
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#252D38] leading-tight">
          तज्ज्ञ मानसोपचारतज्ज्ञ व समुपदेशक मार्गदर्शिका
        </h1>
        <p className="text-sm sm:text-base text-[#626D79] leading-relaxed">
          महाराष्ट्रातील प्रमुख शहरांमधील नोंदणीकृत, अनुभवी मानसोपचारतज्ज्ञ (Psychiatrists), क्लिनिकल सायकॉलॉजिस्ट आणि समुपदेशकांची अधिकृत माहिती.
        </p>
      </div>

      {/* Advisory Banner */}
      <div className="p-4 rounded-2xl bg-[#EBF3FA] border border-[#245A91]/20 text-[#20354D] text-xs sm:text-sm flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-[#245A91] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-bold block">प्रात्यक्षिक मार्गदर्शिका सूचना (Demo UI Notice):</strong>
          <p className="leading-relaxed text-xs">
            या पृष्ठावरील सर्व प्रोफाईल्स आणि संपर्क माहिती केवळ डिझाइन प्रात्यक्षिकासाठी तयार केली आहे. येथे थेट डॉक्टर तपासणी किंवा अपॉइंटमेंट सुविधा जोडलेली नाही.
          </p>
        </div>
      </div>

      {/* Filter and Search Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E4E9EF] shadow-xs space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#626D79] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="नाव, परिसर किंवा पिनकोड शोधा (उदा. कोथरूड, दादर, ४११००५)..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#F5F7FA] border border-[#E4E9EF] text-sm text-[#252D38] placeholder-[#626D79]/60 focus:outline-none focus:border-[#245A91]"
          />
        </div>

        {/* Roles & City Filters */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Role Tabs */}
          <div className="md:col-span-8 flex flex-wrap items-center gap-1.5 p-1 bg-[#F5F7FA] rounded-xl text-xs font-semibold border border-[#E4E9EF]">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRole(r)}
                className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  selectedRole === r
                    ? 'bg-[#245A91] text-white shadow-xs font-bold'
                    : 'text-[#626D79] hover:text-[#252D38]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* City Dropdown */}
          <div className="md:col-span-4 flex items-center gap-2 justify-end text-xs">
            <span className="text-[#626D79] font-bold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#245A91]" />
              <span>शहर निवडा:</span>
            </span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-[#F5F7FA] border border-[#E4E9EF] text-xs text-[#252D38] font-semibold focus:outline-none focus:border-[#245A91]"
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
        <div className="flex items-center justify-between text-xs text-[#626D79]">
          <span>
            उपलब्ध तज्ज्ञ: <strong className="text-[#252D38]">{filteredProfessionals.length}</strong>
          </span>
          {(searchKeyword || selectedRole !== 'सर्व' || selectedCity !== 'सर्व') && (
            <button
              onClick={() => {
                setSearchKeyword('');
                setSelectedRole('सर्व');
                setSelectedCity('सर्व');
              }}
              className="text-[#DC2626] font-semibold hover:underline"
            >
              फिल्टर्स पूर्ववत करा
            </button>
          )}
        </div>

        {filteredProfessionals.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white border border-[#E4E9EF] space-y-2">
            <p className="font-bold text-lg text-[#252D38]">
              या निकषांशी जुळणारे तज्ज्ञ आढळले नाहीत
            </p>
            <p className="text-xs text-[#626D79]">
              कृपया शहर किंवा परिसराचा शब्द बदलून पुन्हा प्रयत्न करा.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessionals.map((prof) => (
              <div
                key={prof.id}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E4E9EF] shadow-xs hover:border-[#245A91] transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-lg text-[#252D38] leading-snug">
                        {prof.name}
                      </h3>
                      <p className="text-xs text-[#245A91] font-bold">{prof.role}</p>
                    </div>
                    {prof.isVerified && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200 shrink-0">
                        <CheckCircle className="w-3 h-3" />
                        <span>सत्यापित</span>
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 text-xs text-[#626D79]">
                    <p className="flex items-center gap-1.5 font-semibold text-[#252D38]">
                      <Award className="w-3.5 h-3.5 text-[#F2C14E]" />
                      <span>{prof.qualification}</span>
                    </p>
                    <p className="text-[11px]">नोंदणी: {prof.regNumber}</p>
                    <p className="text-[11px]">अनुभव: {prof.experience}</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#F5F7FA] border border-[#E4E9EF] text-xs text-[#252D38]">
                    <span className="font-bold text-[#D97706] block mb-0.5">
                      विशेष प्रावीण्य:
                    </span>
                    <span className="leading-relaxed text-[#626D79]">{prof.specialization}</span>
                  </div>

                  <div className="space-y-1 text-xs text-[#626D79]">
                    <p className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#245A91] shrink-0 mt-0.5" />
                      <span>{prof.address}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-[#626D79] shrink-0" />
                      <span>पद्धत: {prof.consultationType}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Languages className="w-3.5 h-3.5 text-[#626D79] shrink-0" />
                      <span>भाषा: {prof.languages.join(', ')}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E4E9EF] flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#252D38]">{prof.phone}</span>
                  <button
                    onClick={() => setSelectedProfModal(prof)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#EBF3FA] hover:bg-[#245A91] hover:text-white text-[#245A91] text-xs font-bold transition-colors"
                  >
                    तपशील पहा
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Professional Detail Modal (No window.alert) */}
      {selectedProfModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn"
        >
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#E4E9EF] p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-lg text-[#252D38]">
                  {selectedProfModal.name}
                </h3>
                <p className="text-xs text-[#245A91] font-bold">
                  {selectedProfModal.role} · {selectedProfModal.city}
                </p>
              </div>
              <button
                onClick={() => setSelectedProfModal(null)}
                aria-label="बंद करा"
                className="p-1 rounded-lg hover:bg-[#F5F7FA] text-[#626D79]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-[#626D79] pt-2 border-t border-[#E4E9EF]">
              <p>
                <strong className="text-[#252D38]">पात्रता:</strong> {selectedProfModal.qualification}
              </p>
              <p>
                <strong className="text-[#252D38]">अनुभव:</strong> {selectedProfModal.experience}
              </p>
              <p>
                <strong className="text-[#252D38]">विशेष प्रावीण्य:</strong> {selectedProfModal.specialization}
              </p>
              <p>
                <strong className="text-[#252D38]">पत्ता:</strong> {selectedProfModal.address}
              </p>
              <p className="flex items-center gap-1.5 pt-1 text-sm font-bold text-[#245A91]">
                <Phone className="w-4 h-4" />
                <span>{selectedProfModal.phone}</span>
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#F5F7FA] text-[11px] text-[#626D79]">
              हे एक प्रात्यक्षिक प्रोफाईल आहे. प्रत्यक्ष उपचारांसाठी थेट स्थानिक हॉस्पिटल किंवा क्लिनिकशी संपर्क साधावा.
            </div>

            <button
              onClick={() => setSelectedProfModal(null)}
              className="w-full py-2.5 rounded-xl bg-[#245A91] text-white font-bold text-xs"
            >
              बंद करा
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

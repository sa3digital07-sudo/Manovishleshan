import React from 'react';
import { PageView } from '../types';
import { Target, Compass } from 'lucide-react';

interface AboutViewProps {
  setCurrentPage: (page: PageView) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ setCurrentPage }) => {
  return (
    <div className="space-y-12 sm:space-y-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <span className="h-0.5 w-6 bg-[#245A91]" />
          <span className="text-xs font-bold text-[#245A91] tracking-wider uppercase">
            व्यासपीठ परिचय
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#252D38] leading-tight">
          मासिक मनोविश्लेषण: विचार, मन आणि अंतर्मनाची ओळख
        </h1>
        <p className="text-sm sm:text-base text-[#626D79] leading-relaxed">
          मराठी भाषेमध्ये शास्त्रीय मानसशास्त्र आणि मानसिक स्वास्थ्य शिक्षणाला प्रतिष्ठा मिळवून देणारे स्वतंत्र डिजिटल व्यासपीठ.
        </p>
      </div>

      {/* Official Emblem & Identity Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#F5F7FA] via-white to-[#EBF3FA] border border-[#E4E9EF] shadow-xs flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
        <div className="relative shrink-0">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-white">
            <img
              src="/assets/aistudio/Logo_5109781a.jpeg"
              alt="मासिक मनोविश्लेषण अधिकृत बोधचिन्ह"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="absolute -bottom-2 -right-1 px-2.5 py-0.5 rounded-full bg-[#245A91] text-white text-[11px] font-bold shadow-xs">
            स्थापना २०११
          </span>
        </div>
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
            अधिकृत बोधचिन्ह व ब्रीदवाक्य
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#20354D]">
            "मानवी मनाचा शोध घेणारे"
          </h2>
          <p className="text-xs sm:text-sm text-[#626D79] leading-relaxed max-w-lg">
            जालना येथून वर्ष २०११ मध्ये सुरू झालेले हे मासिक मराठी मनाला समृद्ध, जागरूक आणि समतोल बनवण्यासाठी कटिबद्ध आहे. बोधचिन्हातील मानवी मुखवटा, वृक्ष आणि संवाद हे अंतर्मनाच्या निरंतर विकासाचे प्रतीक आहेत.
          </p>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="space-y-4 text-base sm:text-lg text-[#252D38] leading-[1.85]">
        <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-[#245A91] first-letter:float-left first-letter:mr-3 first-letter:mt-1">
          मानवी जीवन हे भावना, विचार आणि वर्तनाचे एक सुरेख पण तितकेच गुंतागुंतीचे जाळे आहे. आजच्या युगात आपण तंत्रज्ञानाने कितीही जवळ आलो असलो, तरी स्वतःच्या अंतर्मनापासून मात्र दुरावत चाललो आहोत. मानसिक अस्वस्थता, ताण, भीती आणि नातेसंबंधांमधील दुरावा यावर शास्त्रीय, विश्वासाह्य आणि सोप्या मराठीत मार्गदर्शन करणारी साधने अत्यंत दुर्मिळ आहेत.
        </p>
        <p>
          याच गरजेतून <strong>'मासिक मनोविश्लेषण'</strong> चा जन्म झाला. आम्ही मानसशास्त्राला क्लिष्ट वैद्यकीय परिभाषांच्या चौकटीतून बाहेर काढून प्रत्येक सर्वसामान्य माणसाच्या, विद्यार्थ्याच्या, पालकाच्या आणि आजी-आजोबांच्या रोजच्या जगण्याशी जोडतो.
        </p>
      </div>

      {/* Vision & Mission Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E4E9EF] shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#EBF3FA] text-[#245A91] flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-xl sm:text-2xl text-[#252D38]">आमची दृष्टी (Vision)</h3>
          <p className="text-xs sm:text-sm text-[#626D79] leading-relaxed">
            प्रत्येक मराठी घरात मानसिक आरोग्याविषयी कोणताही न्यूनगंड किंवा भीती न बाळगता मोकळेपणाने चर्चा व्हावी; आणि प्रत्येकाला भावनिक स्वास्थ्याचे शास्त्रशुद्ध ज्ञान सहज उपलब्ध व्हावे.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E4E9EF] shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FEF9E7] text-[#D97706] flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-xl sm:text-2xl text-[#252D38]">आमचे ध्येय (Mission)</h3>
          <p className="text-xs sm:text-sm text-[#626D79] leading-relaxed">
            आंतरराष्ट्रीय दर्जाच्या संशोधनाची मराठीत मांडणी करणे, अंधश्रद्धा व गैरसमजांचे उच्चाटन करणे आणि नोंदणीकृत मानसोपचार अभ्यासकांच्या मदतीने विश्वासू मार्गदर्शन पुरवणे.
          </p>
        </div>
      </div>

      {/* Reader Demographics */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#F5F7FA] border border-[#E4E9EF] space-y-5">
        <h3 className="font-bold text-xl sm:text-2xl text-[#252D38]">
          आमचा वाचक वर्ग कोण आहे?
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white space-y-1.5 border border-[#E4E9EF] shadow-xs">
            <strong className="font-bold text-sm sm:text-base text-[#245A91] block">
              युवा वर्ग व विद्यार्थी
            </strong>
            <p className="text-xs text-[#626D79] leading-relaxed">
              करिअरची काळजी, सोशल मीडियाची तुलना आणि स्वतःचा शोध घेणारे तरुण मन.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white space-y-1.5 border border-[#E4E9EF] shadow-xs">
            <strong className="font-bold text-sm sm:text-base text-[#D97706] block">
              व्यावसायिक व नोकरदार
            </strong>
            <p className="text-xs text-[#626D79] leading-relaxed">
              कामाचा ताण (Burnout), कामाचा समतोल आणि भावनिक बुद्धिमत्ता विकसित करू इच्छिणारे.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white space-y-1.5 border border-[#E4E9EF] shadow-xs">
            <strong className="font-bold text-sm sm:text-base text-[#245A91] block">
              पालक आणि कुटुंबे
            </strong>
            <p className="text-xs text-[#626D79] leading-relaxed">
              मुलांचा भावनिक विकास, परीक्षेचा ताण आणि सुसंवादी कौटुंबिक नातेसंबंध.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white space-y-1.5 border border-[#E4E9EF] shadow-xs">
            <strong className="font-bold text-sm sm:text-base text-[#F2C14E] block">
              ज्येष्ठ नागरिक
            </strong>
            <p className="text-xs text-[#626D79] leading-relaxed">
              निवृत्तीनंतरचे मानसिक स्वास्थ्य, एकाकीपणावर मात आणि आनंदी जीवनशैली.
            </p>
          </div>
        </div>
      </div>

      {/* Editorial Values */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E4E9EF] space-y-4 shadow-xs">
        <h3 className="font-bold text-xl sm:text-2xl text-[#252D38]">
          संपादकीय तत्त्वे (Editorial Principles)
        </h3>
        <ul className="space-y-2 text-xs sm:text-sm text-[#626D79]">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#245A91] mt-2 shrink-0" />
            <span><strong className="text-[#252D38]">सत्यता व विज्ञान:</strong> कोणताही लेख किंवा दावा वैज्ञानिक पुराव्याशिवाय प्रसिद्ध केला जात नाही.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#245A91] mt-2 shrink-0" />
            <span><strong className="text-[#252D38]">सुलभ व रसाळ मराठी:</strong> कठीण मानसशास्त्रीय संकल्पना मराठीत अशा प्रकारे मांडणे जे वाचकाच्या मनाला स्पर्श करेल.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#245A91] mt-2 shrink-0" />
            <span><strong className="text-[#252D38]">संवेदनशीलता व आदर:</strong> मानसिक आजारांकडे करुणेने आणि संवेदनशीलतेने पाहण्याची दृष्टी देणे.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

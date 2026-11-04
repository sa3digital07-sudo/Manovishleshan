import React, { useState } from 'react';
import { PageView, Publication, Article } from '../types';
import {
  PUBLICATIONS_DATA,
  ARTICLES_DATA,
  EXPERTS_DATA,
  QA_DATA,
} from '../data/mockData';
import { AdvertisementBanner } from '../components/AdvertisementBanner';
import { HomeIntroSection } from '../components/HomeIntroSection';
import {
  BookOpen,
  ArrowRight,
  Brain,
  Sparkles,
  Heart,
  Compass,
  Users,
  Search,
  CheckCircle,
  HelpCircle,
  Feather,
  Calendar,
  Clock,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Check,
} from 'lucide-react';

interface HomeViewProps {
  setCurrentPage: (page: PageView) => void;
  onSelectPublication: (pub: Publication) => void;
  onSelectArticle: (article: Article) => void;
  onOpenReader: () => void;
  onRequestRead?: (pub?: Publication) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setCurrentPage,
  onSelectPublication,
  onSelectArticle,
  onOpenReader,
  onRequestRead,
}) => {
  // Magazine carousel state for Website A hero layout
  const [activeIssueIndex, setActiveIssueIndex] = useState(0);
  const magazineIssues = PUBLICATIONS_DATA.filter((p) => p.category === 'मासिक अंक');
  const activeIssue = magazineIssues[activeIssueIndex] || PUBLICATIONS_DATA[0];

  // Self-assessment resilience quiz state
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});

  const handlePrevIssue = () => {
    setActiveIssueIndex((prev) => (prev === 0 ? magazineIssues.length - 1 : prev - 1));
  };

  const handleNextIssue = () => {
    setActiveIssueIndex((prev) => (prev === magazineIssues.length - 1 ? 0 : prev + 1));
  };

  const featuredArticles = ARTICLES_DATA.slice(0, 3);

  const quizQuestions = [
    {
      q: '१. अनपेक्षित संकट किंवा ताण आल्यास आपण लगेच विचलित होता की शांत राहून मार्ग शोधता?',
      options: ['लगेच विचलित होतो', 'काही वेळात सावरतो', 'शांत राहून मार्ग शोधतो'],
    },
    {
      q: '२. दिवसभरात सतत भूतकाळातील चुकांचा किंवा भविष्यातील चिंतेचा विचार येतो का?',
      options: ['हो, खूप जास्त येतो', 'कधीकधी येतो', 'फारसा येत नाही, वर्तमानात राहतो'],
    },
    {
      q: '३. स्वतःच्या भावना मित्रांसोबत किंवा कुटुंबासोबत मोकळेपणाने व्यक्त करू शकता का?',
      options: ['अजिबात नाही, मनात दाबून ठेवतो', 'काही मोजक्या लोकांसोबत', 'हो, मोकळेपणाने सांगतो'],
    },
  ];

  const handleSelectQuizOption = (qIdx: number, optIdx: number) => {
    const updated = { ...selectedAnswers, [qIdx]: optIdx };
    setSelectedAnswers(updated);
    if (Object.keys(updated).length === quizQuestions.length) {
      const sum = Object.values(updated).reduce((a, b) => a + b, 0);
      setQuizScore(sum);
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* 0. HOMEPAGE INTRODUCTION (Marathi Editorial Constitution) */}
      <HomeIntroSection
        onReadLatest={() => (onRequestRead ? onRequestRead(activeIssue) : onOpenReader())}
        onExploreMore={() => setCurrentPage('about')}
      />

      {/* 1. HERO SECTION — Website A Editorial Direction with Carousel */}
      <section className="pt-2 sm:pt-4">
        <div className="rounded-3xl bg-gradient-to-br from-[#F5F7FA] via-white to-[#EBF3FA]/40 border border-[#E4E9EF] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xs relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Magazine Cover with Prev/Next Controls (Website A Style) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="relative flex items-center justify-center w-full max-w-[340px]">
                {/* Previous Button */}
                <button
                  type="button"
                  onClick={handlePrevIssue}
                  aria-label="मागील अंक"
                  className="absolute -left-3 sm:-left-5 z-20 w-10 h-10 rounded-full bg-white border border-[#E4E9EF] shadow-md hover:bg-[#F5F7FA] text-[#245A91] flex items-center justify-center transition-all hover:scale-105 focus-visible:outline-2 focus-visible:outline-[#245A91]"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Magazine 3D Cover */}
                <div
                  onClick={() => {
                    if (onRequestRead) {
                      onRequestRead(activeIssue);
                    } else {
                      onSelectPublication(activeIssue);
                      onOpenReader();
                    }
                  }}
                  className="relative group cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                >
                  <div className="w-[240px] sm:w-[280px] aspect-[1/1.414] rounded-xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 relative">
                    <img
                      src={activeIssue.coverImage}
                      alt={activeIssue.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#20354D]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
                      <span className="text-xs font-bold text-[#F2C14E]">
                        वाचनासाठी क्लिक करा
                      </span>
                      <p className="text-sm font-semibold">{activeIssue.title}</p>
                    </div>
                  </div>
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={handleNextIssue}
                  aria-label="पुढील अंक"
                  className="absolute -right-3 sm:-right-5 z-20 w-10 h-10 rounded-full bg-white border border-[#E4E9EF] shadow-md hover:bg-[#F5F7FA] text-[#245A91] flex items-center justify-center transition-all hover:scale-105 focus-visible:outline-2 focus-visible:outline-[#245A91]"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Carousel Indicators */}
              <div className="flex items-center gap-1.5 mt-4">
                {magazineIssues.map((issue, idx) => (
                  <button
                    key={issue.id}
                    onClick={() => setActiveIssueIndex(idx)}
                    aria-label={`अंक ${idx + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      activeIssueIndex === idx ? 'w-6 bg-[#245A91]' : 'w-2 bg-[#CBD5E1]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right Column: Editorial Typography Hierarchy */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-6 bg-[#245A91]" />
                <span className="text-xs font-bold text-[#245A91] tracking-wider uppercase">
                  अस्सल मराठी मासिक
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-[#626D79] tracking-wide block">
                  मासिक
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#245A91] leading-none">
                  मनोविश्लेषण
                </h2>
                <p className="text-xs sm:text-sm font-medium text-[#626D79] tracking-wide">
                  मानवी मनाचा शोध घेणारे
                </p>
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#252D38] leading-snug">
                मानसशास्त्र, मानसिक आरोग्य आणि व्यक्तिमत्त्व विकास यांवर प्रकाश टाकणारा विशेष अंक.
              </h1>

              <p className="text-sm sm:text-base text-[#626D79] leading-relaxed max-w-xl">
                मानवी मन समजून घेणे म्हणजेच जीवन समृद्ध करणे — वैज्ञानिक दृष्टिकोन, मानसोपचार संशोधन आणि मानसिक शांततेचा समग्र वेध.
              </p>

              {/* Action Card matching Website A */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E4E9EF] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[#245A91] uppercase tracking-wider">
                      नवीनतम
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#FEF9E7] text-[#B45309] font-bold">
                      {activeIssue.editionMonth}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-[#252D38] leading-snug">
                    {activeIssue.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-[#626D79]">
                    <span>{activeIssue.pages} पाने</span>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-[#F2C14E]">
                      <Star className="w-3.5 h-3.5 fill-[#F2C14E]" />
                      <strong className="text-[#252D38]">{activeIssue.rating}</strong> ({activeIssue.reviewsCount} परीक्षणे)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      if (onRequestRead) {
                        onRequestRead(activeIssue);
                      } else {
                        onSelectPublication(activeIssue);
                        onOpenReader();
                      }
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#245A91] hover:bg-[#1E3A8A] text-white font-bold text-sm transition-all shadow-xs"
                  >
                    <span>अंक वाचा →</span>
                  </button>
                </div>
              </div>

              {/* Quick links */}
              <div className="flex items-center gap-4 text-xs font-semibold text-[#626D79]">
                <button
                  onClick={() => setCurrentPage('publications')}
                  className="hover:text-[#245A91] inline-flex items-center gap-1"
                >
                  <span>सर्व अंक व प्रकाशने पहा</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span>·</span>
                <button
                  onClick={() => setCurrentPage('about')}
                  className="hover:text-[#245A91]"
                >
                  मासिकाविषयी माहिती
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CHIEF EDITOR & ADVISORY BOARD SPOTLIGHT — Website A Exact Feature */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Chief Editor Card */}
        <div className="lg:col-span-6 rounded-2xl bg-[#F6F9FA] border border-[#E4E9EF] p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-xs">
          <div className="flex flex-col items-center text-center shrink-0">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md bg-white p-1">
              <img
                src="/assets/aistudio/Logo_5109781a.jpeg"
                alt="प्रा. युवराज गहेराव"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h4 className="font-bold text-sm text-[#252D38] mt-2">
              प्रा. युवराज गहेराव
            </h4>
            <span className="text-[11px] text-[#626D79] leading-tight">
              मुख्य संपादक — 'मासिक मनोविश्लेषण'
            </span>
          </div>

          <div className="text-xs sm:text-sm text-[#4A5568] leading-relaxed italic border-t sm:border-t-0 sm:border-l border-[#E4E9EF] pt-4 sm:pt-0 sm:pl-6">
            "शिक्षणाची खरी सुरुवात पुस्तकांमधून नव्हे, तर मानवी मनातील जिज्ञासा आणि सुदृढ विचारांमधून होते. 'मासिक मनोविश्लेषण' हे केवळ एक मासिक नसून ती समाजाच्या मानसिक आरोग्याची आणि वैज्ञानिक दृष्टिकोनाची एक चळवळ आहे. प्रत्येक वाचकाला स्वतःचे मन समजून घेता यावे हाच आमचा ध्यास आहे."
          </div>
        </div>

        {/* Advisory Board Card */}
        <div className="lg:col-span-6 rounded-2xl bg-[#EBF3FA]/60 border border-[#E4E9EF] p-6 sm:p-8 flex flex-col justify-between shadow-xs">
          <div className="space-y-3 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#245A91]" />
              <h3 className="font-bold text-sm sm:text-base text-[#20354D] uppercase tracking-wider">
                सल्लागार मंडळ व मार्गदर्शन
              </h3>
            </div>
            <h4 className="font-bold text-base text-[#252D38]">
              डॉ. विनय बाऱ्हाळे / प्रा. राजेश शिरसाठ
            </h4>
            <p className="text-xs sm:text-sm text-[#626D79] leading-relaxed">
              जालना सायकॉलॉजिकल असोसिएशन संचलित तज्ज्ञ मानसोपचारतज्ज्ञ, क्लिनिकल सायकॉलॉजिस्ट, प्राध्यापक आणि समुपदेशकांचे अनुभवी मंडळ. वैज्ञानिक व शास्त्रीय मानकांनुसार दर्जेदार संपादन.
            </p>
          </div>

          <div className="pt-4 border-t border-[#E4E9EF] flex items-center justify-between text-xs">
            <span className="text-[#626D79] font-medium">नोंदणी: महा./३५७/१०/जालना</span>
            <button
              onClick={() => setCurrentPage('experts')}
              className="font-bold text-[#245A91] hover:underline inline-flex items-center gap-1"
            >
              <span>संपूर्ण मंडळ पहा</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. EDITORIAL NOTE & MONTHLY THEME SPLIT */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Editorial Note (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[#E4E9EF] flex flex-col justify-between shadow-xs">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#245A91] flex items-center gap-1.5">
                <Quote className="w-3.5 h-3.5" />
                <span>संपादकीय मनोगत</span>
              </span>
              <span className="text-xs text-[#626D79] font-medium">डॉ. प्रकाश देशमुख</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-[#252D38] leading-snug">
              वादळातील स्थिर दीपगृह: संकटात मनाचा तोल कसा सांभाळाल?
            </h2>

            <p className="text-[#626D79] leading-relaxed text-sm sm:text-base">
              "जेव्हा समुद्रात वादळ उठते, तेव्हा दीपगृह वादळाला अडवत नाही; उलट ते आपल्या जागेवर स्थिर राहून दिशा दाखवण्याचे कार्य करते. आपल्या दैनंदिन जीवनातील विवंचना, स्पर्धा आणि अनपेक्षित आव्हानांमध्ये आपले मनही अशाच दीपगृहासारखे स्थिर राखण्याची कला म्हणजेच मानसिक लवचिकता..."
            </p>
          </div>

          <div className="pt-5 border-t border-[#E4E9EF] mt-5 flex items-center justify-between">
            <span className="text-xs text-[#626D79]">
              मुख्य संपादक मंडळ · मानसोपचार अभ्यासक
            </span>
            <button
              onClick={onOpenReader}
              className="text-xs font-bold text-[#245A91] hover:underline inline-flex items-center gap-1"
            >
              <span>पूर्ण संपादकीय वाचा</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Current Monthly Theme (5 cols) */}
        <div className="lg:col-span-5 bg-[#F5F7FA] rounded-2xl p-6 sm:p-8 border border-[#E4E9EF] flex flex-col justify-between shadow-xs">
          <div className="space-y-4">
            <div className="aspect-[16/9] rounded-xl overflow-hidden border border-[#E4E9EF] shadow-xs">
              <img
                src="/assets/images/theme_contemplation_1793724774513.jpg"
                alt="मासिक संकल्पना छायाचित्र"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D97706] block">
              मासिक संकल्पना (Monthly Theme)
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-[#252D38]">
              आंतरिक शांती आणि मानसिक लवचिकता
            </h3>
            <p className="text-xs sm:text-sm text-[#626D79] leading-relaxed">
              स्वतःच्या त्रुटी स्वीकारून कठीण प्रसंगातून पुन्हा फिनिक्स पक्षासारखे भरारी घेण्याची आंतरिक क्षमता समजून घेणारा विशेष अभ्यास.
            </p>
          </div>

          <button
            onClick={onOpenReader}
            className="mt-5 w-full py-2.5 px-4 rounded-xl bg-[#20354D] hover:bg-[#245A91] text-white text-xs font-bold text-center transition-colors"
          >
            संकल्पनेवरील लेख वाचा
          </button>
        </div>
      </section>

      {/* 4. KEY LEARNINGS — 4 Cards on Clean Surface */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#E4E9EF] shadow-xs space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#245A91]">
            अंकाची फलश्रुती
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#252D38] mt-1">
            या अंकातून वाचक काय शिकतील?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-4 sm:p-5 rounded-xl bg-[#F5F7FA] border border-[#E4E9EF] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#245A91]/10 text-[#245A91] flex items-center justify-center font-bold text-sm">
              १
            </div>
            <h4 className="font-bold text-base text-[#252D38]">
              न्यूरोप्लास्टिसिटीची जादू
            </h4>
            <p className="text-xs text-[#626D79] leading-relaxed">
              मेंदूचे विचार करण्याचे मार्ग कसे नव्याने बदलता येतात आणि जुन्या नकारात्मक सवयी कशा मोडायच्या याचे विज्ञान.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-[#F5F7FA] border border-[#E4E9EF] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#D97706]/10 text-[#D97706] flex items-center justify-center font-bold text-sm">
              २
            </div>
            <h4 className="font-bold text-base text-[#252D38]">
              ग्राउंडिंग तंत्र (५-४-३-२-१)
            </h4>
            <p className="text-xs text-[#626D79] leading-relaxed">
              अचानक येणाऱ्या भीती आणि चिंतेच्या क्षणी अवघ्या २ मिनिटांत मन पुन्हा वर्तमानात स्थिर करण्याची साधी पद्धत.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-[#F5F7FA] border border-[#E4E9EF] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#245A91]/10 text-[#245A91] flex items-center justify-center font-bold text-sm">
              ३
            </div>
            <h4 className="font-bold text-base text-[#252D38]">
              नातेसंबंधातील सक्रिय श्रवण
            </h4>
            <p className="text-xs text-[#626D79] leading-relaxed">
              उत्तर देण्यासाठी न ऐकता जोडीदाराचे मन समजून घेऊन कौटुंबिक गैरसमज आणि कटुता कायमची कशी मिटवावी.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-[#F5F7FA] border border-[#E4E9EF] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center font-bold text-sm">
              ४
            </div>
            <h4 className="font-bold text-base text-[#252D38]">
              लवचिकता स्व-चाचणी
            </h4>
            <p className="text-xs text-[#626D79] leading-relaxed">
              तुमची भावनिक प्रतिकारशक्ती किती आहे हे खालील संवादात्मक चाचणीद्वारे तपासण्याचा विनामूल्य मार्ग.
            </p>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE SELF-ASSESSMENT TEST */}
      <section className="bg-gradient-to-br from-[#EBF3FA] to-white rounded-2xl p-6 sm:p-8 border border-[#E4E9EF] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#245A91] flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-[#245A91]" />
              <span>संवादात्मक मानसशास्त्रीय स्व-मूल्यांकन</span>
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#252D38]">
              तुमची भावनिक लवचिकता (Emotional Resilience) तपासा
            </h2>
            <p className="text-xs sm:text-sm text-[#626D79]">
              खालील ३ सोप्या प्रश्नांची उत्तरे देऊन आपली सद्य मानसिक क्षमता जाणून घ्या:
            </p>
          </div>
          {quizScore !== null && (
            <button
              onClick={() => {
                setSelectedAnswers({});
                setQuizScore(null);
              }}
              className="text-xs font-semibold text-[#245A91] hover:underline"
            >
              पुन्हा सोडवा
            </button>
          )}
        </div>

        <div className="space-y-4">
          {quizQuestions.map((item, qIdx) => (
            <div key={qIdx} className="p-4 rounded-xl bg-white border border-[#E4E9EF] space-y-2.5">
              <p className="text-sm font-semibold text-[#252D38]">{item.q}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {item.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[qIdx] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectQuizOption(qIdx, optIdx)}
                      className={`text-left px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all border flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#245A91] text-white border-[#245A91] shadow-xs'
                          : 'bg-[#F5F7FA] text-[#4A5568] border-[#E4E9EF] hover:border-[#245A91]'
                      }`}
                    >
                      <span>{opt}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {quizScore !== null && (
          <div className="p-5 rounded-xl bg-white border-2 border-[#245A91] space-y-2 animate-fadeIn">
            <div className="flex items-center gap-2 text-[#245A91] font-bold text-sm">
              <CheckCircle className="w-5 h-5" />
              <span>चाचणी निष्कर्ष: {quizScore >= 4 ? 'उत्कृष्ट भावनिक संतुलन!' : 'भावनिक लवचिकता वाढवण्यास वाव आहे.'}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#626D79] leading-relaxed">
              {quizScore >= 4
                ? 'आपण कठीण प्रसंगांना आत्मविश्वासाने सामोरे जाता आणि स्वतःच्या भावनांवर चांगला ताबा राखता. मासिक मनोविश्लेषणमधील ध्यान व न्यूरोसायन्सचे लेख आपले संतुलन टिकवून ठेवण्यास अधिक मदत करतील.'
                : 'आपल्याला अनपेक्षित ताणतणावातून लवकर बाहेर पडण्यासाठी ग्राउंडिंग तंत्र आणि सक्रिय संवादाचा सराव उपयुक्त ठरेल. या अंकातील संपादकीय आणि केस स्टडीज अवश्य वाचा.'}
            </p>
            <div className="pt-2">
              <button
                onClick={() => (onRequestRead ? onRequestRead(activeIssue) : onOpenReader())}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#245A91] hover:underline"
              >
                <span>लवचिकतेवरील विशेष अंक वाचा</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 6. ETHICAL ADVERTISEMENT BANNER */}
      <AdvertisementBanner placement="homepage" />

      {/* 7. ALL PUBLICATIONS & DIGITAL ISSUES */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#245A91]">
              वाचनालय व विशेषांक
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#252D38] mt-1">
              मासिक अंक आणि डिजिटल ई-पुस्तके
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('publications')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#245A91] hover:underline"
          >
            <span>सर्व प्रकाशने पहा ({PUBLICATIONS_DATA.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PUBLICATIONS_DATA.map((pub) => (
            <div
              key={pub.id}
              onClick={() => onSelectPublication(pub)}
              className="bg-white rounded-2xl border border-[#E4E9EF] overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col cursor-pointer"
            >
              <div className="aspect-[16/11] bg-[#F5F7FA] overflow-hidden relative flex items-center justify-center p-3">
                <img
                  src={pub.coverImage}
                  alt={pub.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 text-[11px] font-bold bg-white/95 text-[#245A91] rounded-md shadow-xs border border-[#E4E9EF]">
                  {pub.category}
                </span>
                <span className="absolute top-3 right-3 px-2.5 py-0.5 text-[11px] font-semibold bg-[#20354D]/90 text-white rounded-md">
                  {pub.editionMonth}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="font-bold text-base sm:text-lg text-[#252D38] group-hover:text-[#245A91] transition-colors leading-snug">
                    {pub.title}
                  </h3>
                  <p className="text-xs text-[#626D79] line-clamp-2 leading-relaxed">
                    {pub.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E4E9EF] flex items-center justify-between text-xs text-[#626D79]">
                  <span className="flex items-center gap-1 text-[#F2C14E]">
                    <Star className="w-3.5 h-3.5 fill-[#F2C14E]" />
                    <strong className="text-[#252D38]">{pub.rating}</strong> ({pub.reviewsCount})
                  </span>
                  <span className="font-bold text-[#245A91] group-hover:underline inline-flex items-center gap-1">
                    <span>तपशील पहा</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FEATURED ARTICLES */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
              संशोधन व लेख संग्रह
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#252D38] mt-1">
              महत्त्वाचे मानसशास्त्रीय लेख
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('articles')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#245A91] hover:underline"
          >
            <span>सर्व लेख संग्रह</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredArticles.map((art) => (
            <article
              key={art.id}
              onClick={() => onSelectArticle(art)}
              className="bg-white rounded-2xl border border-[#E4E9EF] overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col cursor-pointer"
            >
              <div className="aspect-[16/10] bg-[#F5F7FA] overflow-hidden">
                <img
                  src={art.coverImage}
                  alt={art.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#626D79]">
                    <span className="font-bold text-[#245A91] bg-[#EBF3FA] px-2 py-0.5 rounded">
                      {art.category}
                    </span>
                    <span>·</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h3 className="font-bold text-base text-[#252D38] group-hover:text-[#245A91] transition-colors leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-[#626D79] line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E4E9EF] flex items-center justify-between text-xs text-[#626D79]">
                  <span className="font-medium text-[#252D38]">{art.author}</span>
                  <span>{art.publishedDate}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 9. SPECIALIZED COLUMNS / DEPARTMENTS */}
      <section className="bg-[#F5F7FA] rounded-3xl p-6 sm:p-10 border border-[#E4E9EF] space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#245A91]">
            स्तंभ व विभाग
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#252D38] mt-1">
            मानवी जीवन, मेंदू आणि मानसिक स्वास्थ्य
          </h2>
          <p className="text-xs sm:text-sm text-[#626D79] mt-1">
            वेगवेगळ्या वयोगटातील वाचकांसाठी शास्त्रीय माहिती आणि व्यावहारिक मार्गदर्शन.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            onClick={onOpenReader}
            className="p-5 rounded-2xl bg-white border border-[#E4E9EF] hover:border-[#245A91] transition-all cursor-pointer space-y-2 group shadow-xs"
          >
            <div className="flex items-center gap-2 text-[#245A91]">
              <Brain className="w-5 h-5" />
              <h4 className="font-bold text-base text-[#252D38] group-hover:text-[#245A91]">
                मानसशास्त्र उलगडताना (Psychology Explained)
              </h4>
            </div>
            <p className="text-xs text-[#626D79] leading-relaxed">
              न्यूरोसायन्स, मेंदूतील रसायने आणि वर्तणुकीचे शास्त्र सोप्या मराठी भाषेत.
            </p>
          </div>

          <div
            onClick={onOpenReader}
            className="p-5 rounded-2xl bg-white border border-[#E4E9EF] hover:border-[#245A91] transition-all cursor-pointer space-y-2 group shadow-xs"
          >
            <div className="flex items-center gap-2 text-[#D97706]">
              <Users className="w-5 h-5" />
              <h4 className="font-bold text-base text-[#252D38] group-hover:text-[#D97706]">
                नातेसंबंध कट्टा (Relationships Corner)
              </h4>
            </div>
            <p className="text-xs text-[#626D79] leading-relaxed">
              जोडीदार, पालक, मुले आणि सहकाऱ्यांमधील संवादाची वीण घट्ट करणारी सूत्रे.
            </p>
          </div>

          <div
            onClick={onOpenReader}
            className="p-5 rounded-2xl bg-white border border-[#E4E9EF] hover:border-[#245A91] transition-all cursor-pointer space-y-2 group shadow-xs"
          >
            <div className="flex items-center gap-2 text-[#245A91]">
              <Sparkles className="w-5 h-5" />
              <h4 className="font-bold text-base text-[#252D38] group-hover:text-[#245A91]">
                युवा कॉर्नर (Youth & Social Dynamics)
              </h4>
            </div>
            <p className="text-xs text-[#626D79] leading-relaxed">
              सोशल मीडिया, फोमो (FOMO), करिअरचे दडपण आणि स्वतःच्या अस्तित्त्वाची ओळख.
            </p>
          </div>

          <div
            onClick={onOpenReader}
            className="p-5 rounded-2xl bg-white border border-[#E4E9EF] hover:border-[#245A91] transition-all cursor-pointer space-y-2 group shadow-xs"
          >
            <div className="flex items-center gap-2 text-[#F2C14E]">
              <Compass className="w-5 h-5" />
              <h4 className="font-bold text-base text-[#252D38]">
                आत्मविकास प्रयोगशाळा (Self-Improvement Lab)
              </h4>
            </div>
            <p className="text-xs text-[#626D79] leading-relaxed">
              सवयींचे व्यवस्थापन, जर्नल रायटिंग आणि विचार नियंत्रणाचे प्रायोगिक सराव.
            </p>
          </div>

          <div
            onClick={onOpenReader}
            className="p-5 rounded-2xl bg-white border border-[#E4E9EF] hover:border-[#245A91] transition-all cursor-pointer space-y-2 group shadow-xs"
          >
            <div className="flex items-center gap-2 text-[#16A34A]">
              <Heart className="w-5 h-5" />
              <h4 className="font-bold text-base text-[#252D38] group-hover:text-[#16A34A]">
                माइंडफुलनेस आणि वेलनेस (Mindfulness)
              </h4>
            </div>
            <p className="text-xs text-[#626D79] leading-relaxed">
              दररोज १० मिनिटे ध्यान, श्वासोच्छ्वास आणि वर्तमान क्षणात जगण्याचा सराव.
            </p>
          </div>

          <div
            onClick={onOpenReader}
            className="p-5 rounded-2xl bg-white border border-[#E4E9EF] hover:border-[#245A91] transition-all cursor-pointer space-y-2 group shadow-xs"
          >
            <div className="flex items-center gap-2 text-[#245A91]">
              <Feather className="w-5 h-5" />
              <h4 className="font-bold text-base text-[#252D38] group-hover:text-[#245A91]">
                केस स्टडीज (Real Case Studies)
              </h4>
            </div>
            <p className="text-xs text-[#626D79] leading-relaxed">
              बर्नआउट, डिप्रेशन आणि नातेसंबंधांच्या आव्हानांवर मात करणाऱ्या सत्य कथा.
            </p>
          </div>
        </div>
      </section>

      {/* 10. EXPERTS & PROFESSIONAL DIRECTORY PREVIEW */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E4E9EF] shadow-xs space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#245A91]">
              तज्ज्ञ मंडळ व मार्गदर्शिका
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#252D38] mt-1">
              अनुभवी मानसोपचारतज्ज्ञ आणि समुपदेशक
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('directory')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#245A91] text-white text-xs font-bold hover:bg-[#1E3A8A] transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>तज्ज्ञ मार्गदर्शिकेत शोधा</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {EXPERTS_DATA.map((exp) => (
            <div
              key={exp.id}
              onClick={() => setCurrentPage('experts')}
              className="p-4 sm:p-5 rounded-xl bg-[#F5F7FA] border border-[#E4E9EF] space-y-3 cursor-pointer hover:border-[#245A91] transition-colors group"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200 border-2 border-white shadow-xs">
                <img
                  src={exp.avatar}
                  alt={exp.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-base text-[#252D38] group-hover:text-[#245A91]">
                  {exp.name}
                </h4>
                <p className="text-xs text-[#D97706] font-semibold">{exp.qualification}</p>
                <p className="text-[11px] text-[#626D79]">{exp.specialization}</p>
              </div>
              <div className="pt-2 border-t border-[#E4E9EF] text-[11px] text-[#626D79] flex justify-between">
                <span>{exp.experienceYears} वर्षे अनुभव</span>
                <span className="text-[#245A91] font-bold">प्रोफाईल पहा</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. READER Q&A PREVIEW */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#245A91]">
              मार्गदर्शन
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#252D38] mt-1">
              वाचक प्रश्न आणि तज्ज्ञांचे उत्तर
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('qa')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#245A91] hover:underline"
          >
            <span>सर्व प्रश्नोत्तरे पहा</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {QA_DATA.slice(0, 2).map((item) => (
            <div
              key={item.id}
              onClick={() => setCurrentPage('qa')}
              className="p-6 rounded-2xl bg-white border border-[#E4E9EF] shadow-xs hover:border-[#245A91] transition-all cursor-pointer space-y-4"
            >
              <div className="flex items-center justify-between text-xs text-[#626D79]">
                <span className="font-bold text-[#245A91] bg-[#EBF3FA] px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <span>{item.askedBy}</span>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-[#252D38] leading-snug">
                "{item.question}"
              </h3>
              <p className="text-xs sm:text-sm text-[#626D79] line-clamp-3 leading-relaxed">
                {item.expertAnswer}
              </p>
              <div className="pt-3 border-t border-[#E4E9EF] flex items-center justify-between text-xs">
                <span className="font-bold text-[#245A91]">
                  मार्गदर्शन: {item.expertName}
                </span>
                <span className="text-[#626D79]">{item.helpfulCount} वाचकांना उपयुक्त</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 12. UPCOMING ISSUE PREVIEW & CONTRIBUTE TO MANOVISHLESHAN */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Next Month Preview (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-[#F5F7FA] p-6 sm:p-8 border border-[#E4E9EF] space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D97706]">
            <Calendar className="w-4 h-4" />
            <span>पुढील अंकाची पूर्वझलक (डिसेंबर २०२६)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#252D38]">
            विशेषांक: डिजिटल युगातील ताणतणाव आणि डिजिटल डिटॉक्स
          </h3>
          <p className="text-xs sm:text-sm text-[#626D79] leading-relaxed">
            सतत चालू असणाऱ्या नोटिफिकेशन्स, सोशल मीडियाची तुलना आणि डोपामाइन रश यामुळे होणाऱ्या मानसिक त्रासावर शास्त्रीय उपाय. खऱ्या मानवी संवादाची पुनर्स्थापना कशी करावी?
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs px-3 py-1 rounded-full bg-white text-[#252D38] border border-[#E4E9EF] font-medium">
              #डिजिटलडिटॉक्स
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-white text-[#252D38] border border-[#E4E9EF] font-medium">
              #डोपामाइन
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-white text-[#252D38] border border-[#E4E9EF] font-medium">
              #स्क्रीनटाईम
            </span>
          </div>
        </div>

        {/* Contribute Box (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-white p-6 sm:p-8 border border-[#E4E9EF] space-y-4 flex flex-col justify-between shadow-xs">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#245A91] flex items-center gap-1.5">
              <Feather className="w-3.5 h-3.5" />
              <span>लेखक व तज्ज्ञांसाठी आवाहन</span>
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-[#252D38]">
              आपला लेख मनोविश्लेषणमध्ये प्रसिद्ध करा
            </h3>
            <p className="text-xs text-[#626D79] leading-relaxed">
              आपण मानसोपचार, समुपदेशन किंवा मानसशास्त्र संशोधक आहात का? आपले विचारप्रवर्तक लेख आमच्या संपादक मंडळाकडे पाठवा.
            </p>
          </div>

          <button
            onClick={() => setCurrentPage('contact')}
            className="w-full py-2.5 px-4 rounded-xl border border-[#245A91] text-[#245A91] hover:bg-[#245A91] hover:text-white transition-colors text-xs font-bold"
          >
            लेख पाठवण्याचे नियम व संपर्क पहा
          </button>
        </div>
      </section>
    </div>
  );
};

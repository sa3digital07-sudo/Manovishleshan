import React, { useState } from 'react';
import { PageView, QAItem } from '../types';
import { QA_DATA } from '../data/mockData';
import {
  MessageSquare,
  ThumbsUp,
  Send,
  CheckCircle2,
  Lock,
} from 'lucide-react';

interface QuestionsViewProps {
  setCurrentPage: (page: PageView) => void;
}

export const QuestionsView: React.FC<QuestionsViewProps> = () => {
  const [qaList, setQaList] = useState<QAItem[]>(QA_DATA);
  const [questionText, setQuestionText] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('चिंता आणि तणाव');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [submittedToken, setSubmittedToken] = useState<string | null>(null);

  const handleHelpfulClick = (id: string) => {
    setQaList(
      qaList.map((item) =>
        item.id === id ? { ...item, helpfulCount: item.helpfulCount + 1 } : item
      )
    );
  };

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (questionText.trim()) {
      const demoToken = `MNV-QA-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedToken(demoToken);
      setQuestionText('');
      setName('');
    }
  };

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="h-0.5 w-6 bg-[#245A91]" />
          <span className="text-xs font-bold text-[#245A91] tracking-wider uppercase">
            संवाद आणि शंका समाधान
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#252D38] leading-tight">
          वाचक प्रश्न आणि तज्ज्ञ मानसोपचार मार्गदर्शन
        </h1>
        <p className="text-sm sm:text-base text-[#626D79] leading-relaxed">
          आपल्या मनातील भीती, नातेसंबंधांमधील तणाव किंवा दैनंदिन मानसिक समस्यांवर आमच्या तज्ज्ञ मानसोपचार अभ्यासकांचे शास्त्रशुद्ध मार्गदर्शन.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Public Q&A Listing (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-xl font-bold text-[#252D38] flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#245A91]" />
            <span>सार्वजनिक प्रश्नोत्तरे</span>
          </h2>

          <div className="space-y-4">
            {qaList.map((item) => (
              <div
                key={item.id}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E4E9EF] shadow-xs space-y-4"
              >
                {/* Question Info */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-[#626D79]">
                    <span className="font-bold text-[#245A91] uppercase tracking-wider bg-[#EBF3FA] px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <span>{item.date}</span>
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-[#252D38] leading-snug">
                    "{item.question}"
                  </h3>

                  <p className="text-xs text-[#626D79]">
                    विचारणारा: <span className="font-medium text-[#252D38]">{item.askedBy}</span>
                  </p>
                </div>

                {/* Expert Answer Box */}
                <div className="p-4 sm:p-5 rounded-xl bg-[#F5F7FA] border border-[#E4E9EF] space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <strong className="text-xs font-bold text-[#245A91] block">
                        {item.expertName}
                      </strong>
                      <span className="text-[11px] text-[#626D79]">{item.expertRole}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#245A91]/10 text-[#245A91]">
                      तज्ज्ञ सल्ला
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#252D38] leading-relaxed">
                    {item.expertAnswer}
                  </p>
                </div>

                {/* Helpful count */}
                <div className="flex items-center justify-between pt-1 text-xs text-[#626D79]">
                  <span>हे उत्तर उपयुक्त वाटले का?</span>
                  <button
                    onClick={() => handleHelpfulClick(item.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EBF3FA] text-[#245A91] font-bold hover:bg-[#245A91] hover:text-white transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>उपयुक्त ({item.helpfulCount})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Ask a Confidential Question (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#E4E9EF] shadow-xs space-y-5 sticky top-24">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#245A91] flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>गोपनीय सल्ला</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#252D38]">
              तुमचा प्रश्न विचारा
            </h3>
            <p className="text-xs text-[#626D79] leading-relaxed">
              आपली ओळख पूर्णपणे गुप्त ठेवून आपण मानसिक स्वास्थ्य, ताण किंवा नातेसंबंधांविषयी प्रश्न विचारू शकता.
            </p>
          </div>

          {submittedToken ? (
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>आपला प्रश्न यशस्वीरीत्या नोंदवला गेला आहे!</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                आमचे तज्ज्ञ मंडळ आपल्या प्रश्नाचा अभ्यास करेल. उत्तर प्रसिद्ध झाल्यावर संदर्भ क्रमांक:
              </p>
              <div className="p-2.5 bg-white rounded-xl border border-emerald-300 font-mono text-center text-sm font-bold text-[#245A91]">
                {submittedToken}
              </div>
              <button
                onClick={() => setSubmittedToken(null)}
                className="w-full py-2 px-3 rounded-lg bg-[#245A91] text-white text-xs font-bold hover:bg-[#1E3A8A] transition-colors"
              >
                आणखी एक प्रश्न विचारा
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitQuestion} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#252D38]">
                  विषयाची वर्गवारी
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FA] border border-[#E4E9EF] text-xs font-medium text-[#252D38] focus:outline-none focus:border-[#245A91]"
                >
                  <option value="चिंता आणि तणाव">चिंता आणि तणाव (Anxiety & Stress)</option>
                  <option value="नातेसंबंध आणि विवाह">नातेसंबंध आणि विवाह (Relationships)</option>
                  <option value="पालकत्व व मुले">पालकत्व व मुले (Parenting)</option>
                  <option value="निद्रानाश व सवयी">निद्रानाश व सवयी (Sleep & Habits)</option>
                  <option value="इतर मानसिक प्रश्न">इतर मानसिक प्रश्न (General)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#252D38]">
                  नाव (ऐच्छिक)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="उदा. राहुल, पुणे (किंवा रिकामे सोडा)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F7FA] border border-[#E4E9EF] text-xs text-[#252D38] placeholder-[#626D79]/60 focus:outline-none focus:border-[#245A91]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#252D38]">
                  आपली अडचण किंवा प्रश्न सविस्तर लिहा *
                </label>
                <textarea
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  required
                  rows={4}
                  placeholder="आपल्याला नेमका काय त्रास होतो आहे? किती दिवसांपासून होत आहे? सविस्तर लिहा..."
                  className="w-full p-3.5 rounded-xl bg-[#F5F7FA] border border-[#E4E9EF] text-xs sm:text-sm text-[#252D38] placeholder-[#626D79]/60 focus:outline-none focus:border-[#245A91]"
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-[#626D79] cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded text-[#245A91] focus:ring-0"
                />
                <span>माझे नाव व ओळख पूर्णपणे गुप्त ठेवा</span>
              </label>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#245A91] hover:bg-[#1E3A8A] text-white text-xs sm:text-sm font-bold transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <span>प्रश्न सबमिट करा (Submit Demo Question)</span>
                <Send className="w-3.5 h-3.5" />
              </button>

              <p className="text-[11px] text-[#626D79] text-center">
                हे प्रात्यक्षिक फॉर्म आहे; तत्काळ आपत्कालीन परिस्थितीत कृपया स्थानिक हेल्पलाईनचा संपर्क साधावा.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

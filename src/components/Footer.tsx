import React, { useState } from 'react';
import { PageView } from '../types';
import { Send, CheckCircle2, Heart } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  const navigateTo = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#202A35] text-[#F7F4EE] border-t border-[#176B68]/30 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#F7F4EE]/10">
          {/* Brand & Purpose (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/Logo_5109781a.jpeg"
                alt="मासिक मनोविश्लेषण बोधचिन्ह"
                className="w-12 h-12 rounded-full object-cover border-2 border-[#D7B56D]/40 shadow-sm shrink-0"
              />
              <div>
                <span className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white block leading-tight">
                  मासिक मनोविश्लेषण
                </span>
                <span className="text-xs text-[#D7B56D] font-medium tracking-wide">
                  मानवी मनाचा शोध घेणारे
                </span>
              </div>
            </div>
            <p className="text-sm text-[#F7F4EE]/80 leading-relaxed max-w-md">
              मराठी भाषेतील अग्रगण्य डिजिटल मानसशास्त्र मासिक आणि मानसिक स्वास्थ्य शिक्षण व्यासपीठ. शास्त्रीय दृष्टिकोन, मानवी संवेदनशीलता आणि व्यावहारिक उपायांचा संगम.
            </p>

            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider text-[#D7B56D] font-semibold block mb-2">
                मनोसंवाद वृत्तपत्र (Newsletter)
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-[#176B68]/30 border border-[#176B68] text-emerald-300 text-sm">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>धन्यवाद! आपण मनोविश्लेषण वृत्तपत्रासाठी यशस्वीरीत्या नोंदणी केली आहे.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="आपला ईमेल पत्ता प्रविष्ट करा..."
                    required
                    aria-label="ईमेल पत्ता"
                    className="flex-1 px-4 py-2.5 rounded-lg bg-[#F7F4EE]/10 border border-[#F7F4EE]/20 text-[#F7F4EE] placeholder-[#F7F4EE]/50 text-sm focus:outline-none focus:border-[#D7B56D]"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#176B68] hover:bg-[#135855] text-white text-sm font-semibold transition-colors shrink-0"
                  >
                    <span>सभासद व्हा</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-serif font-bold text-[#D7B56D] uppercase tracking-wider">
              विभागीय सूची
            </h3>
            <ul className="space-y-2 text-sm text-[#F7F4EE]/75">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-white transition-colors"
                >
                  मुखपृष्ठ
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('publications')}
                  className="hover:text-white transition-colors"
                >
                  डिजिटल मासिक अंक
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('articles')}
                  className="hover:text-white transition-colors"
                >
                  सर्व लेख संग्रह
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('directory')}
                  className="hover:text-white transition-colors"
                >
                  तज्ज्ञ मार्गदर्शिका
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('qa')}
                  className="hover:text-white transition-colors"
                >
                  वाचक प्रश्नोत्तरे
                </button>
              </li>
            </ul>
          </div>

          {/* Editorial & Community (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-serif font-bold text-[#D7B56D] uppercase tracking-wider">
              मासिक व व्यासपीठ
            </h3>
            <ul className="space-y-2 text-sm text-[#F7F4EE]/75">
              <li>
                <button
                  onClick={() => navigateTo('authors')}
                  className="hover:text-white transition-colors"
                >
                  लेखक व संशोधक
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('experts')}
                  className="hover:text-white transition-colors"
                >
                  तज्ज्ञ सल्लागार मंडळ
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors"
                >
                  आमचे उद्दिष्ट व ध्येय
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('faq')}
                  className="hover:text-white transition-colors"
                >
                  नेहमीचे प्रश्न (FAQ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors"
                >
                  लेख पाठवण्यासाठी संपर्क
                </button>
              </li>
            </ul>
          </div>

          {/* Institutional Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-sm text-[#F7F4EE]/80">
            <h3 className="text-sm font-serif font-bold text-[#D7B56D] uppercase tracking-wider">
              कार्यालय व संपर्क
            </h3>
            <p className="leading-relaxed">
              संपादकीय कार्यालय: ५०४, ज्ञानदीप संकुल, सेनापती बापट मार्ग, शिवाजीनगर, पुणे ४११ ०१६.
            </p>
            <p className="text-xs">
              ईमेल: <span className="text-[#D7B56D]">sampark@manovishleshan.org</span>
            </p>
            <p className="text-xs">
              संपादकीय मदत: <span className="text-[#D7B56D]">+91 20 2567 XXXX</span>
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-[#F7F4EE]/60">
              <span>अनुसरण करा:</span>
              <span className="hover:text-[#D7B56D] cursor-pointer">व्हॉट्सॲप चॅनल</span>
              <span>·</span>
              <span className="hover:text-[#D7B56D] cursor-pointer">टेलिग्राम</span>
              <span>·</span>
              <span className="hover:text-[#D7B56D] cursor-pointer">फेसबुक</span>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#F7F4EE]/60">
          <p className="text-center md:text-left max-w-2xl leading-relaxed">
            <strong className="text-[#F7F4EE]/80">वैधानिक सूचना:</strong> मासिक मनोविश्लेषण वरील सर्व माहिती व लेख हे केवळ मानसिक आरोग्य जागृती आणि शिक्षणासाठी आहेत. ही माहिती प्रत्यक्ष वैद्यकीय किंवा मानसोपचार उपचारांचा पर्याय नाही. गंभीर तणावात कृपया तत्काळ नोंदणीकृत मानसोपचारतज्ज्ञांचा सल्ला घ्यावा.
          </p>
          <div className="flex items-center gap-1.5 whitespace-nowrap shrink-0">
            <span>© २०२६ मासिक मनोविश्लेषण. सर्व हक्क राखीव.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { PageView } from '../types';
import { Send, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';

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
      }, 3500);
    }
  };

  const navigateTo = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#20354D] text-[#E4E9EF] border-t border-[#354F88]/40 pt-16 pb-8 mt-16 sm:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand & Purpose (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/Logo_5109781a.jpeg"
                alt="मासिक मनोविश्लेषण"
                className="w-12 h-12 rounded-full object-cover border-2 border-[#F2C14E]/60 shadow-sm shrink-0"
              />
              <div>
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white block leading-tight">
                  मासिक मनोविश्लेषण
                </span>
                <span className="text-xs text-[#F2C14E] font-medium tracking-wide">
                  मानवी मनाचा शोध घेणारे
                </span>
              </div>
            </div>
            <p className="text-sm text-[#E4E9EF]/80 leading-relaxed max-w-md">
              मुलांच्या व पालकांच्या सर्वांगीण विकासासाठी आणि मानसशास्त्रीय मार्गदर्शनासाठी मराठीतील अग्रगण्य डिजिटल मासिक आणि मानसिक स्वास्थ्य शिक्षण व्यासपीठ.
            </p>

            {/* Social Icons matching Website A */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="#"
                aria-label="फेसबुक"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#F2C14E] hover:text-[#20354D] text-white flex items-center justify-center text-xs font-bold transition-colors"
              >
                f
              </a>
              <a
                href="#"
                aria-label="ट्विटर एक्स"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#F2C14E] hover:text-[#20354D] text-white flex items-center justify-center text-xs font-bold transition-colors"
              >
                𝕏
              </a>
              <a
                href="#"
                aria-label="लिंक्डइन"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#F2C14E] hover:text-[#20354D] text-white flex items-center justify-center text-xs font-bold transition-colors"
              >
                in
              </a>
              <a
                href="mailto:manovishleshanjalna@gmail.com"
                aria-label="ईमेल"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#F2C14E] hover:text-[#20354D] text-white flex items-center justify-center text-xs transition-colors"
              >
                ✉
              </a>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider text-[#F2C14E] font-semibold block mb-2">
                मनोसंवाद वृत्तपत्र (Newsletter)
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-[#245A91]/40 border border-[#245A91] text-emerald-300 text-sm">
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
                    className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:border-[#F2C14E]"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#F2C14E] hover:bg-[#E5B542] text-[#20354D] text-sm font-bold transition-colors shrink-0"
                  >
                    <span>सभासद व्हा</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sitemap (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-bold text-[#F2C14E] uppercase tracking-wider">
              साइटमॅप व विभाग
            </h3>
            <ul className="space-y-2 text-sm text-[#E4E9EF]/80">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-[#F2C14E] transition-colors"
                >
                  मुख्यपृष्ठ
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('publications')}
                  className="hover:text-[#F2C14E] transition-colors"
                >
                  मासिक अंक व संग्रह
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('articles')}
                  className="hover:text-[#F2C14E] transition-colors"
                >
                  मानसशास्त्रीय लेख संग्रह
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('directory')}
                  className="hover:text-[#F2C14E] transition-colors"
                >
                  तज्ज्ञ मार्गदर्शिका
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('qa')}
                  className="hover:text-[#F2C14E] transition-colors"
                >
                  वाचक प्रश्नोत्तरे
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-[#F2C14E] transition-colors"
                >
                  आमच्याविषयी व सल्लागार मंडळ
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-[#F2C14E] transition-colors"
                >
                  आपले लेख पाठवा / संपर्क
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details from Website A (4 cols) */}
          <div className="lg:col-span-4 space-y-4 text-sm text-[#E4E9EF]/85">
            <div>
              <h3 className="text-sm font-bold text-[#F2C14E] uppercase tracking-wider mb-2">
                तक्रारी व चौकशीसाठी:
              </h3>
              <p className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-[#F2C14E] shrink-0" />
                <a href="tel:+919850881286" className="hover:text-white">
                  +९१ ९८५०८८१२८६
                </a>
              </p>
              <p className="flex items-center gap-2 text-sm mt-1">
                <Mail className="w-4 h-4 text-[#F2C14E] shrink-0" />
                <a href="mailto:manovishleshanjalna@gmail.com" className="hover:text-white">
                  manovishleshanjalna@gmail.com
                </a>
              </p>
            </div>

            <div className="pt-2 border-t border-white/10">
              <h3 className="text-sm font-bold text-[#F2C14E] uppercase tracking-wider mb-2">
                मदतीसाठी संपर्क:
              </h3>
              <p className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-[#F2C14E] shrink-0" />
                <a href="tel:+919850957757" className="hover:text-white">
                  +९१ ९८५०९५७७५७
                </a>
              </p>
              <p className="text-xs text-[#E4E9EF]/70 mt-2 flex items-start gap-1.5 leading-relaxed">
                <MapPin className="w-3.5 h-3.5 text-[#F2C14E] shrink-0 mt-0.5" />
                <span>जालना सायकॉलॉजिकल असोसिएशन | नोंदणी: महा./३५७/१०/जालना</span>
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#E4E9EF]/65">
          <p className="text-center md:text-left max-w-2xl leading-relaxed">
            <strong className="text-white/90">वैधानिक सूचना:</strong> मासिक मनोविश्लेषण वरील सर्व माहिती व लेख हे केवळ मानसिक आरोग्य जागृती आणि शिक्षणासाठी आहेत. ही माहिती प्रत्यक्ष वैद्यकीय किंवा मानसोपचार उपचारांचा पर्याय नाही.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 whitespace-nowrap shrink-0 text-center sm:text-right">
            <span>© 2026 All Rights Reserved by Jalna Psychological Association</span>
            <span className="hidden sm:inline">|</span>
            <span className="text-[#F2C14E]">Manovishleshan Magazine</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

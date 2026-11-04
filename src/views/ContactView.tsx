import React, { useState } from 'react';
import { PageView } from '../types';
import { Mail, Phone, MapPin, Send, CheckCircle2, Feather, ShieldCheck } from 'lucide-react';

interface ContactViewProps {
  setCurrentPage: (page: PageView) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'मासिक वाचक अभिप्राय',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: 'मासिक वाचक अभिप्राय',
        message: '',
      });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="space-y-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-4 text-center sm:text-left">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#176B68]">
          संवाद आणि सहकार्य
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#202A35] leading-tight">
          संपर्क आणि लेख योगदान (Contribute)
        </h1>
        <p className="text-base sm:text-lg text-[#5D6B63] leading-relaxed max-w-2xl">
          आपला अभिप्राय, मासिकाविषयीच्या सूचना किंवा मनोविश्लेषण मासिकात लेख प्रसिद्ध करण्यासाठी आमच्याशी संपर्क साधा.
        </p>
      </div>

      {/* Grid: Contact Form (7 cols) + Info & Contribution Guide (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-white border border-[#202A35]/10 shadow-sm space-y-6">
          <h2 className="text-2xl font-serif font-bold text-[#202A35]">
            आम्हाला संदेश पाठवा
          </h2>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 font-bold text-base text-emerald-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>आपला संदेश यशस्वीरीत्या प्राप्त झाला आहे!</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                मनोविश्लेषण संपादक मंडळ आपल्या संदेशाचे पुनरावलोकन करेल आणि आवश्यक असल्यास आपल्या दिलेल्या ईमेलवर संपर्क साधेल. धन्यवाद!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#202A35]">
                  आपले संपूर्ण नाव *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="उदा. डॉ. विनायक देशपांडे"
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F4EE] border border-[#202A35]/15 text-sm text-[#202A35] focus:outline-none focus:border-[#176B68]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#202A35]">
                  ईमेल पत्ता *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="उदा. vinayak@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F4EE] border border-[#202A35]/15 text-sm text-[#202A35] focus:outline-none focus:border-[#176B68]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#202A35]">
                  संदेशाचा विषय
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F7F4EE] border border-[#202A35]/15 text-xs sm:text-sm font-medium text-[#202A35] focus:outline-none focus:border-[#176B68]"
                >
                  <option value="मासिक वाचक अभिप्राय">मासिक वाचक अभिप्राय</option>
                  <option value="लेख प्रसिद्ध करण्यासाठी प्रस्ताव">लेख प्रसिद्ध करण्यासाठी प्रस्ताव</option>
                  <option value="तज्ज्ञ मार्गदर्शिकेत समावेश">तज्ज्ञ मार्गदर्शिकेत समावेश</option>
                  <option value="सांस्कृतिक किंवा शैक्षणिक सहकार्य">सांस्कृतिक किंवा शैक्षणिक सहकार्य</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#202A35]">
                  आपला सविस्तर संदेश किंवा लेखाचा सारांश *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="आपला विचार, सूचना किंवा लेखाचा विषय सविस्तर मांडा..."
                  className="w-full p-4 rounded-xl bg-[#F7F4EE] border border-[#202A35]/15 text-sm text-[#202A35] focus:outline-none focus:border-[#176B68]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[#176B68] hover:bg-[#135855] text-white font-semibold text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>संदेश पाठवा (Send Message)</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Section 23: Article Contribution Guidelines & Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          {/* Contribution Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#E5ECE6]/60 border border-[#202A35]/10 space-y-4">
            <div className="flex items-center gap-2 text-[#A64F35]">
              <Feather className="w-5 h-5" />
              <h3 className="font-serif font-bold text-xl text-[#202A35]">
                लेखक सहभाग नियमावली
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#5D6B63] leading-relaxed">
              आम्ही मानसशास्त्रज्ञ, शिक्षक, संशोधक व अनुभवी समुपदेशकांकडून नवीन व अस्सल लेखांचे स्वागत करतो.
            </p>

            <ul className="space-y-2 text-xs text-[#202A35]">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#176B68] mt-1.5 shrink-0" />
                <span>लेख ८०० ते १५०० शब्दांच्या दरम्यान आणि सोप्या मराठीत असावा.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#176B68] mt-1.5 shrink-0" />
                <span>वैज्ञानिक शोध किंवा केस स्टडीजचा आधार असल्यास संदर्भ नमूद करावेत.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#176B68] mt-1.5 shrink-0" />
                <span>केवळ संपादक मंडळाच्या पूर्व-मंजुरीनंतरच लेख प्रसिद्ध केले जातात.</span>
              </li>
            </ul>

            <div className="p-3 bg-white rounded-xl border border-[#202A35]/10 text-[11px] text-[#5D6B63] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#176B68] shrink-0" />
              <span>कोणताही थेट किंवा अनधिकृत लेख प्रसिद्ध केला जात नाही.</span>
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#202A35]/10 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#202A35]">
              संपादकीय संपर्क तपशील
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-[#5D6B63]">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#176B68] shrink-0 mt-0.5" />
                <span>५०४, ज्ञानदीप संकुल, सेनापती बापट मार्ग, शिवाजीनगर, पुणे ४११ ०१६.</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#176B68] shrink-0" />
                <span>sampark@manovishleshan.org</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#176B68] shrink-0" />
                <span>+91 20 2567 XXXX (डेमो संपर्क)</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

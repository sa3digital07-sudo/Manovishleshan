import React, { useState } from 'react';
import { PageView } from '../types';
import { Mail, Phone, MapPin, Send, CheckCircle2, Feather, ShieldCheck } from 'lucide-react';

interface ContactViewProps {
  setCurrentPage: (page: PageView) => void;
}

export const ContactView: React.FC<ContactViewProps> = () => {
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
    <div className="space-y-10 sm:space-y-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <span className="h-0.5 w-6 bg-[#245A91]" />
          <span className="text-xs font-bold text-[#245A91] tracking-wider uppercase">
            संवाद आणि सहकार्य
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#252D38] leading-tight">
          संपर्क आणि आपले लेख पाठवा (Contribute)
        </h1>
        <p className="text-sm sm:text-base text-[#626D79] leading-relaxed max-w-2xl">
          आपला अभिप्राय, मासिकाविषयीच्या सूचना किंवा मनोविश्लेषण मासिकात लेख प्रसिद्ध करण्यासाठी आमच्याशी संपर्क साधा.
        </p>
      </div>

      {/* Grid: Contact Form (7 cols) + Info & Contribution Guide (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-[#E4E9EF] shadow-xs space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-[#252D38]">
            आम्हाला संदेश पाठवा
          </h2>

          {submitted ? (
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>आपला संदेश यशस्वीरीत्या प्राप्त झाला आहे!</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                मनोविश्लेषण संपादक मंडळ आपल्या संदेशाचे पुनरावलोकन करेल आणि आवश्यक असल्यास आपल्या दिलेल्या ईमेलवर संपर्क साधेल. धन्यवाद!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#252D38]">
                  आपले संपूर्ण नाव *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="उदा. डॉ. विनायक देशपांडे"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F5F7FA] border border-[#E4E9EF] text-sm text-[#252D38] focus:outline-none focus:border-[#245A91]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#252D38]">
                  ईमेल पत्ता *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="उदा. vinayak@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F5F7FA] border border-[#E4E9EF] text-sm text-[#252D38] focus:outline-none focus:border-[#245A91]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#252D38]">
                  संदेशाचा विषय
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F5F7FA] border border-[#E4E9EF] text-xs sm:text-sm font-medium text-[#252D38] focus:outline-none focus:border-[#245A91]"
                >
                  <option value="मासिक वाचक अभिप्राय">मासिक वाचक अभिप्राय</option>
                  <option value="लेख प्रसिद्ध करण्यासाठी प्रस्ताव">लेख प्रसिद्ध करण्यासाठी प्रस्ताव</option>
                  <option value="तज्ज्ञ मार्गदर्शिकेत समावेश">तज्ज्ञ मार्गदर्शिकेत समावेश</option>
                  <option value="सांस्कृतिक किंवा शैक्षणिक सहकार्य">सांस्कृतिक किंवा शैक्षणिक सहकार्य</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#252D38]">
                  आपला सविस्तर संदेश किंवा लेखाचा सारांश *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="आपला विचार, सूचना किंवा लेखाचा विषय सविस्तर मांडा..."
                  className="w-full p-3.5 rounded-xl bg-[#F5F7FA] border border-[#E4E9EF] text-sm text-[#252D38] focus:outline-none focus:border-[#245A91]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-[#245A91] hover:bg-[#1E3A8A] text-white font-bold text-xs sm:text-sm transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <span>संदेश पाठवा (Send Message)</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* Contribution Guidelines & Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#F5F7FA] border border-[#E4E9EF] space-y-4">
            <div className="flex items-center gap-2 text-[#245A91]">
              <Feather className="w-5 h-5" />
              <h3 className="font-bold text-lg sm:text-xl text-[#252D38]">
                लेखक सहभाग नियमावली
              </h3>
            </div>

            <p className="text-xs text-[#626D79] leading-relaxed">
              आम्ही मानसशास्त्रज्ञ, शिक्षक, संशोधक व अनुभवी समुपदेशकांकडून नवीन व अस्सल लेखांचे स्वागत करतो.
            </p>

            <ul className="space-y-2 text-xs text-[#252D38]">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#245A91] mt-1.5 shrink-0" />
                <span>लेख ८०० ते १५०० शब्दांच्या दरम्यान आणि सोप्या मराठीत असावा.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#245A91] mt-1.5 shrink-0" />
                <span>वैज्ञानिक शोध किंवा केस स्टडीजचा आधार असल्यास संदर्भ नमूद करावेत.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#245A91] mt-1.5 shrink-0" />
                <span>केवळ संपादक मंडळाच्या पूर्व-मंजुरीनंतरच लेख प्रसिद्ध केले जातात.</span>
              </li>
            </ul>

            <div className="p-3 bg-white rounded-xl border border-[#E4E9EF] text-[11px] text-[#626D79] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#245A91] shrink-0" />
              <span>सत्यापित व दर्जेदार लेखनाला प्राधान्य दिले जाते.</span>
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E4E9EF] shadow-xs space-y-4">
            <h3 className="font-bold text-base sm:text-lg text-[#252D38]">
              संपादकीय कार्यालय तपशील
            </h3>

            <div className="space-y-3 text-xs text-[#626D79]">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#245A91] shrink-0 mt-0.5" />
                <span>जालना सायकॉलॉजिकल असोसिएशन | नोंदणी: महा./३५७/१०/जालना</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#245A91] shrink-0" />
                <a href="mailto:manovishleshanjalna@gmail.com" className="text-[#252D38] font-medium hover:underline">
                  manovishleshanjalna@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#245A91] shrink-0" />
                <span>+९१ ९८५०८८१२८६ / +९१ ९८५०९५७७५७</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

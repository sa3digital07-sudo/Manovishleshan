import React, { useState } from 'react';
import { UserAccount, Publication, Article } from '../types';
import { PUBLICATIONS_DATA, ARTICLES_DATA } from '../data/mockData';
import {
  X,
  User,
  Mail,
  Lock,
  Smartphone,
  Bookmark,
  LogOut,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserAccount;
  setUser: React.Dispatch<React.SetStateAction<UserAccount>>;
  onOpenPublication: (pub: Publication) => void;
  onOpenArticle: (art: Article) => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  user,
  setUser,
  onOpenPublication,
  onOpenArticle,
}) => {
  const [tab, setTab] = useState<'login' | 'otp'>('login');
  const [email, setEmail] = useState('aniket.deshmukh@example.com');
  const [password, setPassword] = useState('••••••••');
  const [mobile, setMobile] = useState('98220XXXXX');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      isLoggedIn: true,
      name: 'अनिकेत देशमुख',
      email: email,
      phone: '+91 98220 12345',
      memberSince: 'जानेवारी २०२६',
      bookmarks: user.bookmarks.length > 0 ? user.bookmarks : ['edition-stones-balance', 'art-1'],
    });
    setStatusMsg('प्रात्यक्षिक लॉगिन यशस्वी झाले!');
    setTimeout(() => {
      setStatusMsg(null);
    }, 2500);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.trim().length >= 10) {
      setOtpSent(true);
      setOtpCode('5842');
      setStatusMsg('डेमो ओटीपी (OTP) पाठवला आहे: 5842');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      isLoggedIn: true,
      name: 'अनिकेत देशमुख',
      email: 'aniket.deshmukh@example.com',
      phone: `+91 ${mobile}`,
      memberSince: '२०२६',
      bookmarks: user.bookmarks.length > 0 ? user.bookmarks : ['edition-stones-balance'],
    });
    setStatusMsg('ओटीपी पडताळणी यशस्वी!');
    setTimeout(() => {
      setStatusMsg(null);
    }, 2500);
  };

  const handleLogout = () => {
    setUser({
      isLoggedIn: false,
      name: '',
      email: '',
      bookmarks: user.bookmarks,
    });
    setStatusMsg('आपण यशस्वीरीत्या बाहेर पडला आहात.');
    setTimeout(() => setStatusMsg(null), 2000);
  };

  const bookmarkedPubs = PUBLICATIONS_DATA.filter((p) => user.bookmarks.includes(p.id));
  const bookmarkedArticles = ARTICLES_DATA.filter((a) => user.bookmarks.includes(a.id));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="account-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn"
    >
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#E4E9EF] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#E4E9EF] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#EBF3FA] text-[#245A91] flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 id="account-modal-title" className="font-bold text-lg text-[#252D38]">
                {user.isLoggedIn ? 'वाचक खाते व जतन केलेले लेख' : 'वाचक खाते प्रवेश'}
              </h3>
              <p className="text-[11px] text-[#626D79]">
                मासिक मनोविश्लेषण डिजिटल वाचक व्यासपीठ
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="संवाद बंद करा"
            className="p-1.5 rounded-lg hover:bg-[#F5F7FA] text-[#626D79] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          {statusMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{statusMsg}</span>
            </div>
          )}

          {user.isLoggedIn ? (
            /* Logged In View */
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#F5F7FA] border border-[#E4E9EF] space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-base text-[#252D38]">{user.name}</h4>
                    <p className="text-xs text-[#626D79]">{user.email}</p>
                    {user.phone && <p className="text-xs text-[#626D79]">{user.phone}</p>}
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#EBF3FA] text-[#245A91] font-bold">
                    सक्रिय सभासद
                  </span>
                </div>
                <div className="pt-2 text-xs text-[#626D79] border-t border-[#E4E9EF] flex items-center justify-between">
                  <span>नोंदणी: {user.memberSince || '२०२६'}</span>
                  <button
                    onClick={handleLogout}
                    className="text-[#DC2626] font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>लॉगआउट</span>
                  </button>
                </div>
              </div>

              {/* Bookmarks Section */}
              <div className="space-y-3">
                <h4 className="font-bold text-base text-[#252D38] flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-[#F2C14E] fill-[#F2C14E]" />
                  <span>माझे जतन केलेले साहित्य ({user.bookmarks.length})</span>
                </h4>

                {bookmarkedPubs.length === 0 && bookmarkedArticles.length === 0 ? (
                  <div className="p-6 text-center rounded-xl bg-[#F5F7FA] border border-dashed border-[#CBD5E1] text-sm text-[#626D79]">
                    <p>आपण अद्याप कोणताही लेख किंवा अंक बुकमार्क केलेला नाही.</p>
                    <p className="text-xs mt-1">
                      वाचताना 'बुकमार्क करा' बटण दाबून साहित्य येथे जतन करू शकता.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {bookmarkedPubs.map((pub) => (
                      <button
                        key={pub.id}
                        onClick={() => {
                          onOpenPublication(pub);
                          onClose();
                        }}
                        className="w-full text-left p-3.5 rounded-xl bg-white hover:bg-[#EBF3FA] border border-[#E4E9EF] flex items-center justify-between gap-3 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className="w-4 h-4 text-[#245A91] shrink-0" />
                          <div>
                            <p className="font-bold text-sm text-[#252D38] group-hover:text-[#245A91]">
                              {pub.title}
                            </p>
                            <span className="text-[11px] text-[#626D79]">{pub.category}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#626D79] group-hover:translate-x-1 group-hover:text-[#245A91] transition-all" />
                      </button>
                    ))}

                    {bookmarkedArticles.map((art) => (
                      <button
                        key={art.id}
                        onClick={() => {
                          onOpenArticle(art);
                          onClose();
                        }}
                        className="w-full text-left p-3.5 rounded-xl bg-white hover:bg-[#EBF3FA] border border-[#E4E9EF] flex items-center justify-between gap-3 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <Bookmark className="w-4 h-4 text-[#F2C14E] shrink-0" />
                          <div>
                            <p className="font-bold text-sm text-[#252D38] group-hover:text-[#245A91]">
                              {art.title}
                            </p>
                            <span className="text-[11px] text-[#626D79]">{art.author}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#626D79] group-hover:translate-x-1 group-hover:text-[#245A91] transition-all" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Logged Out - Auth Tabs */
            <div className="space-y-5">
              <div className="grid grid-cols-2 p-1 bg-[#F5F7FA] rounded-xl text-xs font-semibold border border-[#E4E9EF]">
                <button
                  type="button"
                  onClick={() => setTab('login')}
                  className={`py-2 rounded-lg transition-colors ${
                    tab === 'login' ? 'bg-white text-[#245A91] shadow-xs font-bold' : 'text-[#626D79]'
                  }`}
                >
                  ईमेल / पासवर्ड
                </button>
                <button
                  type="button"
                  onClick={() => setTab('otp')}
                  className={`py-2 rounded-lg transition-colors ${
                    tab === 'otp' ? 'bg-white text-[#245A91] shadow-xs font-bold' : 'text-[#626D79]'
                  }`}
                >
                  मोबाईल / OTP
                </button>
              </div>

              {tab === 'login' ? (
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#252D38] flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#626D79]" />
                      <span>ईमेल पत्ता</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="उदा. name@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E4E9EF] text-sm text-[#252D38] focus:outline-none focus:border-[#245A91]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#252D38] flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#626D79]" />
                      <span>गुप्तशब्द (Password)</span>
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E4E9EF] text-sm text-[#252D38] focus:outline-none focus:border-[#245A91]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-[#245A91] hover:bg-[#1E3A8A] text-white text-sm font-bold transition-colors shadow-xs"
                  >
                    प्रात्यक्षिक लॉगिन करा (Simulate Login)
                  </button>
                </form>
              ) : (
                <form
                  onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#252D38] flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-[#626D79]" />
                      <span>मोबाईल क्रमांक</span>
                    </label>
                    <div className="flex gap-2">
                      <span className="px-3 py-2.5 rounded-lg bg-[#F5F7FA] border border-[#E4E9EF] text-sm font-mono text-[#626D79]">
                        +91
                      </span>
                      <input
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                        disabled={otpSent}
                        placeholder="१० अंकी क्रमांक"
                        className="flex-1 px-3.5 py-2.5 rounded-lg bg-white border border-[#E4E9EF] text-sm text-[#252D38] focus:outline-none focus:border-[#245A91]"
                      />
                    </div>
                  </div>

                  {otpSent && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#252D38] flex items-center justify-between">
                        <span>४ अंकी ओटीपी (OTP) प्रविष्ट करा</span>
                        <span className="text-[11px] text-[#245A91] font-bold">
                          डेमो कोड: 5842
                        </span>
                      </label>
                      <input
                        type="text"
                        maxLength={4}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E4E9EF] text-center text-lg font-mono tracking-widest focus:outline-none focus:border-[#245A91]"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-[#245A91] hover:bg-[#1E3A8A] text-white text-sm font-bold transition-colors shadow-xs"
                  >
                    {otpSent ? 'ओटीपी पडताळा (Verify OTP)' : 'ओटीपी मिळवा (Send Demo OTP)'}
                  </button>
                </form>
              )}

              <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#E4E9EF] text-xs text-[#626D79] space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-[#252D38]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#245A91]" />
                  <span>प्रात्यक्षिक सूचना (Demo Notice)</span>
                </div>
                <p>
                  हे प्रत्यक्ष प्रमाणीकरण नसून केवळ फ्रंटएंड कार्यपद्धती दाखवण्यासाठी तयार केलेले सुरक्षित प्रात्यक्षिक आहे.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { UserAccount, Publication, Article } from '../types';
import { PUBLICATIONS_DATA, ARTICLES_DATA } from '../data/mockData';
import {
  validateRegistration,
  validateEmailLogin,
  validateOtpLogin,
  RegistrationData,
} from '../utils/magazineLogic';
import {
  X,
  User,
  Mail,
  Lock,
  Smartphone,
  Bookmark,
  LogOut,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  UserPlus,
  LogIn,
} from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserAccount;
  setUser: React.Dispatch<React.SetStateAction<UserAccount>>;
  onOpenPublication: (pub: Publication) => void;
  onOpenArticle: (art: Article) => void;
  gateNotice?: string | null;
  onLoginSuccess?: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  user,
  setUser,
  onOpenPublication,
  onOpenArticle,
  gateNotice,
  onLoginSuccess,
}) => {
  // Main mode: 'login' | 'register'
  const [mode, setMode] = useState<'login' | 'register'>('login');
  // Login option: 'email' (Option 1) | 'otp' (Option 2)
  const [loginOption, setLoginOption] = useState<'email' | 'otp'>('email');

  // Option 1: Email Login fields
  const [loginEmail, setLoginEmail] = useState('aniket.deshmukh@example.com');
  const [loginPassword, setLoginPassword] = useState('password123');

  // Option 2: Mobile OTP Login fields
  const [loginPhone, setLoginPhone] = useState('9822012345');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  // Registration fields (All 5 mandatory)
  const [regData, setRegData] = useState<RegistrationData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle Option 1: Email + Password Login
  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const validation = validateEmailLogin(loginEmail, loginPassword);
    if (!validation.valid) {
      setErrorMsg(validation.error || 'कृपया सर्व आवश्यक माहिती भरा.');
      return;
    }

    const updatedUser: UserAccount = {
      isLoggedIn: true,
      name: 'अनिकेत देशमुख',
      email: loginEmail,
      phone: '+91 98220 12345',
      memberSince: 'जानेवारी २०२६',
      bookmarks: user.bookmarks.length > 0 ? user.bookmarks : ['edition-stones-balance', 'art-1'],
    };

    setUser(updatedUser);
    setStatusMsg('लॉगिन यशस्वी झाले!');
    setTimeout(() => {
      setStatusMsg(null);
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        onClose();
      }
    }, 900);
  };

  // Handle Option 2: Send OTP
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanPhone = loginPhone.trim().replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('कृपया वैध १० अंकी मोबाईल क्रमांक प्रविष्ट करा.');
      return;
    }

    setOtpSent(true);
    setOtpCode('5842');
    setStatusMsg('डेमो ओटीपी (OTP) पाठवला आहे: 5842');
  };

  // Handle Option 2: Verify OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const validation = validateOtpLogin(loginPhone, otpCode);
    if (!validation.valid) {
      setErrorMsg(validation.error || 'कृपया ४ अंकी ओटीपी प्रविष्ट करा.');
      return;
    }

    const updatedUser: UserAccount = {
      isLoggedIn: true,
      name: 'वाचक सदस्य',
      email: 'member@manovishleshan.in',
      phone: `+91 ${loginPhone.trim()}`,
      memberSince: '२०२६',
      bookmarks: user.bookmarks.length > 0 ? user.bookmarks : ['edition-stones-balance'],
    };

    setUser(updatedUser);
    setStatusMsg('ओटीपी पडताळणी यशस्वी! लॉगिन झाले.');
    setTimeout(() => {
      setStatusMsg(null);
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        onClose();
      }
    }, 900);
  };

  // Handle Registration (All 5 fields mandatory)
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const validation = validateRegistration(regData);
    if (!validation.valid) {
      setErrorMsg(validation.error || 'कृपया सर्व आवश्यक माहिती अचूक भरा.');
      return;
    }

    const newUser: UserAccount = {
      isLoggedIn: true,
      name: regData.fullName.trim(),
      email: regData.email.trim(),
      phone: `+91 ${regData.phone.trim().replace(/\D/g, '')}`,
      memberSince: '२०२६',
      bookmarks: ['edition-stones-balance'],
    };

    setUser(newUser);
    setStatusMsg('नोंदणी यशस्वी झाली! आपले स्वागत आहे.');
    setTimeout(() => {
      setStatusMsg(null);
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        onClose();
      }
    }, 1100);
  };

  const handleLogout = () => {
    setUser({
      isLoggedIn: false,
      name: '',
      email: '',
      bookmarks: user.bookmarks,
    });
    setStatusMsg('आपण यशस्वीरीत्या बाहेर पडला आहात.');
    setTimeout(() => setStatusMsg(null), 1500);
  };

  const bookmarkedPubs = PUBLICATIONS_DATA.filter((p) => user.bookmarks.includes(p.id));
  const bookmarkedArticles = ARTICLES_DATA.filter((a) => user.bookmarks.includes(a.id));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="account-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
    >
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#E4E9EF] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E4E9EF] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EBF3FA] text-[#245A91] flex items-center justify-center font-bold shrink-0">
              {user.isLoggedIn ? <User className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
            </div>
            <div>
              <h3 id="account-modal-title" className="font-bold text-base sm:text-lg text-[#252D38]">
                {user.isLoggedIn
                  ? 'वाचक प्रोफाइल व जतन केलेले साहित्य'
                  : mode === 'register'
                  ? 'नवीन वाचक नोंदणी (Create Account)'
                  : 'वाचक खाते प्रवेश (Login)'}
              </h3>
              <p className="text-xs text-[#626D79]">
                मासिक मनोविश्लेषण · मानवी मनाचा शोध घेणारे
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
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Gating Notice Banner */}
          {gateNotice && !user.isLoggedIn && (
            <div className="p-3.5 rounded-xl bg-[#FEF9E7] border border-[#F2C14E]/60 text-[#20354D] text-xs sm:text-sm flex items-start gap-2.5 animate-fadeIn">
              <BookOpen className="w-4 h-4 shrink-0 text-[#245A91] mt-0.5" />
              <div>
                <p className="font-bold text-[#20354D]">अंक वाचन प्रवेश आवश्यक</p>
                <p className="text-xs text-[#4A5568] mt-0.5">{gateNotice}</p>
              </div>
            </div>
          )}

          {/* Status Message */}
          {statusMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{statusMsg}</span>
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {user.isLoggedIn ? (
            /* Logged In View */
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-[#F5F7FA] border border-[#E4E9EF] space-y-3">
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
            /* Logged Out - Auth Flow */
            <div className="space-y-5">
              {/* Top Navigation: Login vs Register */}
              <div className="grid grid-cols-2 p-1 bg-[#F5F7FA] rounded-xl text-xs sm:text-sm font-semibold border border-[#E4E9EF]">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMsg(null);
                  }}
                  className={`py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                    mode === 'login'
                      ? 'bg-white text-[#245A91] shadow-xs font-bold'
                      : 'text-[#626D79] hover:text-[#252D38]'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>लॉगिन (Login)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setErrorMsg(null);
                  }}
                  className={`py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                    mode === 'register'
                      ? 'bg-white text-[#245A91] shadow-xs font-bold'
                      : 'text-[#626D79] hover:text-[#252D38]'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>नवीन नोंदणी (Register)</span>
                </button>
              </div>

              {/* ---------------- MODE: LOGIN ---------------- */}
              {mode === 'login' && (
                <div className="space-y-4">
                  {/* Two Separate Login Options Toggle */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[#626D79] font-medium">लॉगिन पद्धत निवडा:</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setLoginOption('email');
                        setErrorMsg(null);
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        loginOption === 'email'
                          ? 'border-[#245A91] bg-[#EBF3FA] text-[#245A91] font-bold ring-1 ring-[#245A91]'
                          : 'border-[#E4E9EF] bg-white text-[#626D79] hover:bg-[#F5F7FA]'
                      }`}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>पर्याय १: ईमेल व पासवर्ड</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLoginOption('otp');
                        setErrorMsg(null);
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        loginOption === 'otp'
                          ? 'border-[#245A91] bg-[#EBF3FA] text-[#245A91] font-bold ring-1 ring-[#245A91]'
                          : 'border-[#E4E9EF] bg-white text-[#626D79] hover:bg-[#F5F7FA]'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>पर्याय २: मोबाईल व OTP</span>
                    </button>
                  </div>

                  {/* Option 1: Email + Password Login Form */}
                  {loginOption === 'email' && (
                    <form onSubmit={handleEmailLogin} className="space-y-3.5 pt-1">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#252D38] flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-[#626D79]" />
                          <span>ईमेल पत्ता <span className="text-red-500">*</span></span>
                        </label>
                        <input
                          type="email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          required
                          placeholder="name@example.com"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E4E9EF] text-sm text-[#252D38] focus:outline-none focus:border-[#245A91]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#252D38] flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-[#626D79]" />
                          <span>गुप्तशब्द (Password) <span className="text-red-500">*</span></span>
                        </label>
                        <input
                          type="password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          required
                          placeholder="••••••••"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E4E9EF] text-sm text-[#252D38] focus:outline-none focus:border-[#245A91]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 sm:py-3 rounded-lg bg-[#245A91] hover:bg-[#1E3A8A] text-white text-sm font-bold transition-colors shadow-xs"
                      >
                        ईमेलद्वारे लॉगिन करा (Login with Email)
                      </button>
                    </form>
                  )}

                  {/* Option 2: Mobile + OTP Login Form */}
                  {loginOption === 'otp' && (
                    <form
                      onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}
                      className="space-y-3.5 pt-1"
                    >
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#252D38] flex items-center gap-1.5">
                          <Smartphone className="w-3.5 h-3.5 text-[#626D79]" />
                          <span>मोबाईल क्रमांक <span className="text-red-500">*</span></span>
                        </label>
                        <div className="flex gap-2">
                          <span className="px-3 py-2.5 rounded-lg bg-[#F5F7FA] border border-[#E4E9EF] text-sm font-mono text-[#626D79]">
                            +91
                          </span>
                          <input
                            type="tel"
                            value={loginPhone}
                            onChange={(e) => setLoginPhone(e.target.value)}
                            required
                            disabled={otpSent}
                            placeholder="९८२२०१२३४५"
                            className="flex-1 px-3.5 py-2.5 rounded-lg bg-white border border-[#E4E9EF] text-sm text-[#252D38] focus:outline-none focus:border-[#245A91]"
                          />
                        </div>
                      </div>

                      {otpSent && (
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-[#252D38] flex items-center justify-between">
                            <span>४ अंकी ओटीपी (OTP) प्रविष्ट करा <span className="text-red-500">*</span></span>
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
                            placeholder="5842"
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E4E9EF] text-center text-lg font-mono tracking-widest focus:outline-none focus:border-[#245A91]"
                          />
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full py-2.5 sm:py-3 rounded-lg bg-[#245A91] hover:bg-[#1E3A8A] text-white text-sm font-bold transition-colors shadow-xs"
                      >
                        {otpSent ? 'ओटीपी पडताळा (Verify OTP)' : 'ओटीपी मिळवा (Send Demo OTP)'}
                      </button>

                      {otpSent && (
                        <button
                          type="button"
                          onClick={() => {
                            setOtpSent(false);
                            setOtpCode('');
                          }}
                          className="w-full text-center text-xs text-[#626D79] hover:underline"
                        >
                          दुसऱ्या क्रमांकावर ओटीपी पाठवा
                        </button>
                      )}
                    </form>
                  )}

                  <div className="text-center pt-2">
                    <p className="text-xs text-[#626D79]">
                      अद्याप खाते नाही?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setMode('register');
                          setErrorMsg(null);
                        }}
                        className="text-[#245A91] font-bold hover:underline"
                      >
                        नवीन खाते तयार करा (Register)
                      </button>
                    </p>
                  </div>
                </div>
              )}

              {/* ---------------- MODE: REGISTRATION ---------------- */}
              {/* Mandatory: Full Name, Email, Mobile, Password, Confirm Password */}
              {mode === 'register' && (
                <form onSubmit={handleRegister} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#252D38] flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#626D79]" />
                        <span>पूर्ण नाव (Full Name)</span>
                      </span>
                      <span className="text-[11px] text-red-500 font-bold">* अनिवार्य</span>
                    </label>
                    <input
                      type="text"
                      value={regData.fullName}
                      onChange={(e) => setRegData({ ...regData, fullName: e.target.value })}
                      required
                      placeholder="उदा. अनिकेत प्रकाश देशमुख"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E4E9EF] text-sm text-[#252D38] focus:outline-none focus:border-[#245A91]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#252D38] flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#626D79]" />
                        <span>ईमेल पत्ता (Email Address)</span>
                      </span>
                      <span className="text-[11px] text-red-500 font-bold">* अनिवार्य</span>
                    </label>
                    <input
                      type="email"
                      value={regData.email}
                      onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                      required
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E4E9EF] text-sm text-[#252D38] focus:outline-none focus:border-[#245A91]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#252D38] flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5 text-[#626D79]" />
                        <span>मोबाईल क्रमांक (Mobile Number)</span>
                      </span>
                      <span className="text-[11px] text-red-500 font-bold">* अनिवार्य</span>
                    </label>
                    <div className="flex gap-2">
                      <span className="px-3 py-2.5 rounded-lg bg-[#F5F7FA] border border-[#E4E9EF] text-sm font-mono text-[#626D79]">
                        +91
                      </span>
                      <input
                        type="tel"
                        value={regData.phone}
                        onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                        required
                        placeholder="१० अंकी क्रमांक"
                        className="flex-1 px-3.5 py-2.5 rounded-lg bg-white border border-[#E4E9EF] text-sm text-[#252D38] focus:outline-none focus:border-[#245A91]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#252D38] flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-[#626D79]" />
                          <span>गुप्तशब्द (Password)</span>
                        </span>
                        <span className="text-[11px] text-red-500 font-bold">*</span>
                      </label>
                      <input
                        type="password"
                        value={regData.password}
                        onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                        required
                        placeholder="किमान ६ अक्षरे"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E4E9EF] text-sm text-[#252D38] focus:outline-none focus:border-[#245A91]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#252D38] flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-[#626D79]" />
                          <span>गुप्तशब्द पुष्टी (Confirm)</span>
                        </span>
                        <span className="text-[11px] text-red-500 font-bold">*</span>
                      </label>
                      <input
                        type="password"
                        value={regData.confirmPassword}
                        onChange={(e) => setRegData({ ...regData, confirmPassword: e.target.value })}
                        required
                        placeholder="पुन्हा टाईप करा"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E4E9EF] text-sm text-[#252D38] focus:outline-none focus:border-[#245A91]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 sm:py-3 rounded-lg bg-[#245A91] hover:bg-[#1E3A8A] text-white text-sm font-bold transition-colors shadow-xs"
                  >
                    नवीन खाते तयार करा (Create Account)
                  </button>

                  <div className="text-center pt-1">
                    <p className="text-xs text-[#626D79]">
                      आधीच खाते आहे?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setMode('login');
                          setErrorMsg(null);
                        }}
                        className="text-[#245A91] font-bold hover:underline"
                      >
                        येथे लॉगिन करा (Login)
                      </button>
                    </p>
                  </div>
                </form>
              )}

              {/* Demo Notice */}
              <div className="p-3 rounded-lg bg-[#F5F7FA] border border-[#E4E9EF] text-xs text-[#626D79] space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-[#252D38]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#245A91]" />
                  <span>सुरक्षित वाचक व्यासपीठ</span>
                </div>
                <p>
                  मासिक मनोविश्लेषण व्यासपीठावर आपली माहिती पूर्णतः गोपनीय ठेवली जाते.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

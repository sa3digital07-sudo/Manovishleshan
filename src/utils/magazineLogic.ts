import { Publication, Article, Professional } from '../types';

/**
 * Filter publications by search term, category and publication year/month
 */
export function filterPublications(
  publications: Publication[],
  query: string,
  category: string,
  year: string
): Publication[] {
  const normalizedQuery = query.trim().toLowerCase();

  return publications.filter((pub) => {
    const matchesQuery =
      !normalizedQuery ||
      pub.title.toLowerCase().includes(normalizedQuery) ||
      pub.subtitle.toLowerCase().includes(normalizedQuery) ||
      pub.author.toLowerCase().includes(normalizedQuery) ||
      pub.description.toLowerCase().includes(normalizedQuery);

    const matchesCategory = category === 'सर्व' || pub.category === category;
    const matchesYear = year === 'सर्व' || pub.year.toString() === year;

    return matchesQuery && matchesCategory && matchesYear;
  });
}

/**
 * Filter articles by search term and category
 */
export function filterArticles(
  articles: Article[],
  query: string,
  category: string
): Article[] {
  const normalizedQuery = query.trim().toLowerCase();

  return articles.filter((art) => {
    const matchesQuery =
      !normalizedQuery ||
      art.title.toLowerCase().includes(normalizedQuery) ||
      art.summary.toLowerCase().includes(normalizedQuery) ||
      art.author.toLowerCase().includes(normalizedQuery);

    const matchesCategory = category === 'सर्व' || art.category === category;

    return matchesQuery && matchesCategory;
  });
}

/**
 * Filter mental health professionals by role, city and keyword
 */
export function filterProfessionals(
  professionals: Professional[],
  role: string,
  city: string,
  keyword: string
): Professional[] {
  const normalizedKeyword = keyword.trim().toLowerCase();

  return professionals.filter((prof) => {
    const matchesRole = role === 'सर्व' || prof.role.includes(role);
    const matchesCity = city === 'सर्व' || prof.city === city;
    const matchesKeyword =
      !normalizedKeyword ||
      prof.name.toLowerCase().includes(normalizedKeyword) ||
      prof.area.toLowerCase().includes(normalizedKeyword) ||
      prof.pincode.includes(normalizedKeyword) ||
      prof.specialization.toLowerCase().includes(normalizedKeyword);

    return matchesRole && matchesCity && matchesKeyword;
  });
}

/**
 * Calculate self assessment score and interpretation
 */
export interface AssessmentResult {
  score: number;
  maxScore: number;
  level: 'संतुलित' | 'मध्यम तणाव' | 'उच्च काळजीपूर्वक लक्ष देण्याची गरज';
  title: string;
  recommendation: string;
}

export function evaluateAssessment(answers: Record<number, number>): AssessmentResult {
  const scores = Object.values(answers);
  const totalScore = scores.reduce((acc, curr) => acc + curr, 0);
  const maxScore = 15; // 5 questions, 0-3 each

  if (totalScore <= 4) {
    return {
      score: totalScore,
      maxScore,
      level: 'संतुलित',
      title: 'उत्तम भावनिक संतुलन (Balanced & Resilient)',
      recommendation:
        'आपली मानसिक लवचिकता आणि दैनंदिन शांतता उत्तम पातळीवर आहे. ध्यान, वाचन आणि चालण्याचा छंद असाच सुरू ठेवा.',
    };
  } else if (totalScore <= 9) {
    return {
      score: totalScore,
      maxScore,
      level: 'मध्यम तणाव',
      title: 'मध्यम ताण आणि थकवा (Mild to Moderate Stress)',
      recommendation:
        'कामाचा किंवा कौटुंबिक जबाबदाऱ्यांचा थोडा ताण जाणवत आहे. स्वतःसाठी दररोज किमान ३० मिनिटे द्या, पुरेशी झोप घ्या व जवळच्या मित्रांशी मोकळेपणाने बोला.',
    };
  } else {
    return {
      score: totalScore,
      maxScore,
      level: 'उच्च काळजीपूर्वक लक्ष देण्याची गरज',
      title: 'उच्च ताण - आत्मीय मार्गदर्शनाची गरज (High Stress)',
      recommendation:
        'आपण मानसिक ओझे आणि अस्वस्थतेचा सामना करत आहात. एखाद्या अनुभवी समुपदेशक किंवा मानसोपचारतज्ज्ञांशी मनमोकळी चर्चा करणे अत्यंत फायदेशीर ठरेल.',
    };
  }
}

/**
 * Toggle bookmark immutably
 */
export function toggleBookmark(bookmarks: string[], id: string): string[] {
  if (bookmarks.includes(id)) {
    return bookmarks.filter((b) => b !== id);
  }
  return [...bookmarks, id];
}

export interface RegistrationData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface ValidationResponse {
  valid: boolean;
  error?: string;
}

/**
 * Validate user registration fields according to required specs
 * Mandatory: Full name, Email address, Mobile number, Password, Confirm password
 */
export function validateRegistration(data: RegistrationData): ValidationResponse {
  if (!data.fullName || !data.fullName.trim()) {
    return { valid: false, error: 'कृपया आपले पूर्ण नाव प्रविष्ट करा.' };
  }

  const email = data.email ? data.email.trim() : '';
  if (!email) {
    return { valid: false, error: 'कृपया आपला ईमेल पत्ता प्रविष्ट करा.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'कृपया वैध ईमेल पत्ता प्रविष्ट करा.' };
  }

  const phone = data.phone ? data.phone.trim().replace(/\D/g, '') : '';
  if (!phone) {
    return { valid: false, error: 'कृपया आपला मोबाईल क्रमांक प्रविष्ट करा.' };
  }
  if (phone.length < 10) {
    return { valid: false, error: 'मोबाईल क्रमांक किमान १० अंकी असावा.' };
  }

  if (!data.password || data.password.length < 6) {
    return { valid: false, error: 'गुप्तशब्द (पासवर्ड) किमान ६ अक्षरांचा असावा.' };
  }

  if (!data.confirmPassword) {
    return { valid: false, error: 'कृपया गुप्तशब्दाची पुष्टी (Confirm Password) करा.' };
  }

  if (data.password !== data.confirmPassword) {
    return { valid: false, error: 'दोन्ही गुप्तशब्द जुळत नाहीत. कृपया पुन्हा तपासा.' };
  }

  return { valid: true };
}

/**
 * Validate Option 1 Email login
 */
export function validateEmailLogin(email: string, password: string): ValidationResponse {
  if (!email || !email.trim()) {
    return { valid: false, error: 'कृपया आपला ईमेल पत्ता प्रविष्ट करा.' };
  }
  if (!password || !password.trim()) {
    return { valid: false, error: 'कृपया आपला गुप्तशब्द प्रविष्ट करा.' };
  }
  return { valid: true };
}

/**
 * Validate Option 2 Mobile OTP login
 */
export function validateOtpLogin(phone: string, otp: string): ValidationResponse {
  const cleanPhone = phone ? phone.trim().replace(/\D/g, '') : '';
  if (!cleanPhone || cleanPhone.length < 10) {
    return { valid: false, error: 'कृपया वैध १० अंकी मोबाईल क्रमांक प्रविष्ट करा.' };
  }
  if (!otp || otp.trim().length !== 4) {
    return { valid: false, error: 'कृपया ४ अंकी ओटीपी (OTP) प्रविष्ट करा.' };
  }
  return { valid: true };
}

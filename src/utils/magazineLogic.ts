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

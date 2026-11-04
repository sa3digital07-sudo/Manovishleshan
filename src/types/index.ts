export type PageView = 
  | 'home'
  | 'publications'
  | 'publication-detail'
  | 'reader'
  | 'articles'
  | 'article-detail'
  | 'authors'
  | 'author-detail'
  | 'experts'
  | 'directory'
  | 'qa'
  | 'about'
  | 'faq'
  | 'contact';

export interface Publication {
  id: string;
  title: string;
  subtitle: string;
  editionMonth: string; // e.g. "नोव्हेंबर २०२६"
  year: number;
  category: 'मासिक अंक' | 'ई-पुस्तके' | 'विशेष विशेषांक';
  coverImage: string;
  author: string;
  authorId: string;
  description: string;
  pages: number;
  readTime: string;
  featured: boolean;
  rating: number;
  reviewsCount: number;
  publishedDate: string;
  chaptersCount: number;
  summaryPoints: string[];
}

export interface Chapter {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  author: string;
  authorRole: string;
  readTime: string;
  content: string[];
  pullQuote?: string;
  bulletPoints?: string[];
  image?: string;
  imageCaption?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: 'मानसशास्त्र विचार' | 'नातेसंबंध' | 'मानसिक स्वास्थ्य' | 'पालकत्व व मुले' | 'संशोधन' | 'युवा मन';
  summary: string;
  content: string[];
  author: string;
  authorId: string;
  authorTitle: string;
  authorAvatar: string;
  publishedDate: string;
  readTime: string;
  featured: boolean;
  coverImage: string;
  tags: string[];
  pullQuote?: string;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  articleCount: number;
  specialization: string;
  location: string;
}

export interface Expert {
  id: string;
  name: string;
  qualification: string;
  title: string;
  specialization: string;
  avatar: string;
  experienceYears: number;
  bio: string;
  contributions: {
    articles: number;
    interviews: number;
    answersGiven: number;
  };
}

export interface Professional {
  id: string;
  name: string;
  role: 'मानसोपचारतज्ज्ञ (Psychiatrist)' | 'क्लिनिकल सायकॉलॉजिस्ट' | 'मानसोपचार समुपदेशक (Counsellor)';
  qualification: string;
  regNumber: string;
  specialization: string;
  city: 'पुणे' | 'मुंबई' | 'नाशिक' | 'नागपूर' | 'छत्रपती संभाजीनगर';
  area: string;
  pincode: string;
  phone: string;
  consultationType: 'प्रत्यक्ष क्लिनिक आणि ऑनलाईन' | 'फक्त क्लिनिक भेट' | 'फक्त ऑनलाईन समुपदेशन';
  isVerified: boolean;
  address: string;
  experience: string;
  languages: string[];
}

export interface QAItem {
  id: string;
  question: string;
  askedBy: string; // e.g. "एक वाचक, पुणे"
  date: string;
  category: string;
  expertName: string;
  expertRole: string;
  expertAnswer: string;
  helpfulCount: number;
}

export interface Review {
  id: string;
  publicationId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Comment {
  id: string;
  articleId: string;
  userName: string;
  comment: string;
  date: string;
}

export interface UserAccount {
  isLoggedIn: boolean;
  name: string;
  email: string;
  phone?: string;
  memberSince?: string;
  bookmarks: string[]; // item IDs
}

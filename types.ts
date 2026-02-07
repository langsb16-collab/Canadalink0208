
export enum Tab {
  DASHBOARD = 'dashboard',
  SETTLEMENT = 'settlement',
  BUSINESS = 'business',
  MARKETPLACE = 'marketplace',
  JOBS = 'jobs',
  REAL_ESTATE = 'real_estate',
  FRIENDS = 'friends',
  PROMOTION = 'promotion',
  POLICY = 'policy',
  SUPPORT = 'support',
  ADMIN = 'admin',
  INFRA = 'infra',
  TRANSLATION = 'translation'
}

export type Language = 'ko' | 'en' | 'zh' | 'es' | 'fr' | 'ar' | 'ja' | 'pt' | 'ru' | 'id' | 'bn' | 'hi';

export type I18nString = Partial<Record<Language, string>>;

export interface ParticipationStatus {
  isVerified: boolean;
  phoneHash?: string;
  verifiedAt?: string;
}

export interface StatisticsData {
  city: string;
  population: number;
  growth: number;
}

export interface BusinessItem {
  id: string;
  name_i18n: I18nString;
  category: string;
  city: string;
  rating: number;
  description_i18n: I18nString;
}

export interface CommunityPost {
  id: string;
  title: string;
  category?: string;
  price?: string;
  city: string;
  description: string;
  lat: number;
  lng: number;
  createdAt: string;
  image?: string;
  type?: string;
}

export interface SettlementGuide {
  id: string;
  title_i18n: I18nString;
  category: string;
  summary_i18n: I18nString;
  author_i18n: I18nString;
  updatedAt: string;
}

export interface PolicyVote {
  id: string;
  title_i18n: I18nString;
  status: 'active' | 'closed';
  votes: number;
}

export interface Notification {
  id: string;
  type: 'policy' | 'system' | 'activity';
  title_i18n: I18nString;
  message_i18n: I18nString;
  isRead: boolean;
  createdAt: string;
}

export interface ServerHealth {
  name: string;
  status: 'healthy' | 'warning' | 'error';
  load: number;
  uptime: string;
  cacheHitRatio?: number;
}

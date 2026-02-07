
import { StatisticsData, BusinessItem, SettlementGuide, PolicyVote, Notification, ServerHealth, CommunityPost } from './types';

export const MOCK_STATS: StatisticsData[] = [
  { city: 'Toronto', population: 75000, growth: 12 },
  { city: 'Vancouver', population: 58000, growth: 8 },
  { city: 'Montreal', population: 15000, growth: 5 },
  { city: 'Calgary', population: 12000, growth: 15 },
  { city: 'Edmonton', population: 9000, growth: 10 },
];

export const MOCK_MARKETPLACE: CommunityPost[] = [
  { id: 'm1', title: 'IKEA 3단 서랍장', price: '$40', city: 'Toronto', description: '상태 깨끗합니다. 노스욕 픽업.', lat: 43.7615, lng: -79.4111, createdAt: '2h ago', image_urls: ['https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'], author: 'LocalSeller', phone_hash: 'demo_user' },
  { id: 'm2', title: '2019 혼다 시빅', price: '$18,000', city: 'Vancouver', description: '무사고, 6만km 주행.', lat: 49.2827, lng: -123.1207, createdAt: '5h ago', image_urls: ['https://images.unsplash.com/photo-1517672651691-24622a91b550?auto=format&fit=crop&w=800&q=80'], author: 'VancouverCar', phone_hash: 'car_seller' },
];

export const MOCK_JOBS: CommunityPost[] = [
  { id: 'j1', title: '한식당 주방 보조 구합니다', price: '$17/hr', city: 'Toronto', description: '초보 가능, 파트타임.', lat: 43.6532, lng: -79.3832, createdAt: '1h ago', type: 'Hiring', author: 'K-Food', phone_hash: 'job_poster' },
  { id: 'j2', title: '그래픽 디자이너 구직중', price: 'Negotiable', city: 'Calgary', description: '경력 5년, 포트폴리오 유.', lat: 51.0447, lng: -114.0719, createdAt: '3h ago', type: 'Seeking', author: 'DesignerP', phone_hash: 'designer_hash' },
];

export const MOCK_REALESTATE: CommunityPost[] = [
  { id: 'r1', title: '노스욕 1베드 콘도 렌트', price: '$2,400/mo', city: 'Toronto', description: '지하철역 도보 5분.', lat: 43.7615, lng: -79.4111, createdAt: '10m ago', image_urls: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'], author: 'RentPro', phone_hash: 'rent_owner' },
  { id: 'r2', title: '코퀴틀람 하우스 룸쉐어', price: '$900/mo', city: 'Vancouver', description: '즉시 입주 가능.', lat: 49.2838, lng: -122.7932, createdAt: '1h ago', image_urls: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'], author: 'VancouverStay', phone_hash: 'stay_owner' },
];

export const MOCK_FRIENDS: CommunityPost[] = [
  { id: 'f1', title: '주말 축구 모임 모집', city: 'Toronto', description: '실력 상관없이 즐겁게 차실 분.', lat: 43.6532, lng: -79.3832, createdAt: '4h ago', category: 'Sports', author: 'SoccerFan', phone_hash: 'soccer_guy' },
  { id: 'f2', title: '육아 정보 공유해요', city: 'Oakville', description: '근처 사시는 맘들 소통해요.', lat: 43.4675, lng: -79.6877, createdAt: '6h ago', category: 'Parenting', author: 'MomLife', phone_hash: 'mom_hash' },
];

export const MOCK_PROMO: CommunityPost[] = [
  { id: 'p1', title: '새로 오픈한 일식당 특가!', city: 'Toronto', description: '오픈 기념 전메뉴 20% 할인.', lat: 43.6532, lng: -79.3832, createdAt: '12h ago', image_urls: ['https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80'], author: 'SushiHub', phone_hash: 'sushi_owner' },
  { id: 'p2', title: '유학원 무료 상담 서비스', city: 'Vancouver', description: '전문 컨설턴트 1:1 상담.', lat: 49.2827, lng: -123.1207, createdAt: '1d ago', author: 'EduConsult', phone_hash: 'edu_owner' },
];

export const MOCK_BUSINESSES: BusinessItem[] = [
  { 
    id: '1', 
    name_i18n: { ko: '김앤파트너스 회계법인', en: 'Kim & Partners Accounting' }, 
    category: 'Finance', 
    city: 'Toronto', 
    rating: 4.8, 
    description_i18n: { ko: '세무 신고 전문 공인 회계사 그룹.', en: 'Certified Professional Accountants specializing in tax filing.' } 
  },
  { 
    id: '2', 
    name_i18n: { ko: '메이플 이민 서비스', en: 'Maple Immigration Services' }, 
    category: 'Law', 
    city: 'Vancouver', 
    rating: 4.9, 
    description_i18n: { ko: '영주권 취득을 위한 최적의 가이드.', en: 'Helping you navigate the journey to permanent residency.' } 
  },
];

export const MOCK_GUIDES: SettlementGuide[] = [
  { 
    id: 'h1', 
    category: 'Housing', 
    title_i18n: { 
      ko: '캐나다 렌트 계약 시 주의사항', 
      en: 'What to Watch for in Canada Rentals', 
      zh: '加拿大租房注意事项',
      ar: 'ما يجب مراقبته في الإيجارات الكندية'
    }, 
    summary_i18n: { 
      ko: '신용점수 관리법 및 계약서 검토 팁', 
      en: 'Credit score management and contract review tips',
      ar: 'إدارة درجة الائتمان ونصائح مراجعة العقود'
    }, 
    author_i18n: { ko: '김 관리자', en: 'Admin Kim', ar: 'الآدمن كيم' }, 
    updatedAt: '2024-10-25' 
  },
  { 
    id: 'j1', 
    category: 'Jobs', 
    title_i18n: { 
      ko: '현지 이력서(Resume) 작성법', 
      en: 'How to Write a Local Resume',
      zh: '如何撰写本地简历'
    }, 
    summary_i18n: { 
      ko: '캐나다 스타일의 ATS 최적화 팁', 
      en: 'ATS optimization tips in Canadian style' 
    }, 
    author_i18n: { ko: '이 전문가', en: 'Expert Lee' }, 
    updatedAt: '2024-10-24' 
  },
];

export const MOCK_VOTES: PolicyVote[] = [
  { 
    id: 'v1', 
    title_i18n: { 
      ko: '한인 시니어 데이케어 센터 설립 추진', 
      en: 'Establishing a Korean Senior Daycare Center',
      zh: '建立韩国老年日托中心'
    }, 
    status: 'active', 
    votes: 1240 
  },
  { 
    id: 'v2', 
    title_i18n: { 
      ko: '한-캐 청년 취업 비자 쿼터 확대 서명운동', 
      en: 'Expanding Korea-Canada Youth Work Visa Quota',
      zh: '扩大韩加青年就业签证配额'
    }, 
    status: 'active', 
    votes: 3500 
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { 
    id: 'n1', 
    type: 'policy', 
    title_i18n: { ko: '새로운 정책 투표', en: 'New Policy Vote' }, 
    message_i18n: { ko: '이민자 주거 지원책 확대안 투표가 시작되었습니다.', en: 'Voting on the expansion of housing support for immigrants has started.' }, 
    isRead: false, 
    createdAt: '10m ago' 
  },
];

export const MOCK_SERVERS: ServerHealth[] = [
  { name: 'Web-Server-Node-01', status: 'healthy', load: 12, uptime: '142d 5h' },
  { name: 'RDS-Postgres-Main', status: 'healthy', load: 28, uptime: '320d 12h' },
];

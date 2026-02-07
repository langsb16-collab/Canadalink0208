
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import LanguageSwitcher from './components/LanguageSwitcher';
import DashboardView from './components/DashboardView';
import SettlementView from './components/SettlementView';
import BusinessView from './components/BusinessView';
import PolicyView from './components/PolicyView';
import SupportView from './components/SupportView';
import AdminView from './components/AdminView';
import InfraView from './components/InfraView';
import TranslationManagementView from './components/TranslationManagementView';
import VerificationModal from './components/VerificationModal';
import LifestyleHubView from './components/LifestyleHubView';
import PostCreationView from './components/PostCreationView';
import PostDetailView from './components/PostDetailView';
import { Tab, SubView, Language, ParticipationStatus, CommunityPost } from './types';
import { translations } from './locales/translations';
import { MOCK_MARKETPLACE, MOCK_JOBS, MOCK_REALESTATE, MOCK_FRIENDS, MOCK_PROMO } from './constants';
import { Bell, Search, ShieldCheck, CheckCircle2, Info, Lock, Menu, User } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.DASHBOARD);
  const [subView, setSubView] = useState<SubView>(SubView.LIST);
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [editingPost, setEditingPost] = useState<CommunityPost | null>(null);
  const [lang, setLang] = useState<Language>('ko');
  const [showVerification, setShowVerification] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Dynamic listing states (Simulating API)
  const [marketplacePosts, setMarketplacePosts] = useState(MOCK_MARKETPLACE.map(p => ({ ...p, status: 'active' as const })));
  const [jobPosts, setJobPosts] = useState(MOCK_JOBS.map(p => ({ ...p, status: 'active' as const })));
  const [realEstatePosts, setRealEstatePosts] = useState(MOCK_REALESTATE.map(p => ({ ...p, status: 'active' as const })));
  const [friendPosts, setFriendPosts] = useState(MOCK_FRIENDS.map(p => ({ ...p, status: 'active' as const })));
  const [promoPosts, setPromoPosts] = useState(MOCK_PROMO.map(p => ({ ...p, status: 'active' as const })));

  const [participation, setParticipation] = useState<ParticipationStatus>(() => {
    const saved = localStorage.getItem('klink_participation');
    return saved ? JSON.parse(saved) : { isVerified: false };
  });

  const t = translations[lang];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('klink_participation', JSON.stringify(participation));
  }, [participation]);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setSubView(SubView.LIST);
    setSelectedPost(null);
    setEditingPost(null);
  };

  const handleVerificationSuccess = (phone: string) => {
    const mockHash = btoa(phone).substring(0, 16).toLowerCase();
    setParticipation({
      isVerified: true,
      phoneHash: mockHash,
      verifiedAt: new Date().toISOString()
    });
    setShowVerification(false);
  };

  // CRUD Operations
  const handleSavePost = (data: CommunityPost) => {
    const isEdit = subView === SubView.EDIT;
    
    const postWithMeta = { 
      ...data, 
      status: 'active' as const,
      phone_hash: participation.phoneHash,
      author: participation.phoneHash ? `VerifiedUser_${participation.phoneHash.substring(0, 4)}` : 'Member'
    };

    const updateList = (prev: CommunityPost[]) => {
      if (isEdit) return prev.map(p => p.id === data.id ? postWithMeta : p);
      return [postWithMeta, ...prev];
    };

    switch (activeTab) {
      case Tab.MARKETPLACE: setMarketplacePosts(updateList); break;
      case Tab.JOBS: setJobPosts(updateList); break;
      case Tab.REAL_ESTATE: setRealEstatePosts(updateList); break;
      case Tab.FRIENDS: setFriendPosts(updateList); break;
      case Tab.PROMOTION: setPromoPosts(updateList); break;
    }
    
    setSubView(SubView.LIST);
    setEditingPost(null);
  };

  const handleDeletePost = (id: string) => {
    const filterOut = (prev: CommunityPost[]) => prev.filter(p => p.id !== id);
    
    switch (activeTab) {
      case Tab.MARKETPLACE: setMarketplacePosts(filterOut); break;
      case Tab.JOBS: setJobPosts(filterOut); break;
      case Tab.REAL_ESTATE: setRealEstatePosts(filterOut); break;
      case Tab.FRIENDS: setFriendPosts(filterOut); break;
      case Tab.PROMOTION: setPromoPosts(filterOut); break;
    }
    
    setSubView(SubView.LIST);
    setSelectedPost(null);
  };

  const handleReportPost = (id: string, reason: string) => {
    const markAsHidden = (prev: CommunityPost[]) => prev.map(p => p.id === id ? { ...p, status: 'hidden' as const, report_reason: reason } : p);
    
    switch (activeTab) {
      case Tab.MARKETPLACE: setMarketplacePosts(markAsHidden); break;
      case Tab.JOBS: setJobPosts(markAsHidden); break;
      case Tab.REAL_ESTATE: setRealEstatePosts(markAsHidden); break;
      case Tab.FRIENDS: setFriendPosts(markAsHidden); break;
      case Tab.PROMOTION: setPromoPosts(markAsHidden); break;
    }
    
    setSubView(SubView.LIST);
    setSelectedPost(null);
  };

  const renderLifestyleView = (title: string, desc: string, posts: CommunityPost[]) => {
    const activePosts = posts.filter(p => p.status === 'active' || !p.status);

    if (subView === SubView.CREATE || subView === SubView.EDIT) {
      return (
        <PostCreationView 
          title={title} 
          lang={lang} 
          onBack={() => setSubView(SubView.LIST)} 
          onSubmit={handleSavePost} 
          initialData={editingPost}
        />
      );
    }
    
    if (subView === SubView.DETAIL && selectedPost) {
      return (
        <PostDetailView 
          post={selectedPost} 
          lang={lang} 
          onBack={() => setSubView(SubView.LIST)} 
          participation={participation}
          onEdit={(post) => {
            setEditingPost(post);
            setSubView(SubView.EDIT);
          }}
          onDelete={handleDeletePost}
          onReport={handleReportPost}
        />
      );
    }
    
    return (
      <LifestyleHubView 
        title={title}
        description={desc}
        posts={activePosts}
        lang={lang}
        onRequireVerification={() => setShowVerification(true)}
        participation={participation}
        isMobile={isMobile}
        onCreate={() => {
          setEditingPost(null);
          setSubView(SubView.CREATE);
        }}
        onDetail={(post) => {
          setSelectedPost(post);
          setSubView(SubView.DETAIL);
        }}
      />
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case Tab.DASHBOARD: return <DashboardView lang={lang} />;
      case Tab.SETTLEMENT: return <SettlementView lang={lang} />;
      case Tab.BUSINESS: return <BusinessView lang={lang} />;
      
      case Tab.MARKETPLACE: 
        return renderLifestyleView(lang === 'ko' ? "중고거래" : "Marketplace", lang === 'ko' ? "이웃과 함께하는 안전한 중고 물품 거래" : "Safe second-hand trading with neighbors", marketplacePosts);
      
      case Tab.JOBS:
        return renderLifestyleView(lang === 'ko' ? "구인구직" : "Jobs", lang === 'ko' ? "한인 비즈니스 구인과 구직의 연결점" : "Connecting Korean businesses and job seekers", jobPosts);

      case Tab.REAL_ESTATE:
        return renderLifestyleView(lang === 'ko' ? "부동산" : "Real Estate", lang === 'ko' ? "렌트, 매매, 룸쉐어 정보를 한눈에" : "Rentals, sales, and room share at a glance", realEstatePosts);

      case Tab.FRIENDS:
        return renderLifestyleView(lang === 'ko' ? "친구찾기" : "Friends", lang === 'ko' ? "취미와 관심사가 비슷한 이웃을 찾아보세요" : "Find neighbors with similar hobbies and interests", friendPosts);

      case Tab.PROMOTION:
        return renderLifestyleView(lang === 'ko' ? "지역홍보" : "Promotion", lang === 'ko' ? "소상공인과 개인의 서비스를 알리는 공간" : "A space for small businesses and personal services", promoPosts);

      case Tab.POLICY: return <PolicyView participation={participation} onRequireVerification={() => setShowVerification(true)} lang={lang} />;
      case Tab.SUPPORT: return <SupportView />;
      case Tab.ADMIN: return <AdminView />;
      case Tab.INFRA: return <InfraView />;
      case Tab.TRANSLATION: return <TranslationManagementView />;
      default: return <DashboardView lang={lang} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex font-sans antialiased text-slate-900 overflow-x-hidden">
      {!isMobile && <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} lang={lang} />}
      
      <main className={`flex-1 flex flex-col transition-all duration-300 ${isMobile ? 'pb-24 pt-4 px-4' : 'md:ml-80 md:mr-4 my-4 pb-4'}`}>
        {/* Header - Adaptive */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 md:mb-10 md:px-8">
          <div className="w-full md:w-auto flex items-center justify-between gap-6 cursor-pointer" onClick={() => handleTabChange(Tab.DASHBOARD)}>
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">K</div>
                <div className="flex flex-col">
                  <h1 className="font-black text-slate-900 uppercase tracking-tighter leading-none text-xl">K-Link</h1>
                  <p className="text-[8px] font-black text-indigo-500 uppercase tracking-widest mt-1">Canada Network</p>
                </div>
             </div>
             
             {isMobile && (
               <div className="flex gap-2">
                 <button onClick={() => setShowVerification(true)} className="w-10 h-10 bg-white rounded-xl shadow-soft flex items-center justify-center text-slate-400">
                   <User size={20} />
                 </button>
                 <LanguageSwitcher currentLang={lang} setLang={setLang} minimal />
               </div>
             )}
          </div>
          
          {!isMobile && (
            <div className="flex items-center justify-end gap-4">
               <div className={`flex items-center gap-3 px-5 py-2.5 rounded-[12px] border soft-shadow bg-white border-slate-100`}>
                 <div className={`w-2 h-2 rounded-full ${participation.isVerified ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                   {participation.isVerified ? `${t.auth.verified}` : `${t.auth.guest}`}
                 </p>
               </div>

               <LanguageSwitcher currentLang={lang} setLang={setLang} />
               
               <button 
                  onClick={() => !participation.isVerified && setShowVerification(true)}
                  className="hidden sm:flex items-center gap-3 bg-white pl-2 pr-6 py-2 rounded-[16px] soft-shadow border border-white hover:bg-slate-50 transition-all group relative"
               >
                  <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-lg font-black text-xs relative overflow-hidden">
                    {participation.isVerified ? 'ID' : <Lock size={14} />}
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-black text-slate-800 uppercase line-clamp-1">
                      {participation.isVerified ? `${participation.phoneHash}` : `${t.auth.anonymous}`}
                    </p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter flex items-center gap-1">
                      {participation.isVerified ? <><CheckCircle2 size={10} className="text-emerald-500" /> {t.auth.verified}</> : t.auth.auth_needed}
                    </p>
                  </div>
               </button>
            </div>
          )}
        </header>

        <div className={`w-full max-w-7xl mx-auto ${isMobile ? 'px-0' : 'px-8'}`}>
          {renderContent()}
        </div>
      </main>

      {isMobile && <BottomNav activeTab={activeTab} setActiveTab={handleTabChange} lang={lang} />}
      
      {showVerification && (
        <VerificationModal 
          onClose={() => setShowVerification(false)} 
          onSuccess={handleVerificationSuccess} 
        />
      )}
    </div>
  );
};

export default App;

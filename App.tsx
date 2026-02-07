
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
import { Tab, Language, ParticipationStatus } from './types';
import { translations } from './locales/translations';
import { MOCK_NOTIFICATIONS, MOCK_MARKETPLACE, MOCK_JOBS, MOCK_REALESTATE, MOCK_FRIENDS, MOCK_PROMO } from './constants';
import { Bell, Search, ShieldCheck, CheckCircle2, Info, Lock, Menu, User } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.DASHBOARD);
  const [lang, setLang] = useState<Language>('ko');
  const [showVerification, setShowVerification] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
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

  const handleVerificationSuccess = (phone: string) => {
    const mockHash = btoa(phone).substring(0, 16).toLowerCase();
    setParticipation({
      isVerified: true,
      phoneHash: mockHash,
      verifiedAt: new Date().toISOString()
    });
    setShowVerification(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case Tab.DASHBOARD: return <DashboardView lang={lang} />;
      case Tab.SETTLEMENT: return <SettlementView lang={lang} />;
      case Tab.BUSINESS: return <BusinessView lang={lang} />;
      
      case Tab.MARKETPLACE: 
        return <LifestyleHubView 
          title={lang === 'ko' ? "중고거래" : "Marketplace"} 
          description={lang === 'ko' ? "이웃과 함께하는 안전한 중고 물품 거래" : "Safe second-hand trading with neighbors"}
          posts={MOCK_MARKETPLACE}
          lang={lang}
          onRequireVerification={() => setShowVerification(true)}
          participation={participation}
          isMobile={isMobile}
        />;
      
      case Tab.JOBS:
        return <LifestyleHubView 
          title={lang === 'ko' ? "구인구직" : "Jobs"} 
          description={lang === 'ko' ? "한인 비즈니스 구인과 구직의 연결점" : "Connecting Korean businesses and job seekers"}
          posts={MOCK_JOBS}
          lang={lang}
          onRequireVerification={() => setShowVerification(true)}
          participation={participation}
          isMobile={isMobile}
        />;

      case Tab.REAL_ESTATE:
        return <LifestyleHubView 
          title={lang === 'ko' ? "부동산" : "Real Estate"} 
          description={lang === 'ko' ? "렌트, 매매, 룸쉐어 정보를 한눈에" : "Rentals, sales, and room share at a glance"}
          posts={MOCK_REALESTATE}
          lang={lang}
          onRequireVerification={() => setShowVerification(true)}
          participation={participation}
          isMobile={isMobile}
        />;

      case Tab.FRIENDS:
        return <LifestyleHubView 
          title={lang === 'ko' ? "친구찾기" : "Friends"} 
          description={lang === 'ko' ? "취미와 관심사가 비슷한 이웃을 찾아보세요" : "Find neighbors with similar hobbies and interests"}
          posts={MOCK_FRIENDS}
          lang={lang}
          onRequireVerification={() => setShowVerification(true)}
          participation={participation}
          isMobile={isMobile}
        />;

      case Tab.PROMOTION:
        return <LifestyleHubView 
          title={lang === 'ko' ? "지역홍보" : "Promotion"} 
          description={lang === 'ko' ? "소상공인과 개인의 서비스를 알리는 공간" : "A space for small businesses and personal services"}
          posts={MOCK_PROMO}
          lang={lang}
          onRequireVerification={() => setShowVerification(true)}
          participation={participation}
          isMobile={isMobile}
        />;

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
      {!isMobile && <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} lang={lang} />}
      
      <main className={`flex-1 flex flex-col transition-all duration-300 ${isMobile ? 'pb-24 pt-4 px-4' : 'md:ml-80 md:mr-4 my-4 pb-4'}`}>
        {/* Header - Adaptive */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 md:mb-10 md:px-8">
          <div className="w-full md:w-auto flex items-center justify-between gap-6">
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

      {isMobile && <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} lang={lang} />}
      
      {showVerification && (
        <VerificationModal 
          onClose={() => setShowVerification(false)} 
          onSuccess={handleVerificationSuccess} 
        />
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        [dir="rtl"] { text-align: right; }
      `}</style>
    </div>
  );
};

export default App;

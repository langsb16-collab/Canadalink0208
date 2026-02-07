
import React from 'react';
import { Tab, Language } from '../types';
import { translations } from '../locales/translations';
import { 
  LayoutDashboard, Compass, Briefcase, Vote, HeartHandshake, 
  ShieldCheck, Server, LogOut, Languages, ChevronDown, User, 
  Settings, Key, ShoppingBag, UserCircle2, Home, Users2, Megaphone
} from 'lucide-react';

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  lang: Language;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, lang }) => {
  const t = translations[lang];
  
  const hubItems = [
    { id: Tab.DASHBOARD, label: t.dashboard, icon: LayoutDashboard },
    { id: Tab.SETTLEMENT, label: t.settlement, icon: Compass },
    { id: Tab.BUSINESS, label: t.business, icon: Briefcase },
  ];

  const lifeItems = [
    { id: Tab.MARKETPLACE, label: lang === 'ko' ? '중고거래' : 'Marketplace', icon: ShoppingBag },
    { id: Tab.JOBS, label: lang === 'ko' ? '구인구직' : 'Jobs', icon: UserCircle2 },
    { id: Tab.REAL_ESTATE, label: lang === 'ko' ? '부동산' : 'Real Estate', icon: Home },
    { id: Tab.FRIENDS, label: lang === 'ko' ? '친구찾기' : 'Find Friends', icon: Users2 },
    { id: Tab.PROMOTION, label: lang === 'ko' ? '지역홍보' : 'Promotion', icon: Megaphone },
  ];

  return (
    <aside className="hidden md:flex w-72 h-[calc(100vh-32px)] m-4 fixed left-0 top-0 z-50 bg-[#1E293B] rounded-[40px] text-white/60 flex-col shadow-2xl">
      {/* Brand Header */}
      <div className="p-10 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-indigo-600/20">K</div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tighter uppercase leading-none">K-Link</h1>
            <p className="text-[8px] text-indigo-400 font-black uppercase tracking-[0.3em] mt-1">Life Infrastructure</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 space-y-1.5 overflow-y-auto scrollbar-hide">
        <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] px-4 mb-3 mt-4">Hub Operations</div>
        {hubItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-[20px] transition-all duration-300 group ${
              activeTab === item.id 
                ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/20 scale-[1.02]' 
                : 'hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon size={18} strokeWidth={activeTab === item.id ? 2.5 : 2} className={activeTab === item.id ? 'text-white' : 'text-white/30 group-hover:text-white'} />
            <span className="font-black text-[13px] uppercase tracking-tight">{item.label}</span>
          </button>
        ))}

        <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] px-4 mb-3 mt-6">Lifestyle Hub</div>
        {lifeItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-6 py-3 rounded-[20px] transition-all duration-300 group ${
              activeTab === item.id 
                ? 'bg-indigo-600 text-white shadow-xl scale-[1.02]' 
                : 'hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon size={18} className={activeTab === item.id ? 'text-white' : 'text-white/30 group-hover:text-white'} />
            <span className="font-bold text-[12px] uppercase tracking-tight">{item.label}</span>
          </button>
        ))}

        <div className="pt-8">
           <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] px-4 mb-3">Community & Admin</div>
           
           <button
            onClick={() => setActiveTab(Tab.POLICY)}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-[20px] transition-all duration-300 mb-1.5 group ${
              activeTab === Tab.POLICY ? 'bg-indigo-600 text-white' : 'hover:bg-white/5 hover:text-white'
            }`}
          >
            <Vote size={18} className="text-white/30 group-hover:text-white" />
            <span className="font-black text-[13px] uppercase tracking-tight">{t.policy}</span>
          </button>

           <button
            onClick={() => setActiveTab(Tab.SUPPORT)}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-[20px] transition-all duration-300 mb-1.5 group ${
              activeTab === Tab.SUPPORT ? 'bg-rose-600 text-white' : 'hover:bg-white/5 hover:text-white'
            }`}
          >
            <HeartHandshake size={18} className="text-white/30 group-hover:text-white" />
            <span className="font-black text-[13px] uppercase tracking-tight">{t.support}</span>
          </button>

           <button
            onClick={() => setActiveTab(Tab.ADMIN)}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-[20px] transition-all duration-300 group ${
              activeTab === Tab.ADMIN ? 'bg-slate-700 text-white shadow-xl' : 'hover:bg-white/5 hover:text-white'
            }`}
          >
            <ShieldCheck size={18} className={activeTab === Tab.ADMIN ? 'text-white' : 'text-white/30 group-hover:text-white'} />
            <span className="font-black text-[13px] uppercase tracking-tight">Admin Console</span>
          </button>
        </div>
      </nav>

      {/* Footer Profile */}
      <div className="p-8">
         <div className="bg-white/5 p-4 rounded-[32px] border border-white/5 flex items-center gap-4 group cursor-pointer hover:bg-white/10 transition-all">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white border-2 border-white/10 shadow-lg relative overflow-hidden">
               <img src="https://ui-avatars.com/api/?name=User&background=6366f1&color=fff" alt="User" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 overflow-hidden">
               <p className="text-[10px] font-black text-white leading-none truncate">K-Link Explorer</p>
               <p className="text-[8px] text-indigo-400 font-bold mt-1 uppercase tracking-tighter">Verified Member</p>
            </div>
            <ChevronDown size={12} className="text-white/20 group-hover:text-white transition-colors" />
         </div>
      </div>
    </aside>
  );
};

export default Sidebar;

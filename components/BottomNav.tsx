
import React from 'react';
import { Tab, Language } from '../types';
import { translations } from '../locales/translations';
import { LayoutDashboard, ShoppingBag, Home, Vote, HeartHandshake, Compass } from 'lucide-react';

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  lang: Language;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab, lang }) => {
  const t = translations[lang];
  const items = [
    { id: Tab.DASHBOARD, icon: LayoutDashboard, label: t.dashboard },
    { id: Tab.SETTLEMENT, icon: Compass, label: t.settlement },
    { id: Tab.MARKETPLACE, icon: ShoppingBag, label: lang === 'ko' ? '거래' : 'Buy/Sell' },
    { id: Tab.REAL_ESTATE, icon: Home, label: lang === 'ko' ? '부동산' : 'Estate' },
    { id: Tab.POLICY, icon: Vote, label: t.policy },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-2 py-3 z-[120] md:hidden flex justify-around items-center rounded-t-[32px] shadow-2xl">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${
            activeTab === item.id ? 'text-indigo-600 scale-110' : 'text-slate-400'
          }`}
        >
          <item.icon size={22} strokeWidth={activeTab === item.id ? 2.5 : 2} />
          <span className="text-[9px] font-black uppercase tracking-tighter">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;

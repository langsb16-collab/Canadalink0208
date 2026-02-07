
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_STATS } from '../constants';
import { geminiService } from '../services/geminiService';
import { translations } from '../locales/translations';
import { 
  TrendingUp, Users, DollarSign, Activity, Sparkles, 
  Share2, User, Zap, Settings, X, Check, Globe
} from 'lucide-react';

interface DashboardViewProps {
  lang: string;
}

interface NetworkSettings {
  showConnections: boolean;
  highlightActive: boolean;
  filterRecent: boolean;
}

const DashboardView: React.FC<DashboardViewProps> = ({ lang }) => {
  const t = translations[lang].dash;
  const nt = translations[lang].network || translations['en'].network;
  const [reportSummary, setReportSummary] = useState<string>(t.ai_loading);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const [settings, setSettings] = useState<NetworkSettings>(() => {
    const saved = localStorage.getItem('klink_network_settings');
    return saved ? JSON.parse(saved) : {
      showConnections: true,
      highlightActive: true,
      filterRecent: false
    };
  });

  useEffect(() => {
    localStorage.setItem('klink_network_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const fetchAnalysis = async () => {
      const summary = await geminiService.analyzeCommunityTrends(MOCK_STATS, lang);
      setReportSummary(summary);
    };
    fetchAnalysis();
  }, [lang]);

  const statsCards = [
    { title: t.total_members, value: '245,324', change: '+2,031', icon: Users, color: 'bg-slate-900 text-white', dark: true },
    { title: t.community_success, value: '92.5%', change: '+1.2%', icon: Activity, color: 'bg-white text-slate-900' },
    { title: t.business_transactions, value: '$221,324', change: '-$2,201', icon: DollarSign, color: 'bg-white text-slate-900' },
    { title: t.policy_engagement, value: '16,703', change: '+3,392', icon: TrendingUp, color: 'bg-white text-slate-900' },
  ];

  const toggleSetting = (key: keyof NetworkSettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-24 relative">
      {/* KPI Section */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-2 px-2">
         <div>
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">{t.analytics_title}</h2>
            <p className="text-slate-500 text-sm font-medium">{t.analytics_desc}</p>
         </div>
         <div className="flex gap-2 mt-4 md:mt-0">
            <span className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-indigo-100 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
              {t.live_network}
            </span>
         </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card, idx) => (
          <div key={idx} className={`${card.color} p-5 rounded-[28px] soft-shadow border border-white relative overflow-hidden group transition-all hover:translate-y-[-2px]`}>
             <div className="flex justify-between items-start mb-3">
               <div className="flex flex-col">
                  <p className={`text-[8px] font-black uppercase tracking-widest ${card.dark ? 'text-white/40' : 'text-slate-400'} mb-0.5`}>{card.title}</p>
                  <h3 className="text-xl font-black leading-tight">{card.value}</h3>
                  <p className={`text-[8px] font-bold mt-1 ${card.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {card.change} {t.from_last_month}
                  </p>
               </div>
               <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.dark ? 'bg-white/10' : 'bg-slate-50'}`}>
                  <card.icon size={18} className={card.dark ? 'text-white' : 'text-slate-900'} />
               </div>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-[32px] soft-shadow border border-white relative flex flex-col min-h-[500px]">
           <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">{t.network_title}</h4>
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className={`p-2.5 rounded-xl transition-all duration-300 ${isSettingsOpen ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:text-indigo-600'}`}
              >
                 <Settings size={18} className={isSettingsOpen ? 'animate-spin-slow' : ''} />
              </button>
           </div>
           
           {/* PREMIUM VISUAL NETWORK AREA */}
           <div className="h-[180px] relative flex items-center justify-center rounded-2xl border border-slate-100 mb-6 overflow-hidden transition-all shadow-inner">
               {/* Premium Background Image with Overlay */}
               <div className="absolute inset-0 z-0">
                  <div 
                    className={`w-full h-full bg-cover bg-center transition-all duration-1000 grayscale-[0.5] ${settings.filterRecent ? 'opacity-40' : 'opacity-100'}`}
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1200&q=80')" }}
                  ></div>
                  <div className={`absolute inset-0 bg-slate-900/40 mix-blend-overlay transition-opacity duration-500 ${settings.showConnections ? 'opacity-100' : 'opacity-0'}`}></div>
               </div>

               {/* Connections Layer (SVG) - Enhanced for dark background */}
               <svg className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500 z-10 ${settings.showConnections ? 'opacity-30' : 'opacity-0'}`}>
                  <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray={settings.filterRecent ? "4,4" : "0"} />
                  <line x1="80%" y1="20%" x2="50%" y2="50%" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray={settings.filterRecent ? "4,4" : "0"} />
                  <line x1="30%" y1="80%" x2="50%" y2="50%" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray={settings.filterRecent ? "4,4" : "0"} />
                  <line x1="70%" y1="75%" x2="50%" y2="50%" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray={settings.filterRecent ? "4,4" : "0"} />
               </svg>

               {/* Nodes Layer - Scaled Down Nodes with Glow */}
               <div className="relative z-20 grid grid-cols-3 gap-10 transition-all items-center">
                  <div className={`w-9 h-9 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white transition-all ${settings.highlightActive ? 'animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.4)]' : ''}`}><User size={14} /></div>
                  <div className="w-9 h-9 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white"><User size={14} /></div>
                  {!settings.filterRecent && (
                    <div className="w-9 h-9 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white"><User size={14} /></div>
                  )}
                  <div className={`col-start-2 w-11 h-11 bg-indigo-600 rounded-full flex items-center justify-center text-white ring-4 ring-indigo-500/20 shadow-2xl transition-all ${settings.highlightActive ? 'scale-110' : ''}`}>
                    <Globe size={18} className="animate-pulse" />
                  </div>
                  {!settings.filterRecent && (
                    <div className="w-9 h-9 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white"><User size={14} /></div>
                  )}
               </div>
               
               <div className="absolute bottom-4 right-5 z-20">
                  <p className="text-[9px] font-black text-white/60 uppercase tracking-widest drop-shadow-md">{t.active_links}: {settings.filterRecent ? '8,412' : '14,204'}</p>
               </div>
            </div>

           {/* Area Chart */}
           <div className="h-[150px] mb-2">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={MOCK_STATS}>
                    <defs>
                       <linearGradient id="colorInd" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="city" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 9, fontWeight: 700}} dy={8} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 9}} />
                    <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', fontSize: '11px'}} />
                    <Area type="monotone" dataKey="population" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorInd)" />
                 </AreaChart>
              </ResponsiveContainer>
           </div>

           {/* Network Settings Modal Overlay */}
           {isSettingsOpen && (
             <div className="absolute inset-0 z-[100] bg-white/70 backdrop-blur-md rounded-[32px] animate-fadeIn p-8 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                   <h5 className="text-lg font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                      <Settings size={20} className="text-indigo-600" /> {nt.settings_title}
                   </h5>
                   <button onClick={() => setIsSettingsOpen(false)} className="p-2 bg-slate-900 text-white rounded-xl shadow-lg active:scale-95 transition-all">
                      <X size={16} />
                   </button>
                </div>

                <div className="space-y-4 flex-1">
                   {[
                     { id: 'showConnections', label: nt.visualize, desc: nt.visualize_desc },
                     { id: 'highlightActive', label: nt.highlight, desc: nt.highlight_desc },
                     { id: 'filterRecent', label: nt.recent, desc: nt.recent_desc }
                   ].map(item => (
                      <div 
                        key={item.id}
                        onClick={() => toggleSetting(item.id as keyof NetworkSettings)}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between group ${settings[item.id as keyof NetworkSettings] ? 'border-indigo-600 bg-indigo-50/30' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                      >
                         <div className="space-y-0.5">
                            <p className="text-xs font-black text-slate-900">{item.label}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">{item.desc}</p>
                         </div>
                         <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${settings[item.id as keyof NetworkSettings] ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-300'}`}>
                            {settings[item.id as keyof NetworkSettings] ? <Check size={14} /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>}
                         </div>
                      </div>
                   ))}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end gap-2">
                   <button onClick={() => setIsSettingsOpen(false)} className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">{nt.save}</button>
                </div>
             </div>
           )}
        </div>

        {/* Sidebar Analytics */}
        <div className="space-y-6">
           <div className="bg-[#0F172A] p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Sparkles size={80} />
              </div>
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                 <Zap size={18} className="text-amber-400" /> {t.ai_report}
              </h4>
              <div className="space-y-4">
                 <p className="text-xs text-slate-400 leading-relaxed italic font-medium whitespace-pre-line max-h-[300px] overflow-y-auto scrollbar-hide">
                    {reportSummary}
                 </p>
                 <div className="pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center mb-1.5">
                       <span className="text-[9px] font-black uppercase text-slate-500">Security Pulse</span>
                       <span className="text-[9px] font-black uppercase text-emerald-500">Normal</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 w-[92%]"></div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[40px] soft-shadow border border-white">
              <h4 className="text-lg font-black text-slate-900 uppercase mb-6">System Health</h4>
              <div className="space-y-4">
                 {[
                   { label: 'Cloudflare Edge', status: 'Healthy', val: '22ms' },
                   { label: 'D1 DB Engine', status: 'Optimal', val: '18ms' },
                   { label: 'R2 Asset Delivery', status: 'Active', val: '99.9%' }
                 ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                       <div>
                          <p className="text-[11px] font-black text-slate-900">{item.label}</p>
                          <p className="text-[8px] font-bold text-emerald-500 uppercase">{item.status}</p>
                       </div>
                       <span className="text-[11px] font-black text-slate-400">{item.val}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>
    </div>
  );
};

export default DashboardView;

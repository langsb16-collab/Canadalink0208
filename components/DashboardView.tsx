
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_STATS } from '../constants';
import { geminiService } from '../services/geminiService';
import { translations } from '../locales/translations';
import { 
  TrendingUp, Users, DollarSign, Activity, Sparkles, 
  Share2, User, Zap, ShoppingBag, UserCheck, Settings 
} from 'lucide-react';

interface DashboardViewProps {
  lang: string;
}

const DashboardView: React.FC<DashboardViewProps> = ({ lang }) => {
  const t = translations[lang].dash;
  const [reportSummary, setReportSummary] = useState<string>(t.ai_loading);

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

  return (
    <div className="space-y-10 animate-fadeIn pb-24">
      {/* KPI Section */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-4 px-2">
         <div>
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">{t.analytics_title}</h2>
            <p className="text-slate-500 font-medium">{t.analytics_desc}</p>
         </div>
         <div className="flex gap-2 mt-4 md:mt-0">
            <span className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
              {t.live_network}
            </span>
         </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, idx) => (
          <div key={idx} className={`${card.color} p-8 rounded-[40px] soft-shadow border border-white relative overflow-hidden group transition-all hover:translate-y-[-4px]`}>
             <div className="flex justify-between items-start mb-6">
               <div className="flex flex-col">
                  <p className={`text-[10px] font-black uppercase tracking-widest ${card.dark ? 'text-white/40' : 'text-slate-400'} mb-1`}>{card.title}</p>
                  <h3 className="text-3xl font-black">{card.value}</h3>
                  <p className={`text-[10px] font-bold mt-1 ${card.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {card.change} {t.from_last_month}
                  </p>
               </div>
               <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${card.dark ? 'bg-white/10' : 'bg-slate-50'}`}>
                  <card.icon size={24} className={card.dark ? 'text-white' : 'text-slate-900'} />
               </div>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[50px] soft-shadow border border-white">
           <div className="flex justify-between items-center mb-10">
              <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">{t.network_title}</h4>
              <button className="p-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-indigo-600 transition-colors">
                 <Settings size={20} />
              </button>
           </div>
           
           <div className="h-[300px] relative flex items-center justify-center bg-slate-50/50 rounded-3xl border border-slate-100 mb-8">
               <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                  <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="#4F46E5" strokeWidth="2" />
                  <line x1="80%" y1="20%" x2="50%" y2="50%" stroke="#4F46E5" strokeWidth="2" />
                  <line x1="30%" y1="80%" x2="50%" y2="50%" stroke="#4F46E5" strokeWidth="2" />
                  <line x1="70%" y1="75%" x2="50%" y2="50%" stroke="#4F46E5" strokeWidth="2" />
               </svg>
               <div className="relative z-10 grid grid-cols-3 gap-12">
                  <div className="w-14 h-14 bg-white rounded-full soft-shadow border-4 border-indigo-500 flex items-center justify-center text-indigo-500"><User size={20} /></div>
                  <div className="w-14 h-14 bg-white rounded-full soft-shadow border-4 border-emerald-500 flex items-center justify-center text-emerald-500"><User size={20} /></div>
                  <div className="w-14 h-14 bg-white rounded-full soft-shadow border-4 border-amber-500 flex items-center justify-center text-amber-500"><User size={20} /></div>
                  <div className="col-start-2 w-18 h-18 bg-indigo-600 rounded-full soft-shadow flex items-center justify-center text-white ring-8 ring-indigo-50"><Share2 size={24} /></div>
                  <div className="w-14 h-14 bg-white rounded-full soft-shadow border-4 border-rose-500 flex items-center justify-center text-rose-500"><User size={20} /></div>
               </div>
               <div className="absolute bottom-6 right-6">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.active_links}: 14,204</p>
               </div>
            </div>

           <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={MOCK_STATS}>
                    <defs>
                       <linearGradient id="colorInd" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="city" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 800}} dy={15} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                    <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}} />
                    <Area type="monotone" dataKey="population" stroke="#4F46E5" strokeWidth={5} fillOpacity={1} fill="url(#colorInd)" />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Sidebar Analytics */}
        <div className="space-y-8">
           <div className="bg-[#0F172A] p-10 rounded-[50px] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                 <Sparkles size={100} />
              </div>
              <h4 className="text-xl font-bold mb-8 flex items-center gap-2">
                 <Zap size={20} className="text-amber-400" /> {t.ai_report}
              </h4>
              <div className="space-y-6">
                 <p className="text-sm text-slate-400 leading-relaxed italic font-medium whitespace-pre-line max-h-[400px] overflow-y-auto scrollbar-hide">
                    {reportSummary}
                 </p>
                 <div className="pt-6 border-t border-white/5">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[10px] font-black uppercase text-slate-500">Security Pulse</span>
                       <span className="text-[10px] font-black uppercase text-emerald-500">Normal</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 w-[92%]"></div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white p-10 rounded-[50px] soft-shadow border border-white">
              <h4 className="text-xl font-black text-slate-900 uppercase mb-8">System Health</h4>
              <div className="space-y-6">
                 {[
                   { label: 'Cloudflare Edge', status: 'Healthy', val: '22ms' },
                   { label: 'D1 DB Engine', status: 'Optimal', val: '18ms' },
                   { label: 'R2 Asset Delivery', status: 'Active', val: '99.9%' }
                 ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                       <div>
                          <p className="text-xs font-black text-slate-900">{item.label}</p>
                          <p className="text-[9px] font-bold text-emerald-500 uppercase">{item.status}</p>
                       </div>
                       <span className="text-xs font-black text-slate-400">{item.val}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;

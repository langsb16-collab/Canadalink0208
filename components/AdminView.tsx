
import React, { useState } from 'react';
import { 
  ShieldCheck, AlertCircle, CheckCircle2, XCircle, 
  Search, Filter, Plus, Activity, Zap, Server, 
  Map as MapIcon, Calendar, Clock, ChevronRight, 
  MoreVertical, ArrowUpRight, ArrowDownRight, Trash2, 
  Eye, Globe, Terminal, Box, MessageSquare, List,
  BarChart3, Settings, Edit3, RotateCcw, Ban, UserCheck,
  // Fix: Added missing icon imports to resolve compilation errors
  Users, LayoutDashboard, Vote, FileText, Languages
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';

type AdminTab = 'dashboard' | 'policies' | 'comments' | 'polls' | 'content' | 'translation' | 'analytics' | 'logs';

const AdminView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [showModal, setShowModal] = useState(false);
  
  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#F43F5E', '#8B5CF6'];

  const kpis = [
    { label: "Today's Visitors", value: '4,284', change: '+12%', icon: Users },
    { label: "Participation", value: '821', change: '+5%', icon: Activity },
    { label: "Active Polls", value: '12', change: 'Live', icon: Zap },
    { label: "Pending Review", value: '18', change: 'Urgent', icon: AlertCircle },
  ];

  const renderSubNav = () => (
    <div className="flex bg-white p-2 rounded-[24px] soft-shadow border border-slate-100 overflow-x-auto scrollbar-hide mb-8">
      {[
        { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'policies', icon: List, label: 'Policies' },
        { id: 'comments', icon: MessageSquare, label: 'Comments' },
        { id: 'polls', icon: Vote, label: 'Polls' },
        { id: 'content', icon: FileText, label: 'Guides' },
        { id: 'translation', icon: Languages, label: 'Review' },
        { id: 'analytics', icon: BarChart3, label: 'Stats' },
        { id: 'logs', icon: Terminal, label: 'Logs' },
      ].map(tab => (
        <button 
          key={tab.id}
          onClick={() => setActiveTab(tab.id as AdminTab)}
          className={`px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <tab.icon size={16} />
          {tab.label}
        </button>
      ))}
    </div>
  );

  return (
    <div className="space-y-8 animate-fadeIn pb-24">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Admin Kit <span className="text-indigo-600">PRO</span></h2>
          <p className="text-slate-500 font-medium mt-1">Infrastructure: Cloudflare Edge (D1 + KV + R2)</p>
        </div>
        <div className="flex gap-3">
           <div className="bg-emerald-500/10 text-emerald-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 border border-emerald-500/20">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Serverless Active
           </div>
        </div>
      </div>

      {renderSubNav()}

      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, i) => (
              <div key={i} className="bg-white p-8 rounded-[40px] soft-shadow border border-white group">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{kpi.label}</p>
                <div className="flex items-end justify-between">
                   <h3 className="text-3xl font-black text-slate-900">{kpi.value}</h3>
                   <span className="text-[10px] font-bold text-emerald-500">{kpi.change}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-10 rounded-[50px] soft-shadow border border-white">
               <h4 className="text-xl font-black mb-8 uppercase tracking-tight">Real-time Activity Stream</h4>
               <div className="space-y-6">
                 {[
                   { time: '12:03', action: 'Comment Deleted', target: 'CommentID_881', admin: 'hash_f42' },
                   { time: '12:05', action: 'Policy Approved', target: 'PolicyID_551', admin: 'hash_f42' },
                   { time: '12:07', action: 'Poll Created', target: 'PollID_22', admin: 'hash_f42' },
                 ].map((log, i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-4">
                        <Clock size={14} className="text-slate-400" />
                        <span className="text-xs font-black text-slate-900">{log.time}</span>
                        <span className="text-xs font-bold text-slate-500">{log.action}</span>
                      </div>
                      <span className="text-[10px] font-black text-indigo-500 uppercase">{log.target}</span>
                   </div>
                 ))}
               </div>
            </div>
            <div className="bg-[#0F172A] p-10 rounded-[50px] text-white shadow-2xl flex flex-col justify-between">
               <div>
                 <h4 className="text-xl font-bold mb-8 flex items-center gap-2">
                    <Zap size={18} className="text-amber-400" /> System Pulse
                 </h4>
                 <div className="space-y-6">
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-black uppercase text-slate-400">D1 Response</span>
                       <span className="text-sm font-black text-emerald-500">22ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-black uppercase text-slate-400">KV Hit Ratio</span>
                       <span className="text-sm font-black text-indigo-400">98.4%</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-black uppercase text-slate-400">R2 Storage</span>
                       <span className="text-sm font-black">1.2 TB</span>
                    </div>
                 </div>
               </div>
               <button className="mt-10 w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all">
                  Run Maintenance
               </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'policies' && (
        <div className="bg-white rounded-[40px] soft-shadow border border-white overflow-hidden">
           <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <h4 className="text-xl font-black uppercase tracking-tight">Policy Proposals</h4>
              <div className="flex gap-2">
                 <div className="relative">
                    <input type="text" placeholder="Search proposals..." className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500/20" />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                 </div>
                 <button className="p-2 bg-slate-50 rounded-xl text-slate-400"><Filter size={18} /></button>
              </div>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                       <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Title</th>
                       <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Langs</th>
                       <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                       <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                       <th className="px-10 py-5"></th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {[1, 2, 3].map(i => (
                       <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-10 py-6">
                             <p className="text-sm font-black text-slate-800">이민자 주거 지원 확대안</p>
                          </td>
                          <td className="px-6 py-6">
                             <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">12 / 12</span>
                          </td>
                          <td className="px-6 py-6 text-xs text-slate-400 font-bold">2024-02-07</td>
                          <td className="px-6 py-6">
                             <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase">Pending</span>
                          </td>
                          <td className="px-10 py-6 text-right">
                             <div className="flex justify-end gap-2">
                                <button className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><CheckCircle2 size={16} /></button>
                                <button className="p-2 bg-rose-50 text-rose-600 rounded-lg"><XCircle size={16} /></button>
                                <button onClick={() => setShowModal(true)} className="p-2 bg-slate-100 text-slate-400 rounded-lg"><Eye size={16} /></button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      )}

      {activeTab === 'comments' && (
        <div className="bg-white rounded-[40px] soft-shadow border border-white overflow-hidden">
           <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <h4 className="text-xl font-black uppercase tracking-tight">Community Moderation</h4>
              <div className="flex items-center gap-4">
                 <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-rose-600 rounded" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Flagged Only</span>
                 </label>
                 <button className="bg-rose-600 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-600/20">Purge Selected</button>
              </div>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                       <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Comment</th>
                       <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">User Hash</th>
                       <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</th>
                       <th className="px-10 py-5"></th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {[
                      { text: 'This is a great policy, thank you!', user: 'hash_d21', time: '12:33', flagged: false },
                      { text: 'SPAM LINK: https://malicious.com', user: 'hash_x99', time: '12:35', flagged: true },
                    ].map((c, i) => (
                       <tr key={i} className={`hover:bg-slate-50/50 transition-colors ${c.flagged ? 'bg-rose-50/30' : ''}`}>
                          <td className="px-10 py-6 max-w-md">
                             <p className={`text-xs font-medium leading-relaxed ${c.flagged ? 'text-rose-600' : 'text-slate-700'}`}>{c.text}</p>
                          </td>
                          <td className="px-6 py-6">
                             <span className="text-[10px] font-mono text-slate-400">{c.user}</span>
                          </td>
                          <td className="px-6 py-6 text-[10px] font-bold text-slate-400">{c.time}</td>
                          <td className="px-10 py-6 text-right">
                             <div className="flex justify-end gap-2">
                                <button className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 size={16} /></button>
                                <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg"><Ban size={16} /></button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="bg-[#0F172A] rounded-[40px] shadow-2xl overflow-hidden text-white font-mono">
           <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <h4 className="text-xl font-bold flex items-center gap-2">
                 <Terminal size={18} className="text-emerald-500" /> System Audit Trail
              </h4>
              <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest">Clear Display</button>
           </div>
           <div className="p-8 overflow-x-auto">
              <table className="w-full text-left text-[11px]">
                 <thead>
                    <tr className="text-slate-500 border-b border-white/5">
                       <th className="pb-4">TIMESTAMP</th>
                       <th className="pb-4">ACTION</th>
                       <th className="pb-4">TARGET</th>
                       <th className="pb-4">IP_ADDRESS</th>
                    </tr>
                 </thead>
                 <tbody className="text-slate-300">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                       <tr key={i} className="hover:bg-white/5 border-b border-white/5">
                          <td className="py-4">2024-02-07 12:44:02</td>
                          <td className="py-4 text-emerald-400">POLICY_APPROVE</td>
                          <td className="py-4 text-indigo-400">Proposal_#551</td>
                          <td className="py-4">123.45.67.8</td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      )}

      {/* Detail Modal Overlay (Simulated) */}
      {showModal && (
        <div className="fixed inset-0 z-[300] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-6">
           <div className="bg-white w-full max-w-4xl rounded-[40px] soft-shadow overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                 <h5 className="text-xl font-black text-slate-900 uppercase">Proposal Intelligence</h5>
                 <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white rounded-full"><XCircle size={24} className="text-slate-400" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-10 space-y-8">
                 <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                    {['KO', 'EN', 'ZH', 'FR', 'ES', 'AR'].map(l => (
                      <button key={l} className={`px-4 py-1.5 rounded-lg text-[10px] font-black ${l === 'KO' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        {l}
                      </button>
                    ))}
                 </div>
                 <div>
                    <h6 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Content Header</h6>
                    <p className="text-2xl font-black text-slate-900">이민자 주거 지원 확대안</p>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                       <h6 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Original Text</h6>
                       <p className="text-sm font-medium text-slate-600 leading-relaxed bg-slate-50 p-6 rounded-[32px]">캐나다 신규 이민자를 위한 주거 지원 정책을 현재보다 2배 확대하는 것을 제안합니다. 특히 토론토와 밴쿠버의 높은 렌트비 해결을 위한 구체적인 지원금이 필요합니다.</p>
                    </div>
                    <div className="space-y-4">
                       <h6 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Translation Review (EN)</h6>
                       <p className="text-sm font-medium text-slate-600 leading-relaxed border-2 border-emerald-100 p-6 rounded-[32px]">We propose to double the current housing support policy for new immigrants to Canada. Specifically, concrete subsidies are needed to address the high rental costs in Toronto and Vancouver.</p>
                    </div>
                 </div>
              </div>
              <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                 <button className="px-8 py-3 bg-white border border-slate-200 text-slate-400 rounded-2xl text-[10px] font-black uppercase">Re-translate</button>
                 <button className="px-8 py-3 bg-rose-600 text-white rounded-2xl text-[10px] font-black uppercase shadow-lg shadow-rose-600/20">Reject</button>
                 <button className="px-8 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase shadow-lg shadow-indigo-600/20">Approve Proposal</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminView;

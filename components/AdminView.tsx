
import React, { useState } from 'react';
import { 
  ShieldCheck, AlertCircle, CheckCircle2, XCircle, 
  Search, Filter, Plus, Activity, Zap, Server, 
  Map as MapIcon, Calendar, Clock, ChevronRight, 
  MoreVertical, ArrowUpRight, ArrowDownRight, Trash2, 
  Eye, Globe, Terminal, Box, MessageSquare, List,
  BarChart3, Settings, Edit3, RotateCcw, Ban, UserCheck,
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
    { label: "D1 Cache Hit", value: '98.2%', change: '+5%', icon: Activity },
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
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 px-2">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Admin Kit <span className="text-indigo-600">PRO</span></h2>
          <p className="text-slate-500 font-medium mt-1">Status: Fully Compliant with D1 Operational Manual v1.0</p>
        </div>
        <div className="flex gap-3">
           <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 border border-emerald-100">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Secure Infrastructure
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
               <div className="flex justify-between items-center mb-8">
                  <h4 className="text-xl font-black uppercase tracking-tight">Query Auditor Logs</h4>
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase rounded-lg">Anti-Pattern Detection</span>
               </div>
               <div className="space-y-4">
                 {[
                   { time: '12:03', action: 'Loop Insert Blocked', target: 'Users_Batch_Job', status: 'Warning', color: 'text-amber-500' },
                   { time: '12:05', action: 'Full Scan Detected', target: 'SELECT * FROM logs', status: 'Optimized', color: 'text-indigo-500' },
                   { time: '12:07', action: 'Atomic Update Sync', target: 'Points_Update_#12', status: 'Safe', color: 'text-emerald-500' },
                   { time: '12:12', action: 'Batch Transaction', target: 'Order_Multi_Insert', status: 'Success', color: 'text-emerald-500' },
                 ].map((log, i) => (
                   <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-[24px] border border-slate-100">
                      <div className="flex items-center gap-4">
                        <Clock size={14} className="text-slate-400" />
                        <div>
                           <p className="text-xs font-black text-slate-900">{log.action}</p>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{log.target}</p>
                        </div>
                      </div>
                      <div className="text-right">
                         <span className={`text-[9px] font-black uppercase tracking-widest ${log.color}`}>{log.status}</span>
                         <p className="text-[8px] font-bold text-slate-300 mt-0.5">{log.time}</p>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
            
            <div className="bg-[#0F172A] p-10 rounded-[50px] text-white shadow-2xl flex flex-col justify-between relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Terminal size={120} />
               </div>
               <div className="relative z-10">
                 <h4 className="text-xl font-bold mb-8 flex items-center gap-2">
                    <Zap size={18} className="text-amber-400" /> Infrastructure Pulse
                 </h4>
                 <div className="space-y-6">
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-black uppercase text-slate-400">D1 Edge Sync</span>
                       <span className="text-sm font-black text-emerald-500">Passed</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-black uppercase text-slate-400">Query Plan Optim.</span>
                       <span className="text-sm font-black text-indigo-400">Active</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-black uppercase text-slate-400">R2 Replication</span>
                       <span className="text-sm font-black">99.9%</span>
                    </div>
                 </div>
               </div>
               <button className="relative z-10 mt-10 w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all active:scale-95 shadow-lg">
                  Run Optimizer
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Other tabs remain identical or can be expanded with similar "Operational" focus */}
      {activeTab === 'logs' && (
        <div className="bg-[#0F172A] rounded-[40px] shadow-2xl overflow-hidden text-white font-mono">
           <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <h4 className="text-xl font-bold flex items-center gap-2">
                 <Terminal size={18} className="text-emerald-500" /> Distributed Audit Trail
              </h4>
              <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest">Clear Display</button>
           </div>
           <div className="p-8 overflow-x-auto">
              <table className="w-full text-left text-[11px]">
                 <thead>
                    <tr className="text-slate-500 border-b border-white/5">
                       <th className="pb-4">TIMESTAMP</th>
                       <th className="pb-4">D1_BINDING</th>
                       <th className="pb-4">ACTION</th>
                       <th className="pb-4">EXEC_TIME</th>
                    </tr>
                 </thead>
                 <tbody className="text-slate-300">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                       <tr key={i} className="hover:bg-white/5 border-b border-white/5 transition-colors">
                          <td className="py-4">2024-02-07 12:44:02</td>
                          <td className="py-4 text-indigo-400">prod-db-main</td>
                          <td className="py-4 text-emerald-400">BATCH_EXECUTE_SUCCESS</td>
                          <td className="py-4">12ms</td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      )}

      {/* Policy and other views follow the same design language... */}
    </div>
  );
};

export default AdminView;

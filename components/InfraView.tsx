
import React from 'react';
import { MOCK_SERVERS } from '../constants';
import { 
  Activity, ShieldCheck, Database, Server, Cpu, 
  Globe, Terminal, ChevronRight, Zap, RefreshCcw, 
  Box, Settings, HardDrive, Share2, Layers,
  Cloud, CheckCircle2, AlertCircle, Info
} from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const InfraView: React.FC = () => {
  const securityMetrics = [
    { label: 'WAF Filtered', value: '1,420', trend: '+12%', color: 'text-amber-500' },
    { label: 'DDoS Protection', value: 'Active', trend: 'Global', color: 'text-emerald-500' },
    { label: 'KV Cache Hit', value: '98.4%', trend: 'Sub-ms', color: 'text-indigo-500' },
  ];

  const d1Checklist = [
    { item: 'Batch Transaction Logic', status: 'Passed', desc: 'Loop INSERT pattern replaced with .batch()' },
    { item: 'Query Indexing', status: 'Verified', desc: 'WHERE/ORDER BY columns indexed' },
    { item: 'Atomic Updates', status: 'Passed', desc: 'Single-query stock/count logic applied' },
    { item: 'Pagination Controls', status: 'Active', desc: 'Mandatory LIMIT 50 on all list fetches' },
    { item: 'Cache Layering', status: 'Enabled', desc: 'KV Cache matching enabled for read-heavy API' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-24">
      <div className="flex justify-between items-center px-2">
        <div>
           <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Infra Pulse <span className="text-indigo-600">PRO</span></h2>
           <p className="text-slate-500 font-medium text-sm">Deployment: Production-Ready Cloudflare D1 + Workers</p>
        </div>
        <div className="flex gap-3">
           <div className="bg-emerald-50 text-emerald-600 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase flex items-center gap-2 border border-emerald-100 shadow-sm">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              242 Edge Points Active
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {securityMetrics.map((m, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[40px] soft-shadow border border-white relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <ShieldCheck size={100} />
             </div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{m.label}</p>
             <h3 className={`text-4xl font-black ${m.color}`}>{m.value}</h3>
             <p className="text-xs font-bold text-slate-500 mt-2 uppercase tracking-tight">{m.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* D1 Operational Checklist (New Section) */}
          <div className="bg-white p-10 rounded-[50px] soft-shadow border border-white">
             <div className="flex justify-between items-center mb-10">
                <h4 className="font-black text-xl text-slate-900 uppercase flex items-center gap-2">
                   <CheckCircle2 size={24} className="text-emerald-500" /> D1 Operational Audit
                </h4>
                <span className="text-[10px] font-black text-slate-400 uppercase">Last Sync: Just Now</span>
             </div>
             <div className="space-y-4">
                {d1Checklist.map((check, i) => (
                  <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-indigo-200 transition-all">
                     <div className="flex items-center gap-5">
                        <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-50 group-hover:scale-110 transition-transform">
                           <ShieldCheck size={20} />
                        </div>
                        <div>
                           <p className="text-sm font-black text-slate-900">{check.item}</p>
                           <p className="text-[10px] font-bold text-slate-400 uppercase">{check.desc}</p>
                        </div>
                     </div>
                     <span className="px-3 py-1 bg-emerald-500 text-white rounded-lg text-[9px] font-black uppercase tracking-widest">{check.status}</span>
                  </div>
                ))}
             </div>
          </div>

          <div className="bg-[#0F172A] p-10 rounded-[50px] shadow-2xl overflow-hidden relative text-white">
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <RefreshCcw size={200} />
             </div>
             <h4 className="font-bold text-lg mb-12 flex items-center gap-2">
                <Terminal size={20} className="text-emerald-500" /> Distributed Architecture
             </h4>

             <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="border border-slate-800 rounded-[32px] p-8 bg-slate-900/50 w-full lg:w-1/3 text-center">
                   <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-6">Traffic Ingress</p>
                   <div className="bg-slate-800 p-6 rounded-2xl flex flex-col items-center gap-4">
                      <Activity size={32} className="text-slate-500" />
                      <span className="text-[10px] font-bold">WAF Enabled</span>
                   </div>
                </div>

                <div className="flex-1 flex flex-col items-center gap-6">
                   <div className="bg-indigo-600 p-6 rounded-[32px] shadow-xl text-center w-full max-w-[200px]">
                      <Share2 size={32} className="mx-auto mb-2" />
                      <p className="text-[10px] font-black uppercase">Worker Controller</p>
                   </div>
                   <div className="h-10 w-px bg-slate-700"></div>
                   <div className="bg-slate-800 p-6 rounded-2xl w-full border border-slate-700 flex justify-around">
                      <div className="flex flex-col items-center gap-1">
                         <Box size={16} className="text-indigo-400" />
                         <span className="text-[8px] font-black uppercase">KV (Cache)</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                         <Database size={16} className="text-emerald-400" />
                         <span className="text-[8px] font-black uppercase">D1 (Relational)</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                         <HardDrive size={16} className="text-rose-400" />
                         <span className="text-[8px] font-black uppercase">R2 (Storage)</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white p-10 rounded-[50px] soft-shadow border border-white">
              <h4 className="font-extrabold text-slate-900 mb-8 flex items-center gap-2 uppercase tracking-tighter">
                 <Activity size={20} className="text-indigo-600" /> Load Distribution
              </h4>
              <div className="h-[200px] mb-8">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={MOCK_SERVERS}>
                       <Bar dataKey="load" fill="#4F46E5" radius={[10, 10, 10, 10]} barSize={24} />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                 <div className="flex justify-between p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <span className="text-[10px] font-black text-indigo-600 uppercase">Edge Response</span>
                    <span className="text-[11px] font-black text-slate-900">0.8 ms</span>
                 </div>
                 <div className="flex justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <span className="text-[10px] font-black text-emerald-600 uppercase">D1 Query Latency</span>
                    <span className="text-[11px] font-black text-slate-900">18.2 ms</span>
                 </div>
              </div>
           </div>

           <div className="bg-slate-900 p-10 rounded-[50px] text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-20">
                 <ShieldCheck size={120} />
              </div>
              <h4 className="font-black text-lg mb-2 uppercase tracking-tight">Security Boundary</h4>
              <p className="text-slate-400 text-xs leading-relaxed mb-10 font-medium">
                 All requests are verified at the Edge via JWT and Cloudflare Access. D1 access is strictly limited to Worker bindings.
              </p>
              <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20 active:scale-95 transition-all">
                 Rotate Secrets
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default InfraView;

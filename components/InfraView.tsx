
import React from 'react';
import { MOCK_SERVERS } from '../constants';
import { 
  Activity, ShieldCheck, Database, Server, Cpu, 
  Globe, Terminal, ChevronRight, Zap, RefreshCcw, 
  Box, Settings, HardDrive, Share2, Layers,
  Cloud, MessageSquare, List, HardDriveDownload
} from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const InfraView: React.FC = () => {
  const securityMetrics = [
    { label: 'WAF Filtered', value: '1,420', trend: '+12%', color: 'text-amber-500' },
    { label: 'DDoS Active', value: 'Healthy', trend: 'Global', color: 'text-emerald-500' },
    { label: 'KV Cache Hit', value: '98.4%', trend: 'Sub-ms', color: 'text-indigo-500' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-24">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Infra Pulse <span className="text-indigo-600">PRO</span></h2>
           <p className="text-slate-500 font-medium">Serverless Architecture: Cloudflare Pages + Workers + D1</p>
        </div>
        <div className="flex gap-3">
           <div className="bg-emerald-500/10 text-emerald-600 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase flex items-center gap-2 border border-emerald-500/20 shadow-sm">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              242 Global Edge Points
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
          
          <div className="bg-white p-10 rounded-[50px] soft-shadow border border-white relative overflow-hidden">
             <h4 className="font-black text-xl text-slate-900 uppercase mb-12 flex items-center gap-2">
                <Globe size={24} className="text-indigo-600" /> Serverless Edge Network
             </h4>
             
             <div className="relative flex flex-col md:flex-row items-center justify-between gap-12 py-10">
                <div className="flex flex-col gap-6">
                   <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col gap-2">
                      <p className="text-[9px] font-black text-slate-400 uppercase">Frontend</p>
                      <div className="flex items-center gap-3">
                         <Cloud size={20} className="text-indigo-600" />
                         <span className="text-[11px] font-black uppercase text-slate-700 tracking-tighter">CF Pages</span>
                      </div>
                   </div>
                   <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col gap-2">
                      <p className="text-[9px] font-black text-slate-400 uppercase">Logic Tier</p>
                      <div className="flex items-center gap-3">
                         <Zap size={20} className="text-amber-500" />
                         <span className="text-[11px] font-black uppercase text-slate-700 tracking-tighter">CF Workers</span>
                      </div>
                   </div>
                </div>

                <div className="flex flex-col items-center">
                   <ChevronRight className="rotate-90 md:rotate-0 text-slate-300" size={32} />
                </div>

                <div className="flex-1 bg-slate-900 rounded-[40px] p-10 relative text-white border-2 border-slate-800">
                   <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 px-4 rounded-full text-[9px] font-black text-white uppercase tracking-widest">
                      Persistent Data Tier
                   </div>
                   <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
                      <div className="bg-slate-800 p-6 rounded-[32px] border border-slate-700 text-center w-full">
                         <Database size={24} className="mx-auto mb-2 text-indigo-400" />
                         <p className="text-[10px] font-black uppercase tracking-widest">D1 DB</p>
                         <p className="text-[8px] text-slate-500 font-bold mt-1">SQLITE EDGE</p>
                      </div>
                      <div className="bg-slate-800 p-6 rounded-[32px] border border-slate-700 text-center w-full">
                         <Box size={24} className="mx-auto mb-2 text-emerald-400" />
                         <p className="text-[10px] font-black uppercase tracking-widest">KV STORE</p>
                         <p className="text-[8px] text-slate-500 font-bold mt-1">KV CACHE</p>
                      </div>
                      <div className="bg-slate-800 p-6 rounded-[32px] border border-slate-700 text-center w-full">
                         <HardDrive size={24} className="mx-auto mb-2 text-rose-400" />
                         <p className="text-[10px] font-black uppercase tracking-widest">R2 BUCKET</p>
                         <p className="text-[8px] text-slate-500 font-bold mt-1">OBJECTS</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-[#0F172A] p-10 rounded-[50px] shadow-2xl overflow-hidden relative text-white">
             <div className="absolute top-0 right-0 p-8 opacity-5">
                <RefreshCcw size={200} />
             </div>
             <h4 className="font-bold text-lg mb-12 flex items-center gap-2">
                <Terminal size={20} className="text-emerald-500" /> Global Log Collector Pipeline
             </h4>

             <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="border border-slate-800 rounded-[32px] p-8 bg-slate-900/50 w-full lg:w-1/3 text-center">
                   <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-6">Regional Ingress</p>
                   <div className="bg-slate-800 p-6 rounded-2xl flex flex-col items-center gap-4">
                      <Activity size={32} className="text-slate-500" />
                      <span className="text-[10px] font-bold">Edge Build_882</span>
                   </div>
                </div>

                <div className="flex-1 flex flex-col items-center gap-6">
                   <div className="bg-indigo-600 p-6 rounded-[32px] shadow-xl text-center w-full max-w-[200px]">
                      <Share2 size={32} className="mx-auto mb-2" />
                      <p className="text-[10px] font-black uppercase">Tail Log Aggregator</p>
                   </div>
                   <div className="h-10 w-px bg-slate-700"></div>
                   <div className="bg-slate-800 p-6 rounded-2xl w-full border border-slate-700 flex justify-around">
                      <div className="flex flex-col items-center gap-1">
                         <Box size={16} className="text-indigo-400" />
                         <span className="text-[8px] font-black uppercase">Durable Object</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                         <HardDriveDownload size={16} className="text-emerald-400" />
                         <span className="text-[8px] font-black uppercase">Clickhouse</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white p-10 rounded-[50px] soft-shadow border border-white">
              <h4 className="font-extrabold text-slate-900 mb-8 flex items-center gap-2 uppercase tracking-tighter">
                 <Activity size={20} className="text-indigo-600" /> Health Metrics
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
                    <span className="text-[10px] font-black text-indigo-600 uppercase">KV Read Latency</span>
                    <span className="text-[11px] font-black text-slate-900">0.8 ms</span>
                 </div>
                 <div className="flex justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <span className="text-[10px] font-black text-emerald-600 uppercase">D1 Query Time</span>
                    <span className="text-[11px] font-black text-slate-900">18.2 ms</span>
                 </div>
              </div>
           </div>

           <div className="bg-slate-900 p-10 rounded-[50px] text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-20">
                 <ShieldCheck size={120} />
              </div>
              <h4 className="font-black text-lg mb-2 uppercase tracking-tight">Access Boundary</h4>
              <p className="text-slate-400 text-xs leading-relaxed mb-10 font-medium">
                 Admin requests are authenticated via CF Access and JWT verification. Unauthorized entry results in immediate 403 at the edge.
              </p>
              <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20">
                 Rotate Secrets
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default InfraView;

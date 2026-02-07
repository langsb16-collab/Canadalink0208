
import React, { useState } from 'react';
import { CommunityPost, ParticipationStatus, Language } from '../types';
import { Search, Map as MapIcon, Filter, Plus, Navigation, Star, Phone, Globe, Tag, Clock, Circle, List, X, ChevronRight, Layers } from 'lucide-react';

interface LifestyleHubViewProps {
  title: string;
  description: string;
  posts: CommunityPost[];
  lang: Language;
  onRequireVerification: () => void;
  participation: ParticipationStatus;
  isMobile: boolean;
}

const LifestyleHubView: React.FC<LifestyleHubViewProps> = ({ 
  title, description, posts, lang, onRequireVerification, participation, isMobile
}) => {
  const [showMapOverlay, setShowMapOverlay] = useState(false);
  const [radius, setRadius] = useState(5);
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);

  // Desktop View
  if (!isMobile) {
    return (
      <div className="flex flex-col h-[calc(100vh-160px)] animate-fadeIn">
        {/* Sub Header */}
        <div className="flex justify-between items-end mb-8 px-2">
           <div>
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">{title}</h2>
              <p className="text-slate-500 font-medium">{description}</p>
           </div>
           <div className="flex gap-4">
              <button className="btn-secondary flex items-center gap-2"><Filter size={18} /> Filters</button>
              <button onClick={() => !participation.isVerified && onRequireVerification()} className="btn-primary flex items-center gap-2">
                 <Plus size={18} /> Post Listing
              </button>
           </div>
        </div>

        <div className="flex-1 flex gap-8 overflow-hidden">
           {/* Left: List Pane */}
           <div className="w-[450px] flex flex-col gap-6 overflow-y-auto pr-4 scrollbar-hide pb-10">
              <div className="relative sticky top-0 z-10 bg-brand-bg pt-1 pb-4">
                 <input 
                   type="text" 
                   placeholder="Search listings near you..." 
                   className="w-full h-14 bg-white rounded-[20px] pl-14 pr-6 soft-shadow border border-slate-100 outline-none font-bold"
                 />
                 <Search className="absolute left-5 top-1/2 -translate-y-1/2 -mt-2 text-slate-400" size={20} />
              </div>

              {posts.map(post => (
                <div key={post.id} className="bg-white p-6 rounded-[32px] soft-shadow border border-white hover:ring-2 hover:ring-indigo-600/20 transition-all group cursor-pointer" onClick={() => setSelectedPost(post)}>
                   {post.image && (
                     <div className="h-40 w-full rounded-2xl overflow-hidden mb-4">
                        <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                     </div>
                   )}
                   <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{post.title}</h4>
                      {post.price && <span className="text-sm font-black text-emerald-600">{post.price}</span>}
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                      <Navigation size={10} /> {post.city} • <Clock size={10} /> {post.createdAt}
                   </div>
                   <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">{post.description}</p>
                </div>
              ))}
           </div>

           {/* Right: Map Pane */}
           <div className="flex-1 bg-white rounded-[50px] soft-shadow border border-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-79.3832,43.6532,11/1000x1000?access_token=pk.dummy')] bg-cover bg-center"></div>
              
              {/* Radius Visualizer (SVG Simulation) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="w-[300px] h-[300px] rounded-full border-2 border-indigo-600/30 bg-indigo-600/5 animate-pulse"></div>
              </div>

              {/* HUD Controls */}
              <div className="absolute top-8 right-8 flex flex-col gap-3">
                 <div className="bg-white p-4 rounded-3xl shadow-xl border border-slate-100 flex flex-col gap-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Radius</p>
                    <div className="flex flex-col gap-2">
                       {[3, 5, 10].map(r => (
                          <button key={r} onClick={() => setRadius(r)} className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${radius === r ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400'}`}>
                             {r}km
                          </button>
                       ))}
                    </div>
                 </div>
                 <button className="bg-white p-4 rounded-3xl shadow-xl text-slate-600 hover:text-indigo-600 transition-all"><Layers size={20} /></button>
                 <button className="bg-white p-4 rounded-3xl shadow-xl text-slate-600 hover:text-indigo-600 transition-all"><Navigation size={20} /></button>
              </div>

              {/* Selected Post Popover */}
              {selectedPost && (
                <div className="absolute bottom-10 left-10 right-10 flex items-center gap-6 bg-white p-8 rounded-[40px] shadow-2xl animate-fadeIn">
                   <img src={selectedPost.image || 'https://via.placeholder.com/100'} className="w-24 h-24 rounded-3xl object-cover" />
                   <div className="flex-1">
                      <h5 className="text-xl font-black text-slate-900">{selectedPost.title}</h5>
                      <p className="text-sm font-bold text-emerald-600 mt-1">{selectedPost.price}</p>
                   </div>
                   <div className="flex gap-2">
                      <button onClick={() => setSelectedPost(null)} className="p-4 bg-slate-50 rounded-2xl text-slate-400"><X size={20} /></button>
                      <button className="px-8 py-4 bg-indigo-600 text-white rounded-3xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20">View Details</button>
                   </div>
                </div>
              )}
           </div>
        </div>
      </div>
    );
  }

  // Mobile View
  return (
    <div className="space-y-6 pb-20 animate-fadeIn">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">{title}</h2>
            <p className="text-xs font-bold text-slate-400 mt-0.5">Community Network</p>
         </div>
         <button onClick={() => !participation.isVerified && onRequireVerification()} className="w-12 h-12 bg-indigo-600 text-white rounded-2xl shadow-lg flex items-center justify-center">
            <Plus size={24} />
         </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
         {['All', 'Nearby', 'Recent', 'Popular'].map(cat => (
           <button key={cat} className="px-5 py-2.5 bg-white rounded-full text-[11px] font-black uppercase tracking-widest border border-slate-100 soft-shadow whitespace-nowrap">
              {cat}
           </button>
         ))}
      </div>

      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white p-5 rounded-[32px] soft-shadow border border-white flex gap-5 active:scale-95 transition-transform" onClick={() => setSelectedPost(post)}>
             {post.image ? (
               <img src={post.image} className="w-24 h-24 rounded-2xl object-cover" />
             ) : (
               <div className="w-24 h-24 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
                  <Tag size={24} />
               </div>
             )}
             <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-start">
                   <h4 className="text-sm font-black text-slate-900 leading-tight line-clamp-1">{post.title}</h4>
                   {post.price && <span className="text-xs font-black text-emerald-600 ml-2">{post.price}</span>}
                </div>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tight">{post.city} • {post.createdAt}</p>
                <div className="mt-3 flex items-center text-[10px] font-black text-indigo-600 uppercase gap-1">
                   Details <ChevronRight size={12} />
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Mobile Floating Action Button */}
      <button 
        onClick={() => setShowMapOverlay(true)}
        className="fixed bottom-28 right-8 w-16 h-16 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center z-[110] animate-bounce"
      >
        <MapIcon size={24} />
      </button>

      {/* Mobile Map Overlay */}
      {showMapOverlay && (
        <div className="fixed inset-0 z-[150] bg-white animate-fadeIn flex flex-col">
           <div className="h-full relative">
              <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-79.3832,43.6532,11/1000x1000?access_token=pk.dummy')] bg-cover bg-center"></div>
              
              <div className="absolute top-12 left-6 right-6 flex items-center gap-3">
                 <button onClick={() => setShowMapOverlay(false)} className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-slate-900">
                    <X size={20} />
                 </button>
                 <div className="flex-1 bg-white h-12 rounded-2xl shadow-xl px-4 flex items-center gap-3 border border-white">
                    <Search size={16} className="text-slate-400" />
                    <input type="text" placeholder="Search area..." className="flex-1 bg-transparent text-xs font-bold outline-none" />
                 </div>
              </div>

              <div className="absolute bottom-10 left-6 right-6 bg-white p-6 rounded-[40px] shadow-2xl">
                 <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nearby: {radius}km</span>
                    <div className="flex gap-2">
                       {[3, 5, 10].map(r => (
                          <button key={r} onClick={() => setRadius(r)} className={`w-10 h-10 rounded-xl text-[10px] font-black ${radius === r ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400'}`}>
                             {r}
                          </button>
                       ))}
                    </div>
                 </div>
                 <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest">Update Results</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default LifestyleHubView;


import React, { useState } from 'react';
import { CommunityPost, Language, ParticipationStatus } from '../types';
import { ChevronLeft, MapPin, Clock, Phone, Share2, ShieldCheck, User, MessageCircle, Edit3, Trash2, AlertTriangle, ShieldAlert, X } from 'lucide-react';

interface PostDetailViewProps {
  post: CommunityPost;
  lang: Language;
  onBack: () => void;
  participation: ParticipationStatus;
  onEdit: (post: CommunityPost) => void;
  onDelete: (id: string) => void;
  onReport: (id: string, reason: string) => void;
}

const PostDetailView: React.FC<PostDetailViewProps> = ({ post, lang, onBack, participation, onEdit, onDelete, onReport }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [showReportModal, setShowReportModal] = useState(false);
  const isOwner = participation.isVerified && (post.phone_hash === participation.phoneHash || !post.phone_hash);

  const reportReasons = [
    { id: 'spam', label: lang === 'ko' ? '스팸 / 광고' : 'Spam / Advertisement' },
    { id: 'scam', label: lang === 'ko' ? '사기 의심' : 'Suspected Scam' },
    { id: 'abusive', label: lang === 'ko' ? '부적절한 내용' : 'Inappropriate Content' },
    { id: 'wrong_category', label: lang === 'ko' ? '잘못된 카테고리' : 'Wrong Category' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn pb-24 relative">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="w-12 h-12 bg-white rounded-2xl shadow-soft flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div className="flex gap-2">
           {!isOwner && (
             <button 
               onClick={() => setShowReportModal(true)}
               className="w-12 h-12 bg-white rounded-2xl shadow-soft flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors"
             >
                <AlertTriangle size={20} />
             </button>
           )}
           {isOwner && (
             <>
               <button onClick={() => onEdit(post)} className="w-12 h-12 bg-white rounded-2xl shadow-soft flex items-center justify-center text-indigo-600 hover:bg-indigo-50 transition-colors">
                  <Edit3 size={20} />
               </button>
               <button onClick={() => window.confirm('Delete this listing?') && onDelete(post.id)} className="w-12 h-12 bg-white rounded-2xl shadow-soft flex items-center justify-center text-rose-600 hover:bg-rose-50 transition-colors">
                  <Trash2 size={20} />
               </button>
             </>
           )}
           <button className="w-12 h-12 bg-white rounded-2xl shadow-soft flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors">
              <Share2 size={20} />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Gallery Content */}
        <div className="space-y-6">
           <div className="aspect-square rounded-[50px] overflow-hidden soft-shadow border-4 border-white bg-slate-100">
              {post.image_urls && post.image_urls.length > 0 ? (
                <img src={post.image_urls[activeImage]} className="w-full h-full object-cover transition-opacity duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                   <User size={100} strokeWidth={1} />
                </div>
              )}
           </div>
           
           {/* Thumbnails */}
           {post.image_urls && post.image_urls.length > 1 && (
             <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {post.image_urls.map((url, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${activeImage === i ? 'border-indigo-600 scale-105' : 'border-white opacity-60'}`}
                  >
                    <img src={url} className="w-full h-full object-cover" />
                  </button>
                ))}
             </div>
           )}
           
           <div className="bg-white p-8 rounded-[40px] soft-shadow border border-white space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location Accuracy</h4>
              <div className="h-48 rounded-3xl overflow-hidden relative">
                 <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-79.3832,43.6532,13/800x400?access_token=pk.dummy')] bg-cover bg-center"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white ring-8 ring-indigo-100 animate-pulse">
                       <MapPin size={20} />
                    </div>
                 </div>
              </div>
              <p className="text-[11px] font-bold text-slate-500 text-center uppercase tracking-tight">Approximate location near {post.city}</p>
           </div>
        </div>

        {/* Right: Content Details */}
        <div className="flex flex-col gap-8">
           <div className="space-y-4">
              <div className="flex gap-2">
                 <span className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                   {post.category || 'General'}
                 </span>
                 <span className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
                    <ShieldCheck size={12} /> Verified Seller
                 </span>
              </div>
              <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight">{post.title}</h1>
              <div className="flex items-center gap-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                 <span className="flex items-center gap-2"><MapPin size={14} className="text-indigo-400" /> {post.city}</span>
                 <span className="flex items-center gap-2"><Clock size={14} className="text-indigo-400" /> {post.createdAt}</span>
              </div>
              {post.price && (
                <div className="text-3xl font-black text-emerald-600 mt-4">{post.price}</div>
              )}
           </div>

           <div className="bg-white p-10 rounded-[50px] soft-shadow border border-white">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Description</h4>
              <p className="text-slate-600 font-medium leading-relaxed whitespace-pre-line">
                 {post.description}
              </p>
           </div>

           <div className="mt-auto pt-6 flex flex-col sm:flex-row gap-4">
              <button className="flex-1 h-16 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all">
                 <MessageCircle size={22} /> Send Message
              </button>
              <button className="flex-1 h-16 bg-indigo-600 text-white rounded-[24px] font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3 active:scale-95 transition-all">
                 <Phone size={22} /> View Phone
              </button>
           </div>

           <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-[32px] border border-slate-100">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-300 shadow-sm">
                 <User size={24} />
              </div>
              <div>
                 <p className="text-xs font-black text-slate-900">{post.author || 'Anonymous User'}</p>
                 <p className="text-[10px] font-bold text-slate-400 uppercase">Joined Oct 2023 • 12 Active Ads</p>
              </div>
           </div>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-[500] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-6">
           <div className="bg-white w-full max-w-md rounded-[40px] soft-shadow overflow-hidden animate-fadeIn">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                 <h5 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                    <ShieldAlert size={20} className="text-rose-500" /> Report Content
                 </h5>
                 <button onClick={() => setShowReportModal(false)} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                    <X size={24} />
                 </button>
              </div>
              <div className="p-8 space-y-4">
                 <p className="text-sm font-medium text-slate-500 leading-relaxed">
                    {lang === 'ko' ? '이 게시글을 신고하시겠습니까? 신고된 내용은 즉시 검토되며 부적절한 경우 삭제 처리됩니다.' : 'Would you like to report this post? Your report will be reviewed immediately.'}
                 </p>
                 <div className="space-y-2">
                    {reportReasons.map(reason => (
                       <button 
                         key={reason.id}
                         onClick={() => {
                            onReport(post.id, reason.id);
                            setShowReportModal(false);
                            alert(lang === 'ko' ? '신고가 접수되었습니다. 해당 게시글은 사용자에게 더 이상 표시되지 않습니다.' : 'Report submitted. The post will no longer be visible to you.');
                         }}
                         className="w-full text-left p-4 bg-slate-50 rounded-2xl text-sm font-bold text-slate-700 hover:bg-rose-50 hover:text-rose-600 transition-all active:scale-95"
                       >
                          {reason.label}
                       </button>
                    ))}
                 </div>
              </div>
              <div className="p-8 bg-slate-50 flex justify-center">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital Safety Protocol v2.4</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default PostDetailView;

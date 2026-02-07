
import React from 'react';
import { MOCK_VOTES } from '../constants';
import { Lock, ShieldCheck, MessageSquarePlus, PenTool, TrendingUp, CheckCircle2, Info, Users, BarChart3 } from 'lucide-react';
import { ParticipationStatus, Language } from '../types';

interface PolicyViewProps {
  participation: ParticipationStatus;
  onRequireVerification: () => void;
  lang: Language;
}

const PolicyView: React.FC<PolicyViewProps> = ({ participation, onRequireVerification, lang }) => {
  const getLocalizedText = (i18nObj: any) => i18nObj[lang] || i18nObj['en'] || Object.values(i18nObj)[0];

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-brand-blue text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">Public Utility</span>
            <span className="text-brand-gray text-[10px] font-bold uppercase tracking-widest">Digital Infrastructure</span>
          </div>
          <h2 className="text-3xl font-bold text-brand-blue uppercase">Policy Infrastructure</h2>
          <p className="text-brand-gray text-sm font-medium max-w-2xl mt-1">
            캐나다 한인 사회의 목소리를 모으는 공식 플랫폼입니다. 
            모든 참여는 회원가입 없이 **휴대폰 1회 인증**으로 투명하게 운영됩니다.
          </p>
        </div>
        <div className="flex gap-3">
           <button 
             onClick={() => !participation.isVerified && onRequireVerification()}
             className={participation.isVerified ? 'btn-secondary' : 'btn-primary'}
           >
             {participation.isVerified ? <MessageSquarePlus size={16} className="mr-2" /> : <Lock size={16} className="mr-2" />} 
             신규 정책 제안하기
           </button>
        </div>
      </div>

      {/* Trust & Reliability Information Box */}
      <div className="bg-white rounded-card shadow-soft border border-brand-border/50 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-blue/5 rounded-xl flex items-center justify-center text-brand-blue">
               <ShieldCheck size={24} />
            </div>
            <div>
               <h4 className="font-bold text-brand-blue text-sm">Verified Participation Only</h4>
               <p className="text-[11px] text-brand-gray font-medium">여론 조작 방지를 위해 인증된 익명 해시 기반으로 운영됩니다.</p>
            </div>
         </div>
         <div className="flex items-center gap-10">
            <div className="text-center">
               <div className="flex items-center gap-1.5 justify-center mb-0.5">
                  <Users size={12} className="text-brand-gray" />
                  <p className="text-[10px] font-bold text-brand-gray uppercase">Participated</p>
               </div>
               <p className="text-lg font-bold text-brand-blue">100% <span className="text-[10px] text-brand-gray">Anonymous</span></p>
            </div>
            <div className="text-center">
               <div className="flex items-center gap-1.5 justify-center mb-0.5">
                  <BarChart3 size={12} className="text-brand-gray" />
                  <p className="text-[10px] font-bold text-brand-gray uppercase">Integrity</p>
               </div>
               <p className="text-lg font-bold text-status-success">Secure</p>
            </div>
         </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-card border border-brand-border/50 shadow-soft relative overflow-hidden">
         {!participation.isVerified && (
           <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center p-6 text-center">
              <div className="bg-white p-10 rounded-[20px] shadow-brand border border-brand-border/30 max-w-sm">
                 <div className="w-14 h-14 bg-brand-bg rounded-2xl flex items-center justify-center mx-auto mb-4 text-brand-gray">
                    <Lock size={28} />
                 </div>
                 <h4 className="text-lg font-bold text-brand-blue mb-2">참여 인증이 필요합니다</h4>
                 <p className="text-xs text-brand-gray font-medium mb-8 leading-relaxed">
                   회원가입은 필요하지 않습니다.<br/>
                   공정한 커뮤니티 의견 수렴을 위해 1회 휴대폰 인증 후<br/>투표와 제안에 참여할 수 있습니다.
                 </p>
                 <button 
                   onClick={onRequireVerification}
                   className="btn-primary w-full shadow-brand"
                 >
                   휴대폰 인증 시작하기
                 </button>
              </div>
           </div>
         )}
         
         <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-red/5 rounded-xl flex items-center justify-center text-brand-red">
                 <TrendingUp size={20} />
              </div>
              <h4 className="text-xl font-bold text-brand-blue uppercase">Active Proposals</h4>
            </div>
         </div>

         <div className="space-y-4">
          {MOCK_VOTES.map(vote => (
            <div key={vote.id} className="p-6 rounded-[12px] border border-brand-border/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:bg-brand-bg/30 transition-all group">
              <div className="flex-1 w-full">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    vote.status === 'active' ? 'bg-status-success/10 text-status-success border border-status-success/20' : 'bg-brand-bg text-brand-gray'
                  }`}>
                    {vote.status === 'active' ? 'Live' : 'Closed'}
                  </span>
                  <div className="flex items-center gap-1 bg-brand-blue/5 text-brand-blue px-1.5 py-0.5 rounded">
                     <CheckCircle2 size={10} fill="#1F3C88" stroke="#FFFFFF" />
                     <span className="text-[9px] font-black uppercase">Verified Voting</span>
                  </div>
                </div>
                <h5 className="font-bold text-brand-blue text-lg mb-4 leading-tight">{getLocalizedText(vote.title_i18n)}</h5>
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-bold text-brand-gray uppercase">Current Support</span>
                    <span className="text-xs font-bold text-brand-blue">{((vote.votes / 5000) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-2 bg-brand-bg rounded-full overflow-hidden">
                    <div className="h-full bg-brand-red rounded-full transition-all duration-1000" style={{ width: `${(vote.votes / 5000) * 100}%` }}></div>
                  </div>
                </div>
              </div>
              <button 
                className="btn-primary w-full md:w-auto px-10 shadow-soft disabled:opacity-20" 
                disabled={vote.status !== 'active' || !participation.isVerified}
              >
                Sign Petition
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PolicyView;

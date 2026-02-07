
import React from 'react';

const SupportView: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Warm Community Support</h2>
        <p className="text-slate-500 font-medium">이민 생활의 고단함, 혼자 고민하지 마세요. 전문 상담가와 인증된 따뜻한 커뮤니티가 함께합니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-10 rounded-[40px] border border-white soft-shadow text-center space-y-6 hover:translate-y-[-8px] transition-all group">
          <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-[32px] flex items-center justify-center mx-auto mb-2 transition-transform group-hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
          </div>
          <h4 className="text-2xl font-black text-slate-900 uppercase">Emergency Hotline</h4>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">24시간 한국어 상담이 가능한 핫라인 번호를 연결해 드립니다.</p>
          <button className="bg-rose-600 text-white w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-700 transition-colors shadow-lg shadow-rose-600/20">Call Now</button>
        </div>

        <div className="bg-white p-10 rounded-[40px] border border-white soft-shadow text-center space-y-6 hover:translate-y-[-8px] transition-all group">
          <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-[32px] flex items-center justify-center mx-auto mb-2 transition-transform group-hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <h4 className="text-2xl font-black text-slate-900 uppercase">Verified Chat</h4>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">누구에게도 말하지 못했던 고민을 안전하게 털어놓으세요.</p>
          <button className="bg-indigo-600 text-white w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20">Go to Board</button>
        </div>

        <div className="bg-white p-10 rounded-[40px] border border-white soft-shadow text-center space-y-6 hover:translate-y-[-8px] transition-all group">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-[32px] flex items-center justify-center mx-auto mb-2 transition-transform group-hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <h4 className="text-2xl font-black text-slate-900 uppercase">Support Groups</h4>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">비슷한 환경의 사람들과 모여 서로를 응원합니다.</p>
          <button className="bg-emerald-600 text-white w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20">Find Groups</button>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[40px] border border-white soft-shadow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
           <div>
              <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Welfare Checklists</h4>
              <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">Global Standard Support Items</p>
           </div>
           <div className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-indigo-100 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              Identity Verification Recommended
           </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
             { title: 'Canada Child Benefit (CCB)', desc: '자녀가 있는 가정을 위한 월별 보조금' },
             { title: 'GST/HST Credit', desc: '저소득층을 위한 세금 환급 제도' },
             { title: 'Canada Workers Benefit', desc: '근로 소득이 있는 저소득층 대상 지원' },
             { title: 'Senior Dental Care', desc: '저소득층 시니어를 위한 치과 지원' }
          ].map((item, idx) => (
            <div key={idx} className="flex gap-6 items-start bg-slate-50 p-8 rounded-3xl border border-slate-100 group hover:border-indigo-200 transition-all">
               <input type="checkbox" className="mt-1 w-6 h-6 accent-indigo-600 rounded-lg cursor-pointer shrink-0" />
               <div>
                  <h5 className="font-black text-slate-900 text-lg mb-1 leading-tight">{item.title}</h5>
                  <p className="text-sm text-slate-400 font-bold">{item.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportView;

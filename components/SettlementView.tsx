
import React, { useState } from 'react';
import { MOCK_GUIDES } from '../constants';
import { Search, Tag, Info, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface SettlementViewProps {
  lang: Language;
}

const SettlementView: React.FC<SettlementViewProps> = ({ lang }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Helper to get localized text with fallback to English
  const getLocalizedText = (i18nObj: any) => {
    return i18nObj[lang] || i18nObj['en'] || Object.values(i18nObj)[0] || 'N/A';
  };

  return (
    <div className="space-y-10 animate-fadeIn pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold text-brand-blue uppercase tracking-tight">
            {lang === 'ko' ? '정착 지원 센터' : 'Settlement Center'}
          </h2>
          <p className="text-brand-gray text-sm font-medium mt-1">
            {lang === 'ko' ? '캐나다 성공 정착을 위한 마스터 가이드' : 'Your master guide to successful settlement in Canada'}
          </p>
        </div>
        <div className="relative w-full md:w-[400px]">
           <input 
              type="text" 
              placeholder={lang === 'ko' ? "검색어를 입력하세요..." : "Search guides..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 h-12 bg-white rounded-[12px] border border-brand-border/50 soft-shadow focus:ring-2 focus:ring-brand-blue/10 outline-none font-bold text-sm"
           />
           <Search className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-400`} size={18} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_GUIDES.map(guide => (
          <div key={guide.id} className="card-ui hover:ring-2 hover:ring-brand-blue/10 transition-all group flex flex-col">
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-2">
                 <div className="p-1.5 bg-brand-blue/5 text-brand-blue rounded-lg">
                    <Tag size={14} />
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-wider">{guide.category}</span>
               </div>
            </div>
            
            <h4 className="text-lg font-bold text-brand-blue mb-3 leading-tight min-h-[56px] line-clamp-2">
              {getLocalizedText(guide.title_i18n)}
            </h4>
            
            <p className="text-[12px] text-brand-gray leading-relaxed mb-6 flex-1 line-clamp-3">
              {getLocalizedText(guide.summary_i18n)}
            </p>

            <div className="pt-4 border-t border-brand-bg flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-bg flex items-center justify-center text-[10px] font-bold text-brand-gray">
                    {getLocalizedText(guide.author_i18n)[0]}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-brand-blue uppercase">{getLocalizedText(guide.author_i18n)}</p>
                    <p className="text-[9px] text-brand-gray font-bold">{guide.updatedAt}</p>
                  </div>
               </div>
               <button className="w-8 h-8 bg-brand-blue text-white rounded-lg flex items-center justify-center group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1">
                  <ArrowRight size={14} />
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettlementView;


import React, { useState } from 'react';
import { MOCK_BUSINESSES } from '../constants';
import { Search, Map as MapIcon, Star, Phone, Globe, Filter, Navigation } from 'lucide-react';
import { Language } from '../types';

// Define props to include the current language for content localization
interface BusinessViewProps {
  lang: Language;
}

const BusinessView: React.FC<BusinessViewProps> = ({ lang }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('전체');
  
  const categories = ['전체', '회계/세무', '이민/법률', '부동산', '의료', '정비/수리', '기타'];

  // Helper function to extract the correct localized string from an i18n object
  const getLocalizedText = (i18nObj: any) => {
    return i18nObj[lang] || i18nObj['en'] || Object.values(i18nObj)[0] || 'N/A';
  };

  return (
    <div className="space-y-6 animate-fadeIn h-[calc(100vh-140px)] flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
           <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">비즈니스 네트워크</h2>
           <p className="text-slate-500 font-medium">검증된 한인 전문가와 파트너를 찾으세요.</p>
        </div>
        <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all">
          <Navigation size={18} /> 내 업체 등록하기
        </button>
      </div>

      <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold border transition-all whitespace-nowrap ${
              selectedCat === cat 
                ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/20' 
                : 'bg-white border-slate-200 text-slate-500 hover:border-red-200 hover:text-red-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        <div className="w-full lg:w-[450px] flex flex-col gap-4 overflow-y-auto pr-2 scrollbar-hide">
          <div className="relative mb-2">
            <input 
              type="text" 
              placeholder="상호명 또는 카테고리 검색..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-slate-100 soft-shadow focus:ring-2 focus:ring-red-500 outline-none font-bold"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          </div>

          {MOCK_BUSINESSES.map(business => (
            <div key={business.id} className="bg-white p-6 rounded-[32px] border border-white soft-shadow hover:ring-2 hover:ring-red-500/20 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black text-red-600 bg-red-50 px-2 py-1 rounded-lg uppercase tracking-wider">{business.category}</span>
                <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                  <Star size={14} fill="currentColor" /> {business.rating}
                </div>
              </div>
              {/* Fix: accessing name_i18n through getLocalizedText instead of undefined .name */}
              <h4 className="text-xl font-extrabold text-slate-900 mb-1 group-hover:text-red-600 transition-colors">{getLocalizedText(business.name_i18n)}</h4>
              <p className="text-sm text-slate-400 font-bold mb-4 flex items-center gap-1 uppercase tracking-tight">
                <MapIcon size={12} /> {business.city}, Canada
              </p>
              {/* Fix: accessing description_i18n through getLocalizedText instead of undefined .description */}
              <p className="text-slate-500 text-[13px] leading-relaxed mb-6 line-clamp-2">
                {getLocalizedText(business.description_i18n)}
              </p>
              <div className="flex gap-2">
                <button className="flex-1 bg-slate-50 py-3 rounded-xl text-xs font-black text-slate-600 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                   <Phone size={14} /> 문의
                </button>
                <button className="flex-1 bg-slate-900 text-white py-3 rounded-xl text-xs font-black hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                   <Globe size={14} /> 사이트
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden lg:block flex-1 bg-slate-200 rounded-[40px] relative overflow-hidden soft-shadow">
          <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-79.3832,43.6532,11/1000x1000?access_token=pk.dummy')] bg-cover bg-center opacity-80"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none"></div>
          
          <div className="absolute top-8 right-8 flex flex-col gap-2">
            <button className="bg-white p-3 rounded-2xl soft-shadow text-slate-600 hover:text-red-600 transition-all"><Filter size={20} /></button>
            <button className="bg-white p-3 rounded-2xl soft-shadow text-slate-600 hover:text-red-600 transition-all"><Navigation size={20} /></button>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 glass px-8 py-4 rounded-3xl flex items-center gap-6">
            <div className="text-center">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Listings</p>
               <p className="text-xl font-black text-slate-800">1,240+</p>
            </div>
            <div className="w-px h-8 bg-slate-200"></div>
            <div className="text-center">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified Experts</p>
               <p className="text-xl font-black text-slate-800">450+</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessView;

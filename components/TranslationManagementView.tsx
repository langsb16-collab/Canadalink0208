
import React, { useState } from 'react';
import { Languages, Globe, Edit3, Trash2, Search, Filter, Plus, CheckCircle2, AlertCircle } from 'lucide-react';
import { Language, I18nString } from '../types';

interface TranslationEntry {
  id: string;
  group: string;
  key: string;
  translations: I18nString;
  status: 'complete' | 'pending' | 'error';
}

const MOCK_ENTRIES: TranslationEntry[] = [
  { 
    id: '1', 
    group: 'Policy', 
    key: 'senior_care_title', 
    translations: { ko: '한인 시니어 센터 설립', en: 'Korean Senior Center' }, 
    status: 'complete' 
  },
  { 
    id: '2', 
    group: 'Settlement', 
    key: 'housing_guide_summary', 
    translations: { ko: '렌트 주의사항 요약', en: 'Rent Guide Summary' }, 
    status: 'pending' 
  },
  { 
    id: '3', 
    group: 'Dashboard', 
    key: 'user_count_label', 
    translations: { ko: '총 회원수', en: 'Total Members' }, 
    status: 'error' 
  },
];

const TranslationManagementView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLang, setActiveLang] = useState<Language>('en');

  const supportedLanguages: Language[] = ['ko', 'en', 'zh', 'es', 'fr', 'ar', 'ja', 'pt', 'ru', 'id', 'bn', 'hi'];

  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-3xl font-black text-brand-blue uppercase tracking-tight">Translation Engine</h2>
          <p className="text-brand-gray text-sm font-medium mt-1">플랫폼 전역의 12개 국어 콘텐츠 번역 현황을 관리합니다.</p>
        </div>
        <button className="btn-primary h-12 shadow-brand flex items-center gap-2">
           <Plus size={18} /> Add New Entry
        </button>
      </div>

      {/* Language Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
         {supportedLanguages.map(l => (
            <button 
              key={l}
              onClick={() => setActiveLang(l)}
              className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
                activeLang === l 
                  ? 'bg-brand-blue text-white shadow-lg border-brand-blue' 
                  : 'bg-white text-brand-gray border-brand-border/50 hover:bg-brand-bg'
              }`}
            >
              {l} Language
            </button>
         ))}
      </div>

      <div className="card-ui shadow-soft border-brand-border/50 overflow-hidden p-0">
        <div className="p-6 border-b border-brand-bg flex flex-col md:flex-row gap-4 items-center">
           <div className="relative flex-1 w-full">
              <input 
                type="text" 
                placeholder="Search keys or content..."
                className="w-full bg-brand-bg border border-brand-border rounded-btn pl-10 h-10 text-xs font-bold focus:bg-white"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray" size={14} />
           </div>
           <button className="btn-secondary h-10 px-4 text-xs font-black uppercase flex items-center gap-2">
              <Filter size={14} /> All Groups
           </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-brand-bg/50 border-b border-brand-border/30">
                <th className="px-8 py-5 text-[10px] font-black text-brand-gray uppercase tracking-widest">Group / Key</th>
                <th className="px-6 py-5 text-[10px] font-black text-brand-gray uppercase tracking-widest">Default (Korean)</th>
                <th className="px-6 py-5 text-[10px] font-black text-brand-gray uppercase tracking-widest">Translation ({activeLang.toUpperCase()})</th>
                <th className="px-6 py-5 text-[10px] font-black text-brand-gray uppercase tracking-widest">Status</th>
                <th className="px-8 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-bg">
              {MOCK_ENTRIES.map((entry) => (
                <tr key={entry.id} className="hover:bg-brand-bg/20 transition-colors">
                  <td className="px-8 py-6">
                    <div>
                      <p className="text-[10px] font-black text-brand-gray uppercase tracking-tight mb-1">{entry.group}</p>
                      <p className="text-xs font-bold text-brand-blue">{entry.key}</p>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-xs font-medium text-slate-700 max-w-[200px] truncate">{entry.translations.ko}</p>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                       <p className={`text-xs font-medium ${entry.translations[activeLang] ? 'text-slate-900' : 'text-slate-300 italic'}`}>
                         {entry.translations[activeLang] || 'Missing Translation'}
                       </p>
                       <button className="p-1.5 text-brand-blue hover:bg-brand-blue/5 rounded-lg">
                          <Edit3 size={14} />
                       </button>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    {entry.status === 'complete' && <CheckCircle2 size={16} className="text-status-success" />}
                    {entry.status === 'pending' && <AlertCircle size={16} className="text-status-warning" />}
                    {entry.status === 'error' && <AlertCircle size={16} className="text-status-error" />}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-brand-gray hover:text-status-error transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-brand-bg/30 border-t border-brand-border/30 flex justify-between items-center">
           <p className="text-[10px] font-black text-brand-gray uppercase">Total 452 Strings Indexed</p>
           <div className="flex gap-2">
              <button className="w-8 h-8 rounded-lg bg-white border border-brand-border/50 text-brand-blue flex items-center justify-center font-bold text-xs">1</button>
              <button className="w-8 h-8 rounded-lg bg-white border border-brand-border/50 text-brand-gray flex items-center justify-center font-bold text-xs">2</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TranslationManagementView;

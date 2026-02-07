
import React, { useState } from 'react';
import { Language } from '../types';
import { Globe, ChevronDown } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
  minimal?: boolean;
}

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'zh', label: '简体中文', flag: '🇨🇳' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'bn', label: 'বাংলা', flag: '🇧🇩' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
];

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLang, setLang, minimal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selected = languages.find(l => l.code === currentLang);

  if (minimal) {
    return (
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 bg-white rounded-xl shadow-soft flex items-center justify-center text-lg border border-slate-50"
        >
          {selected?.flag}
        </button>
        {isOpen && (
          <div className="absolute top-12 right-0 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 z-[200] p-1 flex flex-col max-h-60 overflow-y-auto">
            {languages.map(l => (
              <button key={l.code} onClick={() => {setLang(l.code); setIsOpen(false);}} className={`p-3 text-left text-xs font-bold rounded-xl ${currentLang === l.code ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-slate-50'}`}>
                {l.flag} {l.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl soft-shadow border border-slate-50 hover:bg-slate-50 transition-all min-w-[160px] justify-between"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{selected?.flag}</span>
          <span className="text-xs font-black uppercase tracking-tight text-slate-800">{selected?.label}</span>
        </div>
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-16 right-0 w-64 bg-white rounded-3xl soft-shadow border border-slate-100 z-[110] p-2 animate-fadeIn grid grid-cols-1 max-h-[400px] overflow-y-auto scrollbar-hide">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLang(lang.code);
                setIsOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                currentLang === lang.code ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-slate-50 text-slate-600'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="text-[13px] font-bold">{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    
    // Update document direction
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const isArabic = i18n.language === 'ar';

  return (
    <button
      onClick={toggleLanguage}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full 
        bg-white/10 backdrop-blur-sm border border-white/20
        hover:bg-white/20 transition-all duration-300
        text-white/90 hover:text-white
        group
        ${className}
      `}
      aria-label={isArabic ? 'Switch to English' : 'التبديل إلى العربية'}
    >
      <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
      <span className="text-sm font-medium">
        {isArabic ? 'EN' : 'عربي'}
      </span>
    </button>
  );
}

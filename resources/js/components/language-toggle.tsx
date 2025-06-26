import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function LanguageToggle() {
    const { i18n } = useTranslation();
    
    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);
    };

    const currentLanguage = i18n.language === 'en' ? 'العربية' : 'English';

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="w-full justify-start gap-2 h-8 px-2"
        >
            <Languages className="h-4 w-4" />
            <span className="text-xs">{currentLanguage}</span>
        </Button>
    );
}

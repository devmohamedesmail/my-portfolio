'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';
import { Moon, Sun, Globe, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Logo from './ui/logo';

export function Header() {
    const { t, i18n } = useTranslation();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setMobileMenuOpen(false);
        }
    };

    const navItems = [
        { key: 'home', id: 'hero' },
        { key: 'about', id: 'about' },
        { key: 'skills', id: 'skills' },
        { key: 'projects', id: 'projects' },
        { key: 'experience', id: 'experience' },
        { key: 'contact', id: 'contact' },
    ];

    if (!mounted) return null;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
            <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    <Logo />
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <button
                            key={item.key}
                            onClick={() => scrollToSection(item.id)}
                            className="nav-link relative text-sm font-medium transition-all duration-300 hover:text-primary hover:-translate-y-0.5"
                        >
                            {t(`nav.${item.key}`)}
                        </button>
                    ))}
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2">
                    {/* Language Switcher */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Globe className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => i18n.changeLanguage('en')}>
                                English
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => i18n.changeLanguage('ar')}>
                                العربية
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Theme Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    >
                        {theme === 'dark' ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </Button>

                    {/* Mobile Menu Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </Button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t bg-background/95 backdrop-blur-md">
                    <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
                        {navItems.map((item) => (
                            <button
                                key={item.key}
                                onClick={() => scrollToSection(item.id)}
                                className="nav-link-mobile text-left py-2 px-4 rounded-md transition-all duration-300 hover:bg-accent hover:translate-x-1"
                            >
                                {t(`nav.${item.key}`)}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}

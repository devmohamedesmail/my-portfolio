'use client';

import { useEffect } from 'react';
import '@/lib/i18n';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/sections/hero';
import { AboutSection } from '@/components/sections/about';
import { SkillsSection } from '@/components/sections/skills';
import { ProjectsSection } from '@/components/sections/projects';
import { ExperienceSection } from '@/components/sections/experience';
import { ContactSection } from '@/components/sections/contact';
import FloatButtons from './ui/float-buttons';

export function PortfolioContent() {
    useEffect(() => {
        // Initialize i18n on mount
    }, []);

    return (
        <>
            <Header />
           
            <main className="min-h-screen">
                <HeroSection />
                <AboutSection />
                <SkillsSection />
                <ProjectsSection />
                <ExperienceSection />
                <ContactSection />
                <FloatButtons />
            </main>
            <Footer />
        </>
    );
}

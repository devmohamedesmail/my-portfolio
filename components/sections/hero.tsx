'use client';

import { useTranslation } from 'react-i18next';
import { ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SocialIcons from '../social-icons';

export function HeroSection() {
    const { t } = useTranslation();

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };


    useGSAP(() => {
        gsap.to(".box-letter", {
            y: 50,
            repeat: -1,
            yoyo: true,
            stagger: 0.5,
            duration: 1,
            ease: "power1.inOut",
        })
    })



    return (
        <section
            id="hero"
            className="min-h-screen flex items-center justify-center pt-16 px-4"
        >
            <div className="container mx-auto">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    {/* Greeting */}
                    <div className="space-y-4 animate-fade-in">
                        <p className="text-lg md:text-xl text-muted-foreground">
                            {t('hero.greeting')}
                        </p>
                        <h1 className='text-4xl font-extrabold text-foreground'>MOHAMED ESMAIL</h1>
                       
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground/90">
                            {t('hero.role')}
                        </h2>
                    </div>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        {t('hero.description')}
                    </p>

                    <SocialIcons />

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                        <Button
                            size="lg"
                            onClick={() => scrollToSection('projects')}
                            className="group"
                        >
                            {t('hero.cta')}
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => scrollToSection('contact')}
                        >
                            {t('hero.contact')}
                        </Button>
                    </div>

                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 -z-10 overflow-hidden">
                        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
                    </div>
                </div>
            </div>
        </section>
    );
}

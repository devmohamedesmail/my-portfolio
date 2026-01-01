'use client';

import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Award, Briefcase, Users, Trophy } from 'lucide-react';

export function AboutSection() {
    const { t } = useTranslation();

    const stats = [
        { icon: Briefcase, label: t('about.yearsExp'), value: '5+' },
        { icon: Trophy, label: t('about.projectsCompleted'), value: '50+' },
        { icon: Users, label: t('about.happyClients'), value: '30+' },
        { icon: Award, label: t('about.awardsWon'), value: '10+' },
    ];

    return (
        <section id="about" className="py-20 px-4 bg-muted/30">
            <div className="container mx-auto">
                <div className="max-w-4xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            {t('about.title')}
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            {t('about.subtitle')}
                        </p>
                    </div>

                    {/* About Content */}
                    <div className="space-y-8">
                        <Card className="p-8">
                            <p className="text-lg leading-relaxed text-muted-foreground">
                                {t('about.description')}
                            </p>
                        </Card>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {stats.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <Card
                                        key={index}
                                        className="p-6 text-center hover:shadow-lg transition-shadow"
                                    >
                                        <Icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                                        <div className="text-3xl font-bold mb-2">{stat.value}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {stat.label}
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

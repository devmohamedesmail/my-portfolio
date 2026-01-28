'use client';

import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Briefcase, Calendar } from 'lucide-react';

export function ExperienceSection() {
    const { t } = useTranslation();

    const experiences = [
        {
            title: 'Senior Full Stack Developer',
            company: 'Tech Solutions Inc.',
            period: '2022 - ' + t('experience.present'),
            description:
                'Leading development of enterprise web applications using modern tech stack. Mentoring junior developers and implementing best practices.',
            achievements: [
                'Improved application performance by 40%',
                'Led team of 5 developers',
                'Implemented CI/CD pipeline',
            ],
        },
        {
            title: 'Full Stack Developer',
            company: 'Digital Agency Pro',
            period: '2020 - 2022',
            description:
                'Developed and maintained multiple client projects ranging from e-commerce platforms to custom web applications.',
            achievements: [
                'Delivered 20+ successful projects',
                'Reduced deployment time by 60%',
                'Implemented automated testing',
            ],
        },
        {
            title: 'Frontend Developer',
            company: 'StartUp Ventures',
            period: '2019 - 2020',
            description:
                'Built responsive and interactive user interfaces for various web applications using React and modern CSS frameworks.',
            achievements: [
                'Improved UI/UX metrics by 35%',
                'Created reusable component library',
                'Optimized bundle size by 50%',
            ],
        },
    ];

    return (
        <section id="experience" className="py-20 px-4">
            <div className="container mx-auto">
                <div className="max-w-4xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            {t('experience.title')}
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            {t('experience.subtitle')}
                        </p>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-6">
                        {experiences.map((exp, index) => (
                            <Card
                                key={index}
                                className="p-6 hover:shadow-lg transition-all duration-300 relative"
                            >
                                {/* Timeline Line */}
                                {index !== experiences.length - 1 && (
                                    <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary to-transparent -mb-6" />
                                )}

                                <div className="flex gap-4">
                                    {/* Icon */}
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Briefcase className="h-6 w-6 text-primary" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 space-y-3">
                                        <div>
                                            <h3 className="text-xl font-semibold">{exp.title}</h3>
                                            <p className="text-muted-foreground font-medium">
                                                {exp.company}
                                            </p>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                                <Calendar className="h-4 w-4" />
                                                {exp.period}
                                            </div>
                                        </div>

                                        <p className="text-muted-foreground">{exp.description}</p>

                                        <ul className="space-y-1">
                                            {exp.achievements.map((achievement, achIndex) => (
                                                <li
                                                    key={achIndex}
                                                    className="text-sm text-muted-foreground flex items-start gap-2"
                                                >
                                                    <span className="text-primary mt-1">•</span>
                                                    <span>{achievement}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

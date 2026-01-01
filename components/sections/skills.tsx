'use client';

import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function SkillsSection() {
    const { t } = useTranslation();

    const skillCategories = [
        {
            title: t('skills.frontend'),
            skills: [
                'React',
                'Next.js',
                'TypeScript',
                'JavaScript',
                'HTML5',
                'CSS3',
                'Tailwind CSS',
                'Redux',
                'Vue.js',
            ],
            color: 'from-blue-500 to-cyan-500',
        },
        {
            title: t('skills.backend'),
            skills: [
                'Node.js',
                'Express',
                'Python',
                'Django',
                'FastAPI',
                'REST API',
                'GraphQL',
                'Microservices',
            ],
            color: 'from-green-500 to-emerald-500',
        },
        {
            title: t('skills.database'),
            skills: [
                'PostgreSQL',
                'MongoDB',
                'MySQL',
                'Redis',
                'Firebase',
                'Prisma',
                'Supabase',
            ],
            color: 'from-purple-500 to-pink-500',
        },
        {
            title: t('skills.tools'),
            skills: [
                'Git',
                'Docker',
                'AWS',
                'Vercel',
                'CI/CD',
                'Jest',
                'Webpack',
                'Linux',
            ],
            color: 'from-orange-500 to-red-500',
        },
    ];

    return (
        <section id="skills" className="py-20 px-4">
            <div className="container mx-auto">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            {t('skills.title')}
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            {t('skills.subtitle')}
                        </p>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {skillCategories.map((category, index) => (
                            <Card
                                key={index}
                                className="p-6 hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className={`w-1 h-8 rounded-full bg-gradient-to-b ${category.color}`}
                                    />
                                    <h3 className="text-xl font-semibold">{category.title}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill, skillIndex) => (
                                        <Badge
                                            key={skillIndex}
                                            variant="secondary"
                                            className="px-3 py-1 text-sm hover:scale-105 transition-transform cursor-default"
                                        >
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

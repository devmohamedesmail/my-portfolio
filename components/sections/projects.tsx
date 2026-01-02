'use client';

import { useState, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Project {
    title_en: string;
    title_ar: string;
    description_en: string;
    description_ar: string;
    image: string;
    tags: string[];
    liveUrl: string;
    githubUrl: string;
    gradient: string;
}

interface ProjectCategory {
    id: string;
    title: string;
    projects: Project[];
}

export function ProjectsSection() {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const [activeFilter, setActiveFilter] = useState('all');
    const containerRef = useRef<HTMLDivElement>(null);
    const q = gsap.utils.selector(containerRef);

    // Data Structure: Categories with their specific projects
    const projectCategories: ProjectCategory[] = [
        {
            id: 'frontend',
            title: t('projects.categories.frontend'),
            projects: [
                {
                    title_en: 'Freelancer Platform',
                    title_ar: 'منصة العمل الحر',
                    description_en: 'Frontend of a platform connecting freelancers with clients, featuring dashboards and project management.',
                    description_ar: 'واجهة أمامية لمنصة تربط المستقلين بالعملاء، وتتميز بلوحات تحكم وإدارة المشاريع.',
                    image: '/images/projects/freelancer.png',
                    tags: ['React', 'Tailwind CSS', 'Redux'],
                    liveUrl: '#',
                    githubUrl: '#',
                    gradient: 'from-blue-500 to-cyan-500',
                },
                {
                    title_en: 'Tawsila Dashboard',
                    title_ar: 'لوحة تحكم توصيلة',
                    description_en: 'Admin dashboard for Tawsila app with real-time analytics and user management.',
                    description_ar: 'لوحة تحكم إدارية لتطبيق توصيلة مع تحليلات في الوقت الفعلي وإدارة المستخدمين.',
                    image: '/images/projects/tawsila.png',
                    tags: ['React', 'Next.js', 'Chart.js'],
                    liveUrl: '#',
                    githubUrl: '#',
                    gradient: 'from-green-500 to-emerald-500',
                },
                {
                    title_en: 'Palmaal Classified Ads',
                    title_ar: 'إعلانات بالمآل المبوبة',
                    description_en: 'Responsive classifieds platform allowing users to post and browse ads.',
                    description_ar: 'منصة إعلانات مبوبة متجاوبة تسمح للمستخدمين بنشر وتصفح الإعلانات.',
                    image: '/images/projects/palmaal.png',
                    tags: ['React', 'Tailwind CSS', 'Framer Motion'],
                    liveUrl: '#',
                    githubUrl: '#',
                    gradient: 'from-purple-500 to-violet-500',
                },
                {
                    title_en: 'Online Store',
                    title_ar: 'متجر إلكتروني',
                    description_en: 'E-commerce platform with product catalog, cart, and checkout system.',
                    description_ar: 'منصة تجارة إلكترونية مع كتالوج منتجات وعربة تسوق ونظام دفع.',
                    image: '/images/projects/online-store.png',
                    tags: ['Next.js', 'TypeScript', 'Redux'],
                    liveUrl: '#',
                    githubUrl: '#',
                    gradient: 'from-orange-500 to-red-500',
                },
                {
                    title_en: 'Alktaboot',
                    title_ar: 'الأخطبوط',
                    description_en: 'Educational platform with interactive learning modules and quizzes.',
                    description_ar: 'منصة تعليمية تحتوي على وحدات تعليمية تفاعلية واختبارات.',
                    image: '/images/projects/alkhtaboot.webp',
                    tags: ['Wordpress', 'PHP', 'Elementor'],
                    liveUrl: '#',
                    githubUrl: '#',
                    gradient: 'from-indigo-500 to-blue-500',
                },
            ],
        },
        {
            id: 'backend',
            title: t('projects.categories.backend'),
            projects: [
                {
                    title_en: 'Tawsila Backend',
                    title_ar: 'واجهة خلفية توصيلة',
                    description_en: 'Robust backend API for Tawsila app handling rides, users, and payments.',
                    description_ar: 'واجهة برمجة تطبيقات خلفية قوية لتطبيق توصيلة تتعامل مع الرحلات والمستخدمين والمدقوعات.',
                    image: '/images/projects/tawsila.png',
                    tags: ['Node.js', 'Express', 'MongoDB', 'Redis'],
                    liveUrl: '#',
                    githubUrl: '#',
                    gradient: 'from-green-500 to-emerald-500',
                },
                {
                    title_en: 'Freelancer Backend',
                    title_ar: 'واجهة خلفية للمستقلين',
                    description_en: 'Backend system managing projects, users, and payment integration for freelancer platform.',
                    description_ar: 'نظام خلفي يدير المشاريع والمستخدمين وتكامل الدفع لمنصة العمل الحر.',
                    image: '/images/projects/freelancer.png',
                    tags: ['Express', 'MySQL', 'Prisma', 'JWT', 'Stripe', 'Socket.io', 'Redis', 'Nodemailer'],
                    liveUrl: '#',
                    githubUrl: '#',
                    gradient: 'from-blue-500 to-cyan-500',
                },
            ],
        },
        {
            id: 'mobile',
            title: t('projects.categories.mobile'),
            projects: [
                {
                    title_en: 'Palmaal Mobile App',
                    title_ar: 'تطبيق بالمآل',
                    description_en: 'Mobile application for browsing and posting classified ads.',
                    description_ar: 'تطبيق هاتف لتصفح ونشر الإعلانات المبوبة.',
                    image: '/images/projects/palmaal-app.png',
                    tags: ['React Native', 'NativeWind', 'Expo', 'Redux', 'Socket.io'],
                    liveUrl: '#',
                    githubUrl: '#',
                    gradient: 'from-pink-500 to-rose-500',
                },
                {
                    title_en: 'Tawsila Agent App',
                    title_ar: 'تطبيق وكيل توصيلة',
                    description_en: 'Mobile app for Tawsila drivers to manage rides and interact with users.',
                    description_ar: 'تطبيق هاتف لسائقي توصيلة لإدارة الرحلات والتفاعل مع المستخدمين.',
                    image: '/images/projects/tawsila-agent.png',
                    tags: ['React Native', 'Expo', 'Socket.io', 'Redux'],
                    liveUrl: 'https://play.google.com/apps/testing/com.dev.mohamed.esmail.tawsilaagent',
                    githubUrl: '#',
                    gradient: 'from-indigo-500 to-blue-600',
                },
                {
                    title_en: 'Tawsila User App',
                    title_ar: 'تطبيق مستخدم توصيلة',
                    description_en: 'Mobile app for Tawsila users to book rides and track drivers.',
                    description_ar: 'تطبيق هاتف لمستخدمي توصيلة لحجز الرحلات وتتبع السائقين.',
                    image: '/images/projects/tawsila-user.png',
                    tags: ['React Native', 'Firebase', 'Redux'],
                    liveUrl: 'https://play.google.com/apps/testing/com.dev.mohamed.esmail.tawsilaapp',
                    githubUrl: '#',
                    gradient: 'from-green-500 to-teal-500',
                },
            ],
        },
    ];


    const allProjects = useMemo(() => {
        return projectCategories.flatMap(cat => cat.projects);
    }, [projectCategories]);

    const filteredProjects = useMemo(() => {
        if (activeFilter === 'all') return allProjects;
        const category = projectCategories.find(c => c.id === activeFilter);
        return category ? category.projects : [];
    }, [activeFilter, allProjects, projectCategories]);

    // Animate when filter changes
    useGSAP(() => {
        // Animate cards entrance
        gsap.fromTo(
            q('.project-card'),
            {
                y: 50,
                opacity: 0,
                scale: 0.9,
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.out',
                overwrite: 'auto'
            }
        );
    }, { dependencies: [activeFilter], scope: containerRef });

    return (
        <section id="projects" ref={containerRef} className="py-24 px-4 bg-muted/20">
            <div className="container mx-auto">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                            {t('projects.title')}
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            {t('projects.subtitle')}
                        </p>
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        <Button
                            variant={activeFilter === 'all' ? 'default' : 'outline'}
                            onClick={() => setActiveFilter('all')}
                            className="rounded-full px-6 transition-all duration-300 transform hover:scale-105"
                        >
                            {t('projects.categories.all', 'All')}
                        </Button>
                        {projectCategories.map((category) => (
                            <Button
                                key={category.id}
                                variant={activeFilter === category.id ? 'default' : 'outline'}
                                onClick={() => setActiveFilter(category.id)}
                                className="rounded-full px-6 transition-all duration-300 transform hover:scale-105"
                            >
                                {category.title}
                            </Button>
                        ))}
                    </div>

                    {/* Projects Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[500px]">
                        {filteredProjects.map((project, index) => (
                            <Card
                                key={`${project.title_ar}-${index}`}
                                className="project-card overflow-hidden group border-none shadow-lg hover:shadow-2xl transition-all duration-500 bg-background/50 backdrop-blur-sm"
                            >
                                {/* Project Image Area */}
                                <div
                                    className={`h-52 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
                                >
                                    {/* Mockup/Image Placeholder */}
                                    <Image
                                        src={project.image}
                                        alt={i18n.language === 'ar' ? project.title_ar : project.title_en}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />

                                    {/* Overlay - Buttons always visible */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="flex gap-4 pointer-events-auto">
                                            <Button size="icon" variant="secondary" className="rounded-full shadow-lg" asChild>
                                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" title={t('projects.viewProject')}>
                                                    <ExternalLink className="h-5 w-5" />
                                                </a>
                                            </Button>
                                            <Button size="icon" variant="secondary" className="rounded-full shadow-lg" asChild>
                                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" title={t('projects.sourceCode')}>
                                                    <Github className="h-5 w-5" />
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-4">
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                                                {i18n.language === 'ar' ? project.title_ar : project.title_en}
                                            </h3>
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground line-clamp-2 text-sm">
                                        {i18n.language === 'ar' ? project.description_ar : project.description_en}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {project.tags.map((tag, tagIndex) => (
                                            <Badge
                                                key={tagIndex}
                                                variant="outline"
                                                className="bg-primary/5 hover:bg-primary/10 transition-colors border-primary/20"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
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

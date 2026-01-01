'use client';

import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

export function ProjectsSection() {
    const { t } = useTranslation();

    const projects = [
        {
            title: 'E-Commerce Platform',
            description:
                'A full-featured e-commerce platform with payment integration, admin dashboard, and real-time inventory management.',
            image: '/projects/ecommerce.jpg',
            tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
            liveUrl: '#',
            githubUrl: '#',
            gradient: 'from-blue-500 to-purple-500',
        },
        {
            title: 'Task Management App',
            description:
                'Collaborative task management application with real-time updates, team collaboration, and advanced filtering.',
            image: '/projects/taskapp.jpg',
            tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
            liveUrl: '#',
            githubUrl: '#',
            gradient: 'from-green-500 to-teal-500',
        },
        {
            title: 'Social Media Dashboard',
            description:
                'Analytics dashboard for social media management with data visualization and automated reporting.',
            image: '/projects/dashboard.jpg',
            tags: ['Vue.js', 'Python', 'FastAPI', 'Redis'],
            liveUrl: '#',
            githubUrl: '#',
            gradient: 'from-pink-500 to-rose-500',
        },
        {
            title: 'AI Content Generator',
            description:
                'AI-powered content generation tool using GPT models for creating blog posts, social media content, and more.',
            image: '/projects/ai-tool.jpg',
            tags: ['Next.js', 'OpenAI', 'Tailwind', 'Supabase'],
            liveUrl: '#',
            githubUrl: '#',
            gradient: 'from-orange-500 to-amber-500',
        },
    ];

    return (
        <section id="projects" className="py-20 px-4 bg-muted/30">
            <div className="container mx-auto">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            {t('projects.title')}
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            {t('projects.subtitle')}
                        </p>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {projects.map((project, index) => (
                            <Card
                                key={index}
                                className="overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                            >
                                {/* Project Image Placeholder */}
                                <div
                                    className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
                                >
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-white text-2xl font-bold opacity-50">
                                            {project.title}
                                        </div>
                                    </div>
                                </div>

                                {/* Project Content */}
                                <div className="p-6 space-y-4">
                                    <h3 className="text-xl font-semibold">{project.title}</h3>
                                    <p className="text-muted-foreground">{project.description}</p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, tagIndex) => (
                                            <Badge key={tagIndex} variant="secondary">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 pt-2">
                                        <Button size="sm" className="flex-1" asChild>
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <ExternalLink className="mr-2 h-4 w-4" />
                                                {t('projects.viewProject')}
                                            </a>
                                        </Button>
                                        <Button size="sm" variant="outline" asChild>
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Github className="mr-2 h-4 w-4" />
                                                {t('projects.sourceCode')}
                                            </a>
                                        </Button>
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

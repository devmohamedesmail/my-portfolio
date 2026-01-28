'use client';

import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';

interface Skill {
    name: string;
    color: string;
    image: string;
}

interface SkillCategory {
    title: string;
    skills: Skill[];
}

export function SkillsSection() {
    const { t } = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);
    const q = gsap.utils.selector(containerRef);

    const skillCategories: SkillCategory[] = [
        {
            title: t('skills.frontend'),
            skills: [
                {
                    name: 'HTML',
                    color: 'from-blue-500 to-cyan-500',
                    image: '/images/skills/html.svg',
                },
                {
                    name: 'CSS',
                    color: 'from-blue-500 to-cyan-500',
                    image: '/images/skills/css.svg',
                },
                {
                    name: 'JS',
                    color: 'from-blue-500 to-cyan-500',
                    image: '/images/skills/js.svg',
                },
                {
                    name: 'React',
                    color: 'from-blue-500 to-cyan-500',
                    image: '/images/skills/reactjs.svg',
                },
                {
                    name: 'Next.js',
                    color: 'from-gray-700 to-black',
                    image: '/images/skills/nextjs-1.svg',
                },
                {
                    name: 'Tailwind CSS',
                    color: 'from-cyan-400 to-blue-500',
                    image: '/images/skills/tailwind.svg',
                },
                {
                    name: 'TypeScript',
                    color: 'from-blue-600 to-blue-800',
                    image: '/images/skills/typescript.svg',
                },
            ],
        },

        {
            title: t('skills.backend'),
            skills: [
                {
                    name: 'Node.js',
                    color: 'from-green-500 to-green-700',
                    image: '/images/skills/nodejs-1.svg',
                },
                {
                    name: 'Express.js',
                    color: 'from-gray-600 to-gray-800',
                    image: '/images/skills/nodejs-1.svg',
                },
                {
                    name: 'Laravel',
                    color: 'from-red-500 to-red-700',
                    image: '/images/skills/laravel.svg',
                },
                {
                    name: 'REST API',
                    color: 'from-indigo-500 to-purple-600',
                    image: '/images/skills/api.svg',
                },
                {
                    name: 'GraphQL',
                    color: 'from-indigo-500 to-purple-600',
                    image: '/images/skills/graphql.svg',
                },
                {
                    name: 'Strapi',
                    color: 'from-indigo-500 to-purple-600',
                    image: '/images/skills/strapi-1.svg',
                },
            ],
        },

        {
            title: t('skills.database'),
            skills: [
                {
                    name: 'MongoDB',
                    color: 'from-green-600 to-green-800',
                    image: '/images/skills/mongodb.svg',
                },
                {
                    name: 'MySQL',
                    color: 'from-blue-600 to-orange-500',
                    image: '/images/skills/mysql.svg',
                },
                {
                    name: 'Prisma',
                    color: 'from-indigo-500 to-purple-600',
                    image: '/images/skills/prisma.svg',
                },
            ],
        },
        {
            title: t('skills.tools'),
            skills: [
                { 
                    name: 'Docker', 
                    color: 'from-blue-500 to-sky-600', 
                    image: '/images/skills/docker.svg' 
                },
                { 
                    name: 'Git', 
                    color: 'from-orange-500 to-red-600', 
                    image: '/images/skills/git.svg' 
                },
                { 
                    name: 'GitHub', 
                    color: 'from-gray-700 to-black', 
                    image: '/images/skills/github.svg' 
                },
                { 
                    name: 'CI/CD', 
                    color: 'from-purple-500 to-indigo-600', 
                    image: '/images/skills/ci-cd.svg' 
                },
            ],
        },
    ];

    useGSAP(
        () => {
            // Animate section header
            gsap.from(q('.section-header'), {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                },
            });

            // Animate categories
            const categories = q('.skill-category-card');
            categories.forEach((category, i) => {
                gsap.from(category, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.8,
                    delay: i * 0.2,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 70%',
                    },
                });

                // Continuous floating animation for skills inside
                const skills = category.querySelectorAll('.skill-item');
                skills.forEach((skill, j) => {
                    gsap.to(skill, {
                        y: '-10px',
                        duration: 1.5 + j * 0.2,
                        repeat: -1,
                        yoyo: true,
                        ease: 'sine.inOut',
                        delay: j * 0.1,
                    });
                });
            });
        },
        { scope: containerRef }
    );

    return (
        <section id="skills" ref={containerRef} className="py-24 px-4 overflow-hidden relative">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] right-[10%] w-[30rem] h-[30rem] bg-purple-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto">
                {/* Section Header */}
                <div className="text-center mb-20 section-header">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        {t('skills.title')}
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        {t('skills.subtitle')}
                    </p>
                </div>

                {/* Skills Circular Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 justify-items-center">
                    {skillCategories.map((category, index) => (
                        <div
                            key={index}
                            className="skill-category-card relative group"
                        >
                            {/* Circular Container */}
                            <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full border border-border/50 bg-background/30 backdrop-blur-sm shadow-xl flex items-center justify-center transition-all duration-500 hover:shadow-primary/20 hover:border-primary/50">

                                {/* Center Label */}
                                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                    <div className="text-center p-4 rounded-full bg-background/80 backdrop-blur-md shadow-sm border border-border/50 w-24 h-24 flex items-center justify-center">
                                        <h3 className="text-lg font-bold text-foreground">
                                            {category.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Satellites (Skills) */}
                                {category.skills.map((skill, skillIndex) => {
                                    const totalSkills = category.skills.length;
                                    const angle = (skillIndex / totalSkills) * 2 * Math.PI - Math.PI / 2; // Start from top
                                    const radius = 100; // Radius for placement (adjust based on container size) (responsive logic can be better in css but let's stick to inline for complex calc)
                                    // Using CSS variables for calc if we wanted responsiveness without JS recalc, but simpler to use percentage approximations or fixed size for now given the fixed container size.
                                    // A better approach for the circular positioning that aligns with the 'circle' requirement:
                                    const x = Math.cos(angle) * 110; // 110px radius
                                    const y = Math.sin(angle) * 110;

                                    return (
                                        <div
                                            key={skillIndex}
                                            className="skill-item absolute w-20 h-20 rounded-full bg-background border border-border flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-125 z-10"
                                            style={{
                                                transform: `translate(${x}px, ${y}px)`,
                                                marginTop: '-1.75rem', // Half of height to center
                                                marginLeft: '-1.75rem', // Half of width to center
                                                top: '50%',
                                                left: '50%',
                                            }}
                                            title={skill.name}
                                        >
                                            <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br ${skill.color}`} />
                                            <div className="relative w-14 h-14">
                                                <Image
                                                    src={skill.image}
                                                    alt={skill.name}
                                                    fill
                                                    className="object-contain p-1"
                                                />
                                            </div>
                                            {/* Tooltip-ish name on hover (optional, maybe cleaner without text clutter) */}
                                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 px-2 py-1 rounded shadow-sm whitespace-nowrap pointer-events-none">
                                                {skill.name}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Add ScrollTrigger registration
if (typeof window !== 'undefined') {
    const { ScrollTrigger } = require('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);
}

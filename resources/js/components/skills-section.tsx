import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import SkillItem from './items/skill-item'
import SkillsShowcase from './skills-showcase'

export default function SkillsSection({skills,isLoaded}:any) {
    const {t}=useTranslation()
    return (
        <section id="skills" className="py-20 px-6 bg-black/20 backdrop-blur-sm relative z-10 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-32 h-32 border border-blue-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-48 h-48 border border-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-pink-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {t('skills.title')}
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        {t('skills.subtitle')}
                    </p>
                    <div className="flex justify-center mt-8">
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                    </div>
                </div>

                {/* Skill Categories */}
                <div className="mb-16">
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {[
                            t('skills.categories.all'),
                            t('skills.categories.frontend'),
                            t('skills.categories.backend'),
                            t('skills.categories.devops'),
                            t('skills.categories.database')
                        ].map((category, index) => (
                            <button
                                key={category}
                                className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${index === 0
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                                        : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Enhanced Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {skills.map((skill:any, index:any) => (
                        <SkillItem skill={skill} isLoaded={isLoaded} key={index} />
                    ))}
                </div>

                {/* Additional Skills Showcase */}
               <SkillsShowcase />

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <p className="text-xl text-gray-300 mb-8">
                        {t('skills.ctaText')}
                    </p>
                    <a
                        href="tel:+971589107126"
                        className="group relative inline-flex items-center justify-center overflow-hidden"
                    >
                        <Button
                            size="lg"
                            className="relative z-10 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-2xl rounded-full border-2 border-emerald-400/50"
                        >
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <svg className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                                    </svg>
                                    {/* Phone ring animation */}
                                    <div className="absolute inset-0 rounded-full border-2 border-emerald-300 opacity-75 animate-ping"></div>
                                    <div className="absolute inset-0 rounded-full border-2 border-emerald-300 opacity-50 animate-ping" style={{ animationDelay: '0.5s' }}></div>
                                </div>
                                <span className="font-bold">{t('skills.getInTouch')}</span>
                                <div className="text-sm font-mono bg-emerald-700/30 px-2 py-1 rounded-md">
                                    +971 58 910 7126
                                </div>
                            </div>
                            {/* Animated background gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full -z-10"></div>
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-emerald-400/30 blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 rounded-full -z-20"></div>
                            {/* Pulse effect */}
                            <div className="absolute inset-0 bg-emerald-400/20 rounded-full animate-pulse -z-30"></div>
                        </Button>
                    </a>
                </div>
            </div>
        </section>
    )
}

import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import SkillItem from './items/skill-item'
import SkillsShowcase from './skills-showcase'

export default function SkillsSection({skills, isLoaded}: any) {
    const {t} = useTranslation()
    const [activeCategory, setActiveCategory] = useState('all')
    const [filteredSkills, setFilteredSkills] = useState(skills)
    const [isFilterAnimating, setIsFilterAnimating] = useState(false)

    const categories = [
        { key: 'all', label: t('skills.categories.all'), icon: '🌟' },
        { key: 'frontend', label: 'Frontend', icon: '🎨' },
        { key: 'backend', label: 'Backend', icon: '⚙️' },
        { key: 'database', label: 'Database', icon: '🗄️' },
        { key: 'devops', label: 'DevOps', icon: '🚀' },
        { key: 'mobile', label: 'Mobile', icon: '📱' },
        // { key: 'design', label: 'Design', icon: '✨' },
        // { key: 'testing', label: 'Testing', icon: '🧪' },
        // { key: 'other', label: 'Other', icon: '🔧' },
    ]

    const handleCategoryChange = (category: string) => {
        if (category === activeCategory) return
        
        setIsFilterAnimating(true)
        setActiveCategory(category)
        
        // Animate out current skills
        setTimeout(() => {
            const filtered = category === 'all' 
                ? skills 
                : skills.filter((skill: any) => skill.category === category)
            setFilteredSkills(filtered)
            
            // Animate in new skills
            setTimeout(() => {
                setIsFilterAnimating(false)
            }, 100)
        }, 200)
    }

    useEffect(() => {
        setFilteredSkills(skills)
    }, [skills])
    return (
        <section id="skills" className="py-20 px-6 bg-black/20 backdrop-blur-sm relative z-10 overflow-hidden">
            {/* Enhanced Background Elements with Floating Animation */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-32 h-32 border border-blue-400 rounded-full animate-pulse transform hover:scale-110 transition-transform duration-1000"></div>
                <div className="absolute bottom-20 right-10 w-48 h-48 border border-purple-400 rounded-full animate-pulse transform hover:scale-110 transition-transform duration-1000" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-pink-400 rounded-full animate-pulse transform hover:scale-110 transition-transform duration-1000" style={{ animationDelay: '2s' }}></div>
                
                {/* Additional floating elements */}
                <div className="absolute top-1/3 right-1/4 w-16 h-16 border border-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '3s' }}></div>
                <div className="absolute bottom-1/3 left-1/3 w-20 h-20 border border-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '4s' }}></div>
                
                {/* Floating gradient orbs */}
                <div 
                    className="absolute top-10 right-1/3 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
                    style={{
                        animation: 'float 6s ease-in-out infinite'
                    }}
                ></div>
                <div 
                    className="absolute bottom-10 left-1/2 w-32 h-32 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-full blur-xl"
                    style={{
                        animation: 'floatDelayed 8s ease-in-out infinite',
                        animationDelay: '2s'
                    }}
                ></div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes float {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        33% { transform: translateY(-20px) rotate(1deg); }
                        66% { transform: translateY(-10px) rotate(-1deg); }
                    }
                    
                    @keyframes floatDelayed {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        33% { transform: translateY(-15px) rotate(-1deg); }
                        66% { transform: translateY(-25px) rotate(1deg); }
                    }
                `
            }} />

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

                {/* Enhanced Skill Categories with Professional Animation */}
                <div className="mb-16">
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map((category, index) => (
                            <button
                                key={category.key}
                                onClick={() => handleCategoryChange(category.key)}
                                className={`group relative px-8 py-4 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 ${
                                    activeCategory === category.key
                                        ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-2xl shadow-blue-500/25'
                                        : 'bg-white/10 backdrop-blur-sm text-gray-300 hover:bg-white/20 hover:text-white border border-white/20 hover:border-white/40'
                                } ${isFilterAnimating ? 'pointer-events-none' : ''}`}
                                style={{
                                    animationDelay: `${index * 0.1}s`
                                }}
                            >
                                {/* Background glow effect for active category */}
                                {activeCategory === category.key && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-30 blur-xl rounded-2xl animate-pulse"></div>
                                )}
                                
                                {/* Category content */}
                                <div className="relative z-10 flex items-center gap-3">
                                    <span className="text-xl group-hover:animate-bounce transition-transform duration-300">
                                        {category.icon}
                                    </span>
                                    <span className="font-semibold tracking-wide">
                                        {category.label}
                                    </span>
                                    
                                    {/* Active indicator */}
                                    {activeCategory === category.key && (
                                        <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                                    )}
                                </div>

                                {/* Hover effect overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl transform -skew-x-12 group-hover:animate-pulse"></div>
                                
                                {/* Border animation for active state */}
                                {activeCategory === category.key && (
                                    <div className="absolute inset-0 rounded-2xl border-2 border-white/30 animate-pulse"></div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Category transition indicator */}
                    {isFilterAnimating && (
                        <div className="flex justify-center mb-8">
                            <div className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full">
                                <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-sm text-gray-300 font-medium">Filtering skills...</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Enhanced Skills Grid with Stagger Animation */}
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 transition-all duration-300 ${
                    isFilterAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
                }`}>
                    {filteredSkills.map((skill: any, index: any) => (
                        <div
                            key={`${skill.id}-${activeCategory}`}
                            className={`transform transition-all duration-500 ${
                                isFilterAnimating 
                                    ? 'opacity-0 translate-y-8 scale-95' 
                                    : 'opacity-100 translate-y-0 scale-100'
                            }`}
                            style={{
                                animationDelay: isFilterAnimating ? '0ms' : `${index * 100}ms`,
                                transitionDelay: isFilterAnimating ? '0ms' : `${index * 100}ms`
                            }}
                        >
                            <SkillItem skill={skill} isLoaded={isLoaded} />
                        </div>
                    ))}
                </div>

                {/* No skills found state */}
                {filteredSkills.length === 0 && !isFilterAnimating && (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 rounded-full mb-6">
                            <span className="text-4xl">🔍</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-300 mb-2">No skills found</h3>
                        <p className="text-gray-400">Try selecting a different category</p>
                    </div>
                )}

                {/* Skills count indicator */}
                {!isFilterAnimating && (
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                            <span className="text-sm text-gray-300">
                                {filteredSkills.length} skill{filteredSkills.length !== 1 ? 's' : ''} 
                                {activeCategory !== 'all' && ` in ${categories.find(c => c.key === activeCategory)?.label}`}
                            </span>
                        </div>
                    </div>
                )}

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

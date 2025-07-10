import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ProjectItem from './items/project-item'
import ProjectsShowcase from './projects-showcase'

export default function ProjectsSection({projects, isLoaded}: any) {
    const { t } = useTranslation()
    const [activeCategory, setActiveCategory] = useState('all')
    const [filteredProjects, setFilteredProjects] = useState(projects)
    const [isFilterAnimating, setIsFilterAnimating] = useState(false)

    const categories = [
        { key: 'all', label: t('projects.categories.allProjects'), icon: '🌟' },
        { key: 'web', label: t('projects.categories.webApps'), icon: '🌐' },
        { key: 'mobile', label: t('projects.categories.mobile'), icon: '📱' },
        { key: 'fullstack', label: t('projects.categories.fullStack'), icon: '⚡' },
        { key: 'api', label: t('projects.categories.api'), icon: '🔗' },
        { key: 'ecommerce', label: t('projects.categories.ecommerce'), icon: '🛒' },
        { key: 'dashboard', label: t('projects.categories.dashboard'), icon: '📊' },
        { key: 'portfolio', label: t('projects.categories.portfolio'), icon: '💼' },
    ]

    const handleCategoryChange = (category: string) => {
        if (category === activeCategory) return
        
        setIsFilterAnimating(true)
        setActiveCategory(category)
        
        // Animate out current projects
        setTimeout(() => {
            const filtered = category === 'all' 
                ? projects 
                : projects.filter((project: any) => 
                    project.category === category || 
                    project.tags?.includes(category) ||
                    project.type === category
                )
            setFilteredProjects(filtered)
            
            // Animate in new projects
            setTimeout(() => {
                setIsFilterAnimating(false)
            }, 100)
        }, 250)
    }

    useEffect(() => {
        setFilteredProjects(projects)
    }, [projects])
  return (
     <section id="projects" className="py-20 px-6 relative z-10 overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 border-2 border-blue-400 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 border-2 border-purple-400 rounded-full animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }}></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 border-2 border-pink-400 rotate-45 animate-pulse"></div>
        </div>

        {/* Floating particles with enhanced animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full opacity-20 ${
                i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-purple-400' : 'bg-pink-400'
              }`}
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes float {
              0%, 100% { transform: translateY(0px) scale(1); opacity: 0.2; }
              50% { transform: translateY(-20px) scale(1.1); opacity: 0.4; }
            }
          `
        }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent relative">
                {t('projects.title')}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
              </h2>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              {t('projects.subtitle')}
            </p>
            
            {/* Enhanced Project Categories Filter with Professional Animation */}
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
                    <span className="text-sm text-gray-300 font-medium">Filtering projects...</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Projects Grid with Stagger Animation */}
          <div className={`grid lg:grid-cols-3 gap-5 mb-16 transition-all duration-300 ${
            isFilterAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
          }`}>
            {filteredProjects.map((project: any, index: any) => (
              <div
                key={`${project.id}-${activeCategory}`}
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
                <ProjectItem project={project} index={index} isLoaded={isLoaded} />
              </div>
            ))}
          </div>

          {/* No projects found state */}
          {filteredProjects.length === 0 && !isFilterAnimating && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 rounded-full mb-6">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-300 mb-2">No projects found</h3>
              <p className="text-gray-400">Try selecting a different category</p>
            </div>
          )}

          {/* Projects count indicator */}
          {!isFilterAnimating && (
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                <span className="text-sm text-gray-300">
                  {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} 
                  {activeCategory !== 'all' && ` in ${categories.find(c => c.key === activeCategory)?.label}`}
                </span>
              </div>
            </div>
          )}

          {/* Projects Showcase Stats */}
         <ProjectsShowcase isLoaded={isLoaded} />

          {/* Call to Action */}
          <div className="text-center mt-20">
            <div className="inline-block p-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl">
              <div className="bg-gray-900 rounded-xl px-12 py-8">
                <h3 className="text-3xl font-bold text-white mb-4">
                  {t('cta.title')}
                </h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  {t('cta.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
                  >
                    <span className="mr-2">💬</span>
                    {t('cta.startConversation')}
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
                  >
                    <span className="mr-2">📄</span>
                    {t('cta.viewAllProjects')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

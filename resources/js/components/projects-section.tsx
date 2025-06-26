import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ProjectItem from './items/project-item'
import ProjectsShowcase from './projects-showcase'

export default function ProjectsSection({projects,isLoaded}: any) {
    const { t } = useTranslation()
  return (
     <section id="projects" className="py-20 px-6 relative z-10 overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 border-2 border-blue-400 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 border-2 border-purple-400 rounded-full animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }}></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 border-2 border-pink-400 rotate-45 animate-pulse"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            ></div>
          ))}
        </div>

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
            
            {/* Project Categories Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                t('projects.categories.allProjects'), 
                t('projects.categories.webApps'), 
                t('projects.categories.mobile'), 
                t('projects.categories.fullStack'), 
                t('projects.categories.api')
              ].map((category, index) => (
                <button
                  key={category}
                  className={`px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                    index === 0 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20 hover:border-white/40'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Projects Grid */}
          <div className="grid lg:grid-cols-3 gap-5">
            {projects.map((project:any, index:any) => (
            <ProjectItem project={project} key={project.id} index={index} isLoaded={isLoaded}  />
            ))}
          </div>

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
